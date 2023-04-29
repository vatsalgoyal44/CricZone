import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link , useParams} from 'react-router-dom';
import ReactLoading from "react-loading";
import './home.css'
import MatchCard from "../cards/matchcard";
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import { getteaminfo } from "../data/data";


const Teampage = (props) => {

const pathname = window.location.pathname;

  const [loading, setLoading] = useState(true)
  const [matchinfo, setMatch] = useState();
  const [players, setPlayers] = useState();
  const [highestscore, setHS] = useState();
  const [mostwickets, setMS] = useState();
  const [mostruns, setMR] = useState();

 
  let { teamid } = useParams();
  const fetchdata = ()=>{
    getteaminfo(teamid).then((res)=>{
      console.log(res.data);
      setMatch(res.data.matchinfo);
      setPlayers(res.data.players);
      setHS(res.data.highestscore);
      setMS(res.data.mostwickets);
      setMR(res.data.mostruns);
      setLoading(false);
      if(res.status != 200){
        setLoading(true)
      }
    }).catch(()=>{
    //   console.log(res.status)
    //   setLoading(true)
    })
  }

  const [currentUrl, setCurrentUrl] = React.useState(pathname);


  useEffect(() => {
    setCurrentUrl(pathname);
    setInterval(fetchdata(), 5000);
  }, [pathname])

  let { teamname } = useParams();

  const slideLeft = () => {
    var slider = document.getElementById("slider")
    slider.scrollLeft = slider.scrollLeft - 500
  }

  const slideRight = () => {
    var slider = document.getElementById("slider")
    slider.scrollLeft = slider.scrollLeft + 500
  }


  if (!loading){
    return(
    <div class = "teampage">
    <div class = "gridcontainer">
        <div class = "team">
            <h3 className="teamname">{teamname}</h3>
        </div>
        <div class = "fixtures">
            <div class = "fixtureshead"><h3>Recent Fixtures</h3></div>
            <div className="overflow-x-hidden relative flex items-center">
                <MdChevronLeft size = {40} onClick={slideLeft} className="opacity-40 cursor-pointer hover:opacity-100 ease-in-out duration-300"/>
                <div className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth" id="slider">
                    {matchinfo.map(item=>{
                        return (<div className='inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'><Link to={`/match/${item.id}`}><MatchCard date = {item.date.substring(0,item.date.indexOf("T"))} team1 = {item.team1} team2 = {item.team2} location = {item.venue} tourid = {item.tour_name} matchid = {item.id}/></Link></div>)
                    })}
                </div>
                <MdChevronRight size = {40} onClick={slideRight} className="opacity-40 cursor-pointer hover:opacity-100 ease-in-out duration-300"/></div>
           
            </div>
        <div class = "secondrow">
            <div class = "players">
                <div><h3>Players</h3></div>
                <div class="playercards">{players.map(item => {
                    return (
                        <Link to={`/player/${item.playerid}`}>
                        <div class = "playercard cursor-pointer">
                            <a>{item.player_name}</a>
                        </div>
                        </Link>
                    )
                })}</div>
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
                                <td>{item.player_name}</td>
                                <td>{item.total_wickets}</td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    </div>
                    <div className="mostwickets">
                    <div><h3>Most Runs</h3></div>
                    <table className="wicketstable">
                        <thead>
                        <tr>
                            <th>Player</th>
                            <th>Runs</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mostruns.map(item => {
                            return (
                            <tr key={item.playerid}>
                                <td>{item.player_name}</td>
                                <td>{item.total_runs}</td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                        
                    </div>
                    <div className="mostwickets">
                    <div><h3>Highest Score</h3></div>
                    <table className="wicketstable">
                        <thead>
                        <tr>
                            <th>Player</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {highestscore.map(item => {
                            return (
                            <tr key={item.playerid}>
                                <td>{item.player_name}</td>
                                <td>{item.runs}</td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
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
export default Teampage;