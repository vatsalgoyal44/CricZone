import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link } from 'react-router-dom';
import ReactLoading from "react-loading";
import './home.css'
import MatchCard from "../cards/matchcard";

const Matchpage= (props) => {

  const [loading, setLoading] = useState(true)

  if (true){
    return(
    <div class = "teampage">
    <div class = "gridcontainer">
        <div class = "team">
            <h3 className="teamname"></h3>
        </div>
        <div class = "fixtures">
            <div><h3>Score</h3></div>
            <div className="finalscore">
      
            </div>
        </div>
        <div class = "secondrow">
            <div class = "commentarycomp">
                <div><h3>Commentary</h3></div>
                <div class="commentary">

                </div>
            </div>
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