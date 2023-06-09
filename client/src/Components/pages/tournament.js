import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link , useParams} from 'react-router-dom';
import ReactLoading from "react-loading";
import './home.css'
import MatchCard from "../cards/matchcard";
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import { gettournamentinfo, getpointstable } from "../data/data";


const Tournamentpage = (props) => {

  const [loading, setLoading] = useState(true)
  const [tournamentinfo, setInfo] = useState()
  const [matchinfo, setMatch] = useState()
  const [live, setLive] = useState()

 
  const [points, setPoints] = useState()
  let { tourid } = useParams();
  const fetchdata = ()=>{
    gettournamentinfo(tourid).then((res)=>{
      setInfo(res.data);
      setMatch(res.data.matches);
      setPoints(res.data.points);
      setLoading(false);
      console.log(loading);
      if(res.status != 200){
        setLoading(true)
      }
    }).catch(()=>{
    //   console.log(res.status)
    //   setLoading(true)
    })
  }

  useEffect(() => {
    setInterval(fetchdata(), 5000);
  }, []);

  useEffect(() => {
    setInterval(fetchdata(), 5000);
  }, [tournamentinfo]);

  const slideLeft = () => {
    var slider = document.getElementById("slider")
    slider.scrollLeft = slider.scrollLeft - 500
  }

  const slideRight = () => {
    var slider = document.getElementById("slider")
    slider.scrollLeft = slider.scrollLeft + 500
  }


  const mostwickets = [
    {"data":[{"playerid":"1","player":"X", "value":2}, {"playerid":"2","player":"Y", "value":1}], "heading":"Most Wickets", "col":"Wickets"},
    {"data":[{"playerid":"1","player":"X", "value":2}, {"playerid":"2","player":"Y", "value":1}], "heading":"Most Runs", "col":"Runs"}
    ]

  const Players = ["Sachin Tendulkar", "MS Dhoni", "Virat Kohli", "Rohit Sharma"]
  if (loading){
    return(
    <div>
      <ReactLoading type="bubbles" color="#263238" className="loading"
        height={500} width={250} />
    </div>)
  }
  else{
    return(
    <div class = "teampage">
    <div class = "gridcontainer">
        <div class = "team">
            <h3 className="teamname">{tournamentinfo.teams[0].tour_name}</h3>
        </div>
        <div class = "fixtures">
            <div><h3 className="head">Recent Fixtures</h3></div>
            <div className="overflow-x-hidden relative flex items-center">
                <MdChevronLeft size = {40} onClick={slideLeft} className="opacity-40 cursor-pointer hover:opacity-100 ease-in-out duration-300"/>
                <div className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth" id="slider">
                    {console.log(matchinfo)}
                    {matchinfo.map(item=>{
                        return (<div className='inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'><Link to={`/match/${item.id}`}><MatchCard date = {item.date.substring(0,item.date.indexOf("T"))} team1 = {item.team1} team2 = {item.team2} location = {item.venue} tourid = {item.tour_name} matchid = {item.id}/></Link></div>)
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
                            <th className="w-1/4">Team Name</th>
                            <th>Matches</th>
                            <th>Wins</th>
                            <th>Draw</th>
                            <th>Losses</th>
                            <th>Points</th>
                        </tr>
                        </thead>
                        <tbody>
                        {points && points.map(item => {
                            return (
                            <tr key={item.teamid}>
                                <td>{item.team_name}</td>
                                <td>{item.matches}</td>
                                <td>{item.wins}</td>
                                <td>{item.draws}</td>
                                <td>{item.losses}</td>
                                <td>{2*parseInt(item.wins) + 1*parseInt(item.draws)}</td>
                            </tr>
                            );
                        })}
                        {/* <tr key="India">
                                <td>India</td>
                                <td>2</td>
                                <td>2</td>
                                <td>0</td>
                                <td>0</td>
                                <td>4</td>
                                <td>200</td>
                            </tr> */}
                        </tbody>
                    </table>
                       
            </div>
            {/* <div class = "stats">
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
            </div>   */}
        </div>  
    </div>
    </div>
  );
}
}
export default Tournamentpage;