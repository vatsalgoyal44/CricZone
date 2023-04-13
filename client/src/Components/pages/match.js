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
            <div class = "info border-b-2 border-violet-950">
                    <h3 class="font-bold mx-3 my-1 text-lg">Indian Premier League</h3>
                    <div class="relative flex">
                        <a class="mx-3">Date</a>
                        <a>Chennai</a>
                    </div>
                </div>
            <div class = "status">
            <div class="flex flex-row">
                <div class="basis-3/4">
                    <h3 class="font-bold mx-3 my-1 text-xl">Live</h3>
                    <div class="flex flex-col">
                        <div class="basis-1/2 relative flex flex-row">
                            <h3 class="basis-3/4 font-bold ml-10 my-5 text-xl">Chennai Super Kings</h3>
                            <h3 class="basis-1/4 font-bold my-5 text-xl">100/8</h3>
                        </div>
                        <div class="basis-1/2 relative flex flex-row">
                            <h3 class="basis-3/4 font-bold ml-10 my-5 text-xl">Mumbai Indians*</h3>
                            <h3 class="basis-1/4 font-bold my-5 text-xl">100/8</h3>
                        </div>
                    </div>
                </div>
                <div class="basis-1/4 flex flex-col">
                    <div class="basis-3/4">

                    </div>
                    <div class="basis-1/4">
                        
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div class = "flex flex-row">
                <div class="basis-5"><h3 class="font-bold mx-3 my-1 text-lg">Commentary</h3></div>
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