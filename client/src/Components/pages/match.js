import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link } from 'react-router-dom';
import ReactLoading from "react-loading";
import './match.css'
import MatchCard from "../cards/matchcard";

const Matchpage= (props) => {

  const [loading, setLoading] = useState(true)

  if (true){
    return(
    <div class = "matchpage">
    <div class = "gridcontainermatch">
        <div class = "firstcol">
        <div class = "curscore">
            <div class = "info">
                <div>
                    <h3 class="font-bold mx-5 my-1 text-lg">Indian Premier League</h3>
                    <div class="relative flex">
                        <a class="mx-5">Date</a>
                        <a>Chennai</a>
                    </div>
                </div>
            </div>
            <div class = "status">

            </div>
        </div>
        <div class = "commentarycomp">
                <div><h3>Commentary</h3></div>
                <div class="commentary">

                </div>
            </div>
        </div>
        <div class = "secondcol">
            
            <div class = "stats">
                <div><h3>Scorecard</h3></div>
                <div className="scorecard">

                </div>
            </div>  
        </div>  
    </div>
    </div>
  );
}
}

export default Matchpage;