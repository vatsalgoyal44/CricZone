import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link } from 'react-router-dom';
import ReactLoading from "react-loading";
import {getmatchinfo, getallteam} from '../data/data' 
import './matchcard.css'
const MatchListCard= (props) => {
  const [loading, setLoading] = useState(true)
  let finalres = ""

  const matchData = props.matchData;
  const matchid = props.matchid;
  
  console.log("MATCHDATA", matchData)
  // const getfinalres = ()=>{
  //   // console.log(matchinfo);
  //   const scoreteam1 = matchData.total_score;
  //   const wicteam1 = matchData.total_wickets;
  //   const scoreteam2 = matchData.total_score2;
  //   const wicteam2 = matchData.total_wickets2;

  //   if(matchData.res == "win"){
  //       const result = `${matchData.teamid} won by ${scoreteam1-scoreteam2} runs`;
  //       finalres = result
  //   }
  //   else{
  //       const result = `${matchData.teamid2} won by ${10-wicteam2} wickets`;
  //       finalres = result
  //   }
  // }

  // getfinalres();

  
// const margin = Math.abs(parseInt(matchData.score) - parseInt(matchData.score2));
  if (!true){
    return(
    <div>
      <ReactLoading type="bubbles" color="#263238" className="loading"
        height={500} width={250} />
    </div>)
  }
  
  else return (
    <div className="matchlistcard">
      <Link to={`/match/${matchid}`}>
      <div class="flex flex-col">
        <div class="cardbox1 basis-1/5 bg-pinkcustom ">
          <h3 class="font-bold">{matchData.tour_name}</h3>
            <div class="relative flex">
            <a>{new Date(matchData.date).toLocaleString('en-US', {dateStyle: 'medium'})}</a>
              <a class="mx-3">{matchData.venue}</a>
            </div>
        </div>
        <div className="basis-3/5 flex flex-col h-full">
          <div class="basis-1/2 relative flex flex-row mt-2">
            <h3 class="basis-3/4 font-bold ml-3 my-2">{matchData.teamid}</h3>
            <h3 class="basis-1/4 font-bold my-2">{matchData.total_score}/{matchData.total_wickets}</h3>
          </div>
          <div class="basis-1/2 relative flex flex-row">
            <h3 class="basis-3/4 font-bold ml-3 my-2">{matchData.teamid2}</h3>
            <h3 class="basis-1/4 font-bold my-2">{matchData.total_score2}/{matchData.total_wickets2}</h3>
          </div>
        </div>
        {!matchData.result.includes("In Progress") && (
    <div className="basis-1/5">
      <a class="ml-2 mb-2">{finalres}</a>
    </div>
)}
{matchData.result.includes("In Progress") && (
    <div className="basis-1/5">
      <a class="ml-2 mb-2">In Progress</a>
    </div>
)}
      </div>
      </Link>
    </div>
  );
}

export default MatchListCard;