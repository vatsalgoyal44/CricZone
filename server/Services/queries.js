const Pool = require('pg').Pool
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

// sample:
// function for getting match specific info (completed match)
const matchinfo = async (matchid) => {
    const text0 = 'SELECT * FROM match WHERE id = $1'
    const values0 = [matchid]
    try{
        const res0 = await pool.query(text0, values0)
        const text1 = 'SELECT * FROM matchwise_team_performance WHERE matchid = $1'
        const values1 = [matchid]
        try{
            const res1 = await pool.query(text1, values1)
            const text2 = 'SELECT * FROM matchwise_player_performance WHERE matchid = $1'
            const values2 = [matchid]
            try{
                const res2 = await pool.query(text2, values2)
                if(res0.rows.length>0 && res1.rows.length>=2){
                    return {
                        match_deets: res0.rows, //one row contains id,date,venue,tour_name,team1(id),team2(id),year
                        //2rows. each row contains teamid, matchid, result (winner/loser/draw), total_score (of the team), total_wickets (taken by the team)
                        team1: res1.rows[0], 
                        team2: res1.rows[1], 
                        //ideally 22 rows
                        //each row contains playerid, teamid, matchid and other details as shown in the schema (separate them teamwise from the frontend)
                        player_deets: res2.rows 
                    };
                }else{
                    return {
                        match_deets: null, 
                        team1: null, 
                        team2: null, 
                        player_deets: null
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
            return {
                playerinfo : res0.rows,
                playerteaminfo : res1.rows
            };
        } catch (err) {
            console.log(err.stack)
        }
    } catch (err) {
        console.log(err.stack)
    }

}


const allmatchinfo = async () => {
    const text0 = 'SELECT * FROM match order by date DESC'
    const values0 = [teamid,teamid]

    try {
        const res0 = await pool.query(text0, values0)
        return res0.rows;
    } catch (err) {
        console.log(err.stack)
    }

}

const alltournamentinfo = async () => {
    const text0 = 'SELECT * FROM tournament'
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

// const recordinfo = async () => {
//     const text0 = 'SELECT * FROM player WHERE playerid = $1'
//     const values0 = [playerid]

//     try {
//         const res0 = await pool.query(text0, values0)
//         const text1 = 'SELECT * FROM player left outer join player_team natural join team WHERE playerid = $1'
//         const values1 = [playerid]
    
//         try {
//             const res1 = await pool.query(text1, values1)
//             return {
//                 playerinfo : res0.rows,
//                 playerteaminfo : res1.rows
//             };
//         } catch (err) {
//             console.log(err.stack)
//         }
//     } catch (err) {
//         console.log(err.stack)
//     }

// }



module.exports.tournamentinfo = tournamentinfo;
module.exports.alltournamentinfo = alltournamentinfo;
module.exports.matchinfo = matchinfo;
module.exports.teaminfo = teaminfo;
module.exports.playerinfo = playerinfo;
// module.exports.recordinfo = recordinfo;
module.exports.teamallmatchinfo = teamallmatchinfo;
module.exports.allmatchinfo = allmatchinfo;