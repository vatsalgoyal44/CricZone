import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link } from 'react-router-dom';
import ReactLoading from "react-loading";
import './matchcard.css'
import {getmatchinfo, getallteam} from '../data/data' 

const MatchCard= (props) => {

  const [loading, setLoading] = useState(true)

  const [matchinfo, setMatchinfo] = useState();

  const [finalres, setFinalres] = useState();


  const fetchdata = ()=>{
    getmatchinfo(props.matchid).then((res)=>{
      console.log(res.data);
      setMatchinfo(res.data);
      setLoading(false);
      if(res.status != 200){
        setLoading(true);
      }
    }).catch((res)=>{
      console.log(res);
      setLoading(true);
    });
  }

  useEffect(() => {
    fetchdata();
  }, []);

    useEffect(() =>{
    console.log(matchinfo);
    if(matchinfo){
        getfinalres();
    }
  },[matchinfo]);

  const getfinalres = ()=>{
    console.log(matchinfo);
    const scoreteam1 = matchinfo.team1.total_score;
    const wicteam1 = matchinfo.team1.total_wickets;
    const scoreteam2 = matchinfo.team2.total_score;
    const wicteam2 = matchinfo.team2.total_wickets;

    if(matchinfo.team1.result == "win"){
        const result = `${matchinfo.team1.teamid} won by ${scoreteam1-scoreteam2} runs`;
        setFinalres(result) 
    }
    else{
        const result = `${matchinfo.team2.teamid} won by ${10-wicteam2} wickets`;
        setFinalres(result) 
    }
  }


  if (loading){
    return(
    <div>
      <ReactLoading type="bubbles" color="#263238" className="loading"
        height={500} width={250} />
    </div>)
  }
  else return (
    <div className="matchcard">
      <div class="flex flex-col">
        <div class="cardbox1 basis-1/5 bg-pinkcustom ">
          <h3 class="font-bold">{props.tourid}</h3>
            <div class="relative flex">
              <a class="">{props.date}</a>
              <a class="mx-3">{props.location}</a>
              <a>{props.format}</a>
            </div>
        </div>
        <div className="basis-3/5 flex flex-col h-full">
          <div class="basis-1/2 relative flex flex-row mt-2">
            <h3 class="basis-3/4 font-bold ml-3 my-2">{props.team1}</h3>
            <h3 class="basis-1/4 font-bold my-2">{matchinfo.team1.total_score}/{matchinfo.team1.total_wickets}</h3>
          </div>
          <div class="basis-1/2 relative flex flex-row">
            <h3 class="basis-3/4 font-bold ml-3 my-2">{props.team2}</h3>
            <h3 class="basis-1/4 font-bold my-2">{matchinfo.team2.total_score}/{matchinfo.team2.total_wickets}</h3>
          </div>
        </div>
        <div className="basis-1/5">
          <a class="ml-2 mb-2">{finalres}</a>
        </div>
      </div>
    </div>
  );
}

export default MatchCard;