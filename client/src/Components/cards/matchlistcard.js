import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link } from 'react-router-dom';
import ReactLoading from "react-loading";
import './matchcard.css'
const MatchListCard= (props) => {

  const [loading, setLoading] = useState(true)

  if (!loading){
    return(
    <div>
      <ReactLoading type="bubbles" color="#263238" className="loading"
        height={500} width={250} />
    </div>)
  }
  else return (
    <div className="matchlistcard">
      <div class="flex flex-col">
        <div class="cardbox1 basis-1/5 bg-pinkcustom ">
          <h3 class="font-bold">Indian Premier League</h3>
            <div class="relative flex">
              <a class="">Date</a>
              <a class="mx-3">Chennai</a>
              <a>T20</a>
              <a class="mx-3">7:30 PM</a>
            </div>
        </div>
        <div className="basis-3/5 flex flex-col h-full">
          <div class="basis-1/2 relative flex flex-row mt-2">
            <h3 class="basis-3/4 font-bold ml-3 my-2">Chennai Super Kings</h3>
            <h3 class="basis-1/4 font-bold my-2">100/8</h3>
          </div>
          <div class="basis-1/2 relative flex flex-row">
            <h3 class="basis-3/4 font-bold ml-3 my-2">Mumbai Indians*</h3>
            <h3 class="basis-1/4 font-bold my-2">100/8</h3>
          </div>
        </div>
        <div className="basis-1/5">
          <a class="ml-2 mb-2">Mumbai Indians won by 2 wickets</a>
        </div>
      </div>
    </div>
  );
}

export default MatchListCard;