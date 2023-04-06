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
//function for getting match specific info (completed match)
const getmatchinfo = async (matchid) => {
    const text0 = 'SELECT * FROM match WHERE id = $1'
    const values0 = [matchid]
    try{
        const res0 = await pool.query(text0, values0)
        const text1 = 'SELECT * FROM matchwise_team_performance WHERE matchid = $1'
        const values1 = [matchid]
        const res1 = await pool.query(text1, values1)
        const text2 = 'SELECT * FROM matchwise_player_performance WHERE matchid = $1'
        const values2 = [matchid]
        const res2 = await pool.query(text2, values2)
        if(res0.rows.length && res1.rows.length()>=2){
            return {
                match_deets: res0.rows, //one row contains id,date,venue,tour_name,team1(id),team2(id),year
                //2rows. each row contains teamid, matchid, result (winner/loser/draw), total_score (of the team), total_wickets (taken by the team)
                team1: res1.rows[0], 
                team1: res2.rows[1], 
                //ideally 22 rows
                //each row contains playerid, teamid, matchid and other details as shown in the schema (separate them teamwise from the frontend)
                player_deets: res2.rows 
            } 
        }else{
            return {
                match_deets: null, 
                team1: null, 
                team1: null, 
                player_deets: null
            } 
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
                teaminfo: res0.rows,
                matchinfo: res0.rows
            }        
        }

        const text1 = 'SELECT * FROM match WHERE team1 = $1 or team2 = $2 order by date DESC limit 3'
        const values1 = [teamid,teamid]
    
        try {
            const res1 = await pool.query(text1, values1)
            return {
                teaminfo: res0.rows,
                matchinfo: res1.rows
            };
        } catch (err) {
            console.log(err.stack)
        }
    } catch (err) {
        console.log(err.stack)
    }

}

const teamallmatchinfo = async (teamid) => {
    const text0 = 'SELECT * FROM match WHERE team1 = $1 or team2 = $2 order by date DESC limit 3'
    const values0 = [teamid,teamid]

    try {
        const res0 = await pool.query(text0, values0)
        return res0.rows;
    } catch (err) {
        console.log(err.stack)
    }

}

const matchcard = async (matchid) => {
    const text0 = 'SELECT * FROM match WHERE id = $1'
    const values0 = [matchid]
    try {
        const res0 = await pool.query(text0, values0)
        const text1 = 'SELECT * FROM matchwise_team_performance WHERE teamid = $1 and matchid = $2'
        const values1 = [res0.rows[0].team1,matchid]
        try {
            const res1 = await pool.query(text1, values1)
            const text2 = 'SELECT * FROM matchwise_team_performance WHERE teamid = $1 and matchid = $2'
            const values2 = [res0.rows[0].team2,matchid]
            try {
                const res2 = await pool.query(text2, values2)
                const text3 = 'SELECT * FROM matchwise_player_performance WHERE teamid = $1 and matchid = $2'
                const values3 = [res0.rows[0].team1,matchid]
                try {
                    const res3 = await pool.query(text3, values3)
                    const text4 = 'SELECT * FROM matchwise_player_performance WHERE teamid = $1 and matchid = $2'
                    const values4 = [res0.rows[0].team2,matchid]
                    try {
                        const res4 = await pool.query(text4, values4)
                        return {
                            matchinfo: res0.rows,
                            team1_perf_info: res1.rows,
                            team2_perf_info: res2.rows,
                            team1_player_perf_info: res3.rows,
                            team2_player_perf_info: res4.rows
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

const teamplayerstats = async (teamid) => {
    const text0 = 'SELECT * FROM matchwise_player_performance WHERE teamid = $1\
                   group by '
    const values0 = [teamid]

    try {
        const res0 = await pool.query(text0, values0)
        return res0.rows;
    } catch (err) {
        console.log(err.stack)
    }
}

module.exports.getmatchinfo = getmatchinfo;
module.exports.teaminfo = teaminfo;
module.exports.teamallmatchinfo = teamallmatchinfo;
module.exports.matchcard = matchcard;
module.exports.teamplayerstats = teamplayerstats;

// module.exports.instrstudentinfo = instrstudentinfo;
