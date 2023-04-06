const queries         = require('../Services/queries')  

// sample, functions in this file are called by index.js

const getmatchinfo = async function(req, res){
    const { matchid } = req.params
    const queryresponse = await queries.match(matchid);
    console.log(queryresponse)
    res.status(200).send(queryresponse)
}

module.exports.getmatchinfo = getmatchinfo;

// const instrstudgetinfo = async function(req, res){
//     const ID=req.id;
//     const { studid } = req.params
//     const queryresponse = await queries.instrstudentinfo(ID,studid);
//     console.log(queryresponse)
//     res.status(200).send(queryresponse)
// }

// module.exports.instrstudgetinfo = instrstudgetinfo;