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

const getteammatchinfo = async function(req, res){
    const { teamid } = req.params
    const queryresponse = await queries.teaminfo(teamid);
    console.log(queryresponse)
    res.status(200).send(queryresponse)
}


module.exports.getteaminfo = getteaminfo;
module.exports.getteammatchinfo = getteammatchinfo;

// module.exports.instrstudgetinfo = instrstudgetinfo;
