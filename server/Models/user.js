const queries         = require('../Services/queries')  

// sample, functions in this file are called by index.js

const gethome = async function(req, res){
    const queryresponse = await queries.homeinfo();
    console.log(queryresponse)
    res.status(200).send(queryresponse)
}

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

const gettournamentinfo = async function(req, res){
    const { tour_name } = req.params
    const queryresponse = await queries.tournamentinfo(tour_name);
    console.log(queryresponse)
    res.status(200).send(queryresponse)
}

const getalltournamentinfo = async function(req, res){
    const queryresponse = await queries.alltournamentinfo();
    console.log(queryresponse)
    res.status(200).send(queryresponse)
}

const getallteaminfo = async function(req, res){
    const queryresponse = await queries.allteaminfo();
    console.log(queryresponse)
    res.status(200).send(queryresponse)
}

const getallmatchinfo = async function(req, res){
    const queryresponse = await queries.allmatchinfo();
    console.log(queryresponse)
    res.status(200).send(queryresponse)
}

// const getrecordinfo = async function(req, res){
//     const queryresponse = await queries.recordinfo();
//     console.log(queryresponse)
//     res.status(200).send(queryresponse)
// }

const getplayerinfo = async function(req, res){
    const { playerid } = req.params
    const queryresponse = await queries.playerinfo(playerid);
    console.log(queryresponse)
    res.status(200).send(queryresponse)
}
module.exports.gethome = gethome;
module.exports.gettournamentinfo = gettournamentinfo;
module.exports.getalltournamentinfo = getalltournamentinfo;
module.exports.getmatchinfo = getmatchinfo;
module.exports.getteaminfo = getteaminfo;
// module.exports.getrecordinfo = getrecordinfo;
module.exports.getplayerinfo = getplayerinfo;
module.exports.getteamallmatchinfo = getteamallmatchinfo;
module.exports.getallteaminfo = getallteaminfo;