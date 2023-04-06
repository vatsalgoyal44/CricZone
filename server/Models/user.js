const queries         = require('../Services/queries')  

// sample, functions in this file are called by index.js

// const instrstudgetinfo = async function(req, res){
//     const ID=req.id;
//     const { studid } = req.params
//     const queryresponse = await queries.instrstudentinfo(ID,studid);
//     console.log(queryresponse)
//     res.status(200).send(queryresponse)
// }

const getteaminfo = async function(req, res){
    const { teamid } = req.params
    const queryresponse = await queries.teaminfo(teamid);
    console.log(queryresponse)
    res.status(200).send(queryresponse)
}

const getteamallmatchinfo = async function(req, res){
    const { teamid } = req.params
    const queryresponse = await queries.teamallmatchinfo(teamid);
    console.log(queryresponse)
    res.status(200).send(queryresponse)
}

const getmatchcard = async function(req, res){
    const { matchid } = req.params
    const queryresponse = await queries.matchcard(matchid);
    console.log(queryresponse)
    res.status(200).send(queryresponse)
}

const getteamplayerstats = async function(req, res){
    const { teamid } = req.params
    const queryresponse = await queries.teamplayerstats(teamid);
    console.log(queryresponse)
    res.status(200).send(queryresponse)
}

module.exports.getteaminfo = getteaminfo;
module.exports.getteamallmatchinfo = getteamallmatchinfo;
module.exports.getmatchcard = getmatchcard;
module.exports.getteamplayerstats = getteamplayerstats;

// module.exports.instrstudgetinfo = instrstudgetinfo;
