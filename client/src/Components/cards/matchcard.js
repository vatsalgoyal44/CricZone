import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link } from 'react-router-dom';
import ReactLoading from "react-loading";
import './matchcard.css'
const MatchCard= (props) => {

  const [loading, setLoading] = useState(true)

  if (!loading){
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
            <h3 class="basis-1/4 font-bold my-2">{props.score1}</h3>
          </div>
          <div class="basis-1/2 relative flex flex-row">
            <h3 class="basis-3/4 font-bold ml-3 my-2">{props.team2}</h3>
            <h3 class="basis-1/4 font-bold my-2">{props.score2}</h3>
          </div>
        </div>
        <div className="basis-1/5">
          <a class="ml-2 mb-2">Mumbai Indians won by 2 wickets</a>
        </div>
      </div>
    </div>
  );
}

export default MatchCard;