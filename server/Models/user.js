const queries         = require('../Services/queries')  

// sample, functions in this file are called by index.js

const getmatchinfo = async function(req, res){
    const { matchid } = req.params
    const queryresponse = await queries.matchinfo(matchid);
    console.log(queryresponse)
    res.status(200).send(queryresponse)
}

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

module.exports.getmatchinfo = getmatchinfo;
module.exports.getteaminfo = getteaminfo;
module.exports.getteamallmatchinfo = getteamallmatchinfo;