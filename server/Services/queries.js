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
// these function will be called from user.js and will use a pool to connect to database

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

        }
    }catch (err) {
        console.log(err.stack)
    }
}

module.exports.getmatchinfo = getmatchinfo;

// const instrstudentinfo = async (inst_ID,ID) => {

//     const text0 = 'SELECT * FROM instructor WHERE id = $1'
//     const values0 = [inst_ID]

//     try{
//         const res0 = await pool.query(text, values)
//         if(res0.rows.length===0){
//             return {
//                 studentdetails: res0.rows,
//                 coursedetails: res0.rows
//             }        
//         }
//         const text = 'SELECT * FROM student WHERE id = $1'
//         const values = [ID]

//         try {
//             const res = await pool.query(text, values)
//             const text2 = 'with cursem_details(yr,sem) as\
//                            (select year,semester from reg_dates\
//                             where start_time<=now() \
//                             and start_time>=all \
//                             (SELECT start_time from reg_dates where start_time <=now())\
//                             )\
//                            SELECT * \
//                            FROM takes NATURAL JOIN course, cursem_details \
//                            WHERE id = $1 \
//                            ORDER BY year DESC, \
//                            CASE semester \
//                             WHEN \'Spring\' THEN 4 \
//                             WHEN \'Summer\' THEN 3 \
//                             WHEN \'Fall\' THEN 2 \
//                             WHEN \'Winter\' THEN 1 \
//                            END'
//             const values2 = [ID]
//             try {
//                 const res2 = await pool.query(text2, values2)
//                 // return res.rows[0];
//                 return {
//                     studentdetails: res.rows[0],
//                     coursedetails: res2.rows
//                 }

//             } catch (err) {
//                 console.log(err.stack)
//             }
//         } catch (err) {
//             console.log(err.stack)
//         }
//     } catch (err) {
//         console.log(err.stack)
//     }

// }


// module.exports.instrstudentinfo = instrstudentinfo;
