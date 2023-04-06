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

const teaminfo = async (teamid) => {

    const text0 = 'SELECT * FROM team WHERE teamid = $1'
    const values0 = [teamid]

    try{
        const res0 = await pool.query(text0, values0)
        return res0.rows;
    } catch (err) {
        console.log(err.stack)
    }

}

const teammatchinfo = async (teamid) => {
    const text0 = 'SELECT * FROM match WHERE team1 = $1 or team2 = $2 order by date DESC limit 3'
    const values0 = [teamid,teamid]

    try {
        const res0 = await pool.query(text0, values0)
        return res0.rows;
    } catch (err) {
        console.log(err.stack)
    }

}

const teamplayerstats = async (teamid) => {

}


module.exports.teaminfo = teaminfo;
module.exports.teammatchinfo = teammatchinfo;

// module.exports.instrstudentinfo = instrstudentinfo;
