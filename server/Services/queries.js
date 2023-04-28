const Pool = require('pg').Pool
const { group } = require('console');
const fs = require("fs");
const path = require("path");

var config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config.txt')).toString())
const pool = new Pool({
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password,
    port: config.port,
})

const homeinfo = async () => {
    const text0 = 'select id,date,venue,tour_name,teamid,result,total_score,total_wickets from match inner join matchwise_team_performance on id=matchid order by date desc,matchid LIMIT 6;'
    try{
        const res0 = await pool.query(text0)
        const text1 = 'SELECT * FROM tournament'

        try{
            const res1 = await pool.query(text1)
            const text2 = 'SELECT playerid,player_name,runs,innings,runs/innings as runs_per_innings FROM player where innings>0 and role ilike \'%Batsman%\' order by runs/innings desc;'
            try{
                const res2 = await pool.query(text2)
                const text3 = 'SELECT playerid,player_name,runs_conceded,balls,runs_conceded/balls as per_ball_average FROM player where balls>0 and role ilike \'%Bowler%\' order by runs_conceded/balls;'
                try{
                    const res3 = await pool.query(text3)
                    const text4 = 'SELECT playerid,player_name,wickets,matches,wickets/matches as wickets_per_match FROM player where matches>0 and role ilike \'%Bowler%\' order by wickets/matches desc;'
                    try{
                        const res4 = await pool.query(text4)
                        const text5 = 'SELECT playerid,player_name,runs,wickets,runs+25*wickets as rating FROM player where role ilike \'%All-rounder%\' order by runs+25*wickets desc;'
                        try{
                            const res5 = await pool.query(text5)
                                return {
                                    recent_matches: res0.rows,
                                    tours: res1.rows,
                                    batting: res2.rows,
                                    wickets: res3.rows,
                                    bowling: res4.rows,
                                    allrounders: res5.rows
                                };
                        }catch (err) {
                            console.log(err.stack)
                        }
                    }catch (err) {
                        console.log(err.stack)
                    }
                }catch (err) {
                    console.log(err.stack)
                }
            }catch (err) {
                console.log(err.stack)
            }
        }catch (err) {
            console.log(err.stack)
        }
    }catch (err) {
        console.log(err.stack)
    }
}


const matchinfo = async (matchid) => {
    const text0 = 'SELECT * FROM match WHERE id = $1'
    const values0 = [matchid]
    try{
        const res0 = await pool.query(text0, values0)
        const text1 = 'SELECT * FROM matchwise_team_performance WHERE matchid = $1'
        const values1 = [matchid]
        try{
            const res1 = await pool.query(text1, values1)
            const text2 = 'SELECT mp.matchid,mp.teamid,mp.playerid,player.player_name,mp.balls,mp.runs,mp.fours,mp.sixes,mp.wickets,mp.runs_conceded,mp.overs FROM matchwise_player_performance as mp inner join player using (playerid) WHERE matchid = $1'
            const values2 = [matchid]
            try{
                const res2 = await pool.query(text2, values2)
                const text3 = 'SELECT action,c.innings,ball,over,bat.player_name as batsman, bowl.player_name as bowler FROM (commentary as c inner join player as bat on c.batsman=bat.playerid) inner join player as bowl on c.bowler=bowl.playerid WHERE matchid = $1 order by innings desc ,over desc ,ball desc;'
                const values3 = [matchid]
                try{
                    const res3 = await pool.query(text3, values3)
                    if(res0.rows.length>0 && res1.rows.length>=2){
                        return {
                            match_deets: res0.rows, 
                            team1: res1.rows[0], 
                            team2: res1.rows[1], 
                            player_deets: res2.rows,
                            commentary: res3.rows,
                        };
                    }else{
                        return {
                            match_deets: null, 
                            team1: null, 
                            team2: null, 
                            player_deets: null,
                            commentary: null,
                        }; 
                    }
                }catch (err) {
                    console.log(err.stack)
                }
            }catch (err) {
                console.log(err.stack)
            }
        }catch (err) {
            console.log(err.stack)
        }
    }catch (err) {
        console.log(err.stack)
    }
}

const teaminfo = async (teamid) => {

    const text0 = 'SELECT * FROM team WHERE teamid = $1'
    const values0 = [teamid]

    try{
        const res0 = await pool.query(text0, values0)
        if(res0.rows.length===0){
            return {
                teaminfo: null,
                matchinfo: null,
                mostruns: null,
                mostwickets: null,
                highestscore: null,
                bestbowlavg: null,
            };        
        }

        const text1 = 'SELECT * FROM match WHERE team1 = $1 or team2 = $2 order by date DESC limit 3'
        const values1 = [teamid,teamid]
    
        try {
            const res1 = await pool.query(text1, values1)
            const text2 = 'SELECT playerid, player_name,sum(matchwise_player_performance.runs)  as total_runs FROM matchwise_player_performance join player using(playerid) WHERE teamid = $1\
                           group by playerid, player_name having sum(matchwise_player_performance.runs) >= all(SELECT sum(runs) FROM matchwise_player_performance WHERE teamid = $1 group by playerid)'
            const values2 = [teamid]

            try {
                const res2 = await pool.query(text2, values2)
                const text3 = 'SELECT playerid,player_name,sum(matchwise_player_performance.wickets) as total_wickets FROM matchwise_player_performance join player using(playerid) WHERE teamid = $1\
                               group by playerid,player_name having sum(matchwise_player_performance.wickets) >= all(SELECT sum(wickets) FROM matchwise_player_performance WHERE teamid = $1 group by playerid) '
                const values3 = [teamid]
               
                try {
                    const res3 = await pool.query(text3, values3)
                    const text4 = 'SELECT playerid, player_name, matchwise_player_performance.runs FROM matchwise_player_performance join player using(playerid) WHERE teamid = $1\
                                   and matchwise_player_performance.runs >= all (select runs from matchwise_player_performance where teamid = $1)'
                    const values4 = [teamid]
   
                    try {
                        const res4 = await pool.query(text4, values4)
                        const text5 = 'SELECT playerid, player_name FROM player_team join player using(playerid) WHERE teamid = $1'
                        const values5 = [teamid]
                        try {
                            const res5 = await pool.query(text5, values5)
                            return {
                               teaminfo: res0.rows,
                               matchinfo: res1.rows,
                               mostruns: res2.rows,
                               mostwickets: res3.rows,
                               highestscore: res4.rows,
                               players: res5.rows,
                            };        
                        } catch (err) {
                            console.log(err.stack)
                        }
                    } catch (err) {
                        console.log(err.stack)
                    }
                } catch (err) {
                    console.log(err.stack)
                }
            } catch (err) {
             console.log(err.stack)
            }
        } catch (err) {
            console.log(err.stack)
        }
    } catch (err) {
        console.log(err.stack)
    }

}

const teamallmatchinfo = async (teamid) => {
    const text0 = 'SELECT * FROM match WHERE team1 = $1 or team2 = $2 order by date DESC'
    const values0 = [teamid,teamid]

    try {
        const res0 = await pool.query(text0, values0)
        return res0.rows;
    } catch (err) {
        console.log(err.stack)
    }

}

const playerinfo = async (playerid) => {
    const text0 = 'SELECT * FROM player WHERE playerid = $1'
    const values0 = [playerid]

    try {
        const res0 = await pool.query(text0, values0)
        const text1 = 'SELECT * FROM player_team natural join team WHERE playerid = $1'
        const values1 = [playerid]
    
        try {
            const res1 = await pool.query(text1, values1)
            const text2 = 'with num_innings(num) as (select count(*) from matchwise_player_performance where balls>0 and playerid=$1),\
                        num_50s(f) as (select count(*) from matchwise_player_performance where runs>=50 and runs<100 and playerid=$1),\
                        num_100s(h) as (select count(*) from matchwise_player_performance where runs>=100 and playerid=$1),\
                        num_200s(d) as (select count(*) from matchwise_player_performance where runs>=200 and playerid=$1)\
                            SELECT count(*) as matches ,num as inns,sum(runs) as runs,max(runs) as hs,sum(runs)/num as avg, sum(balls) as balls, 100*sum(runs)/sum(balls) as sr, \
                            f as fif, h as hund, d as dual, sum(fours) as fours,sum(sixes) as sixes\
                             FROM matchwise_player_performance, num_innings,num_50s,num_100s,num_200s where playerid=$1 \
                             group by (num,f,h,d)'
            const values2 = [playerid]   
            try {
                const res2 = await pool.query(text2, values2)
                const text3 =   'with fw(w5) as (select count(*) from matchwise_player_performance where wickets>=5 and playerid=$1),\
                                tw(w10) as (select count(*) from matchwise_player_performance where wickets>=10 and playerid=$1),\
                                num_innings(num) as (select count(*) from matchwise_player_performance where overs>0 and playerid=$1)\
                                SELECT count(*) as matches,num as inns, sum(overs) as overs, sum(runs_conceded) as runs, sum(wickets) as wicks, sum(runs)/sum(overs) as eco, 6*sum(overs)/sum(wickets) as avg, sum(runs)/sum(wickets) as sr, sum(w5) as fives, sum(w10) as tens\
                                FROM matchwise_player_performance, num_innings,fw,tw where playerid=$1 \
                                group by (num,w5,w10)'
                const values3 = [playerid]
                try {
                    const res3 = await pool.query(text3, values3)
                    return {
                        playerinfo : res0.rows,
                        playerteaminfo : res1.rows,
                        batting_summary : res2.rows,
                        bowling_summary : res3.rows
                    };
                } catch (err) {
                    console.log(err.stack)
                }
            } catch (err) {
                console.log(err.stack)
            }
        } catch (err) {
            console.log(err.stack)
        }
    } catch (err) {
        console.log(err.stack)
    }
}


const allmatchinfo = async () => {
    const text0 = 'select id,date,venue,tour_name,teamid,result,total_score,total_wickets from match inner join matchwise_team_performance on id=matchid order by date desc;'

    try {
        const res0 = await pool.query(text0);
        console.log(res0);
        return {
            matches:res0.rows
        };
    } catch (err) {
        console.log(err.stack);
    }

}

const alltournamentinfo = async () => {
    const text0 = 'SELECT * FROM tournament'
    try {
        const res0 = await pool.query(text0);
        return res0.rows;
    } catch (err) {
        console.log(err.stack);
    }

}

const allteaminfo = async() => {
    const text0 = 'SELECT * FROM team'
    try {
        const res0 = await pool.query(text0)
        return res0.rows;
    } catch (err) {
        console.log(err.stack)
    }
}

const tournamentinfo = async (tour_name) => {
    const text0 = 'SELECT * FROM tour_team where tour_name = $1'
    const values0 = [tour_name]

    try {
        const res0 = await pool.query(text0, values0)
        const text1 = 'SELECT * FROM match where tour_name = $1 order by date DESC'
        const values1 = [tour_name]
    
        try {
            const res1 = await pool.query(text1, values1)
            return {
                teams: res0.rows,
                matches: res1.rows,
            };
        } catch (err) {
            console.log(err.stack)
        }
    } catch (err) {
        console.log(err.stack)
    }
}

const tournamentpointstable = async (tour_name) => {
    const text0 = 'select D.teamid, D.team_name, coalesce(matches,0) as matches, coalesce(wins,0) as wins, coalesce(losses,0) as losses from (SELECT matchwise_team_performance.teamid, count(*) as wins FROM match join matchwise_team_performance on(match.id=matchwise_team_performance.matchid)\
                   where tour_name = $1 and result = \'win\' group by matchwise_team_performance.teamid) as A\
                    full outer join \
                   (SELECT matchwise_team_performance.teamid, count(*) as losses FROM match join matchwise_team_performance on(match.id=matchwise_team_performance.matchid)\
                        where tour_name = $1 and result = \'lost\' group by matchwise_team_performance.teamid) as B using(teamid)\
                    full outer join \
                    (SELECT matchwise_team_performance.teamid, count(*) as matches FROM match join matchwise_team_performance on(match.id=matchwise_team_performance.matchid)\
                            where tour_name = $1 group by matchwise_team_performance.teamid) as C using(teamid)\
                    full outer join \
                    (SELECT teamid,team_name FROM tour_team join team using(teamid) where tour_name = $1) as D using(teamid)'
    const values0 = [tour_name]

    try {
        const res0 = await pool.query(text0, values0)
        return res0.rows;
    } catch (err) {
        console.log(err.stack)
    }
}



module.exports.homeinfo = homeinfo;
module.exports.tournamentinfo = tournamentinfo;
module.exports.alltournamentinfo = alltournamentinfo;
module.exports.tournamentpointstable = tournamentpointstable;
module.exports.matchinfo = matchinfo;
module.exports.teaminfo = teaminfo;
module.exports.playerinfo = playerinfo;
// module.exports.recordinfo = recordinfo;
module.exports.teamallmatchinfo = teamallmatchinfo;
module.exports.allmatchinfo = allmatchinfo;
module.exports.allteaminfo = allteaminfo;
