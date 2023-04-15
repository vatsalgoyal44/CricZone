import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link , useParams} from 'react-router-dom';
import ReactLoading from "react-loading";
import './home.css'
import MatchCard from "../cards/matchcard";
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';


const Tournamentpage = (props) => {

  const [loading, setLoading] = useState(true)

  let { teamname } = useParams();

  const slideLeft = () => {
    var slider = document.getElementById("slider")
    slider.scrollLeft = slider.scrollLeft - 500
  }

  const slideRight = () => {
    var slider = document.getElementById("slider")
    slider.scrollLeft = slider.scrollLeft + 500
  }

  const matches = [1,2,3,4,5,5,6,7]
  const mostwickets = [
    {"data":[{"playerid":"1","player":"X", "value":2}, {"playerid":"2","player":"Y", "value":1}], "heading":"Most Wickets", "col":"Wickets"},
    {"data":[{"playerid":"1","player":"X", "value":2}, {"playerid":"2","player":"Y", "value":1}], "heading":"Most Runs", "col":"Runs"}
    ]

  const Players = ["Sachin Tendulkar", "MS Dhoni", "Virat Kohli", "Rohit Sharma"]

  if (true){
    return(
    <div class = "teampage">
    <div class = "gridcontainer">
        <div class = "team">
            <h3 className="teamname">ICC World Cup 2023</h3>
        </div>
        <div class = "fixtures">
            <div><h3>Recent Fixtures</h3></div>
            <div className="overflow-x-hidden relative flex items-center">
                <MdChevronLeft size = {40} onClick={slideLeft} className="opacity-40 cursor-pointer hover:opacity-100 ease-in-out duration-300"/>
                <div className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth" id="slider">
                    {matches.map(item=>{
                        return (<div className='inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'><Link to="/match/1"><MatchCard/></Link></div>)
                    })}
                </div>
                <MdChevronRight size = {40} onClick={slideRight} className="opacity-40 cursor-pointer hover:opacity-100 ease-in-out duration-300"/></div>
           
            </div>
        <div class = "secondrow">
            <div class = "players">
                <div><h3>Points Table</h3></div>

                        <table className="pointtable table-auto h-full">
                        <thead>
                        <tr>
                            <th class="w-1/2">Team</th>
                            <th>P</th>
                            <th>W</th>
                            <th>L</th>
                            <th>D</th>
                            <th>Points</th>
                            <th>NR</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* {mostwickets.map(item => {
                            return (
                            <tr key={item.playerid}>
                                <td>{item.player}</td>
                                <td>{item.wickets}</td>
                            </tr>
                            );
                        })} */}
                        <tr key="India">
                                <td>India</td>
                                <td>2</td>
                                <td>2</td>
                                <td>0</td>
                                <td>0</td>
                                <td>4</td>
                                <td>200</td>
                            </tr>
                        </tbody>
                    </table>
                       
            </div>
            <div class = "stats">
                <div className="stathead"><h3>Statistics</h3></div>
                <div className="statcards">
                    <div className="mostwickets">
                    <div><h3>Most Wickets</h3></div>
                    <table className="wicketstable">
                        <thead>
                        <tr>
                            <th>Player</th>
                            <th>Wickets</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mostwickets.map(item => {
                            return (
                            <tr key={item.playerid}>
                                <td>{item.player}</td>
                                <td>{item.wickets}</td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    </div>
                    <div className="mostruns">
                        
                    </div>
                    <div className="highestscore">
                        
                    </div>
                    <div className="bestaverage">
                        
                    </div>
                </div>
            </div>  
        </div>  
    </div>
    </div>
  );
}
}
export default Tournamentpage;