import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link } from 'react-router-dom';
import ReactLoading from "react-loading";
import './home.css'
import MatchCard from "../cards/matchcard";
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import {getalltournament, getallmatch, gethome} from '../data/data' 


const Homepage= (props) => {

  const [loading, setLoading] = useState(true)
  const [res, setRes] = useState('')
  const [tournaments, setTournaments] = useState('')
  const [matches, setMatch] = useState('')
  const [bat, setBat] = useState('')
  const [bowl, setBowl] = useState('')
  const [wicks, setWicks] = useState('')
  const [ar, setAr] = useState('')

  const slideLeft = () => {
    var slider = document.getElementById("slider")
    slider.scrollLeft = slider.scrollLeft - 500
  }
  const [activeTab, setActiveTab] = useState("tab1");

  const fetchdata = ()=>{
    gethome().then((res)=>{
      console.log(res.data);
      setTournaments(res.data.tours);
      setMatch(res.data.recent_matches);
      setLoading(false);
      setBat(res.data.batting)
      setBowl(res.data.bowling)
      setWicks(res.data.wickets)
      setAr(res.data.allrounders)
      if(res.status != 200){
        setLoading(true)
      }
    }).catch(()=>{
      console.log(res.status)
      setLoading(true)
    })
  }

  useEffect(() => {
    setInterval(fetchdata(), 3000);
  }, []);

  useEffect(() => {
    setInterval(fetchdata(), 3000);
  }, [tournaments]);

  const slideRight = () => {
    var slider = document.getElementById("slider")
    slider.scrollLeft = slider.scrollLeft + 500
  }

  if (loading){
    return(
    <div>
      <ReactLoading type="bubbles" color="#263238" className="loading"
        height={500} width={250} />
    </div>)
  }
  else return (
    <div className="homepage">
      <div class = "fixtures">
            <div class = "fixtureshead"><h3 class=" font-bold">Recent Matches</h3></div>
            <div className="overflow-x-hidden relative flex items-center">
                <MdChevronLeft size = {40} onClick={slideLeft} className="opacity-40 cursor-pointer hover:opacity-100 ease-in-out duration-300"/>
                <div className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth" id="slider">
                    {matches.map(item=>{
                        return (<div className='inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'><Link to={`/match/${item.id}`}><MatchCard date = {item.date.substring(0,item.date.indexOf("T"))} team1 = {item.team1} team2 = {item.team2} location = {item.venue} tourid = {item.tour_name} matchid = {item.id}/></Link></div>)
                    })}
                </div>
                <MdChevronRight size = {40} onClick={slideRight} className="opacity-40 cursor-pointer hover:opacity-100 ease-in-out duration-300"/></div>
            </div>
            
        <div class = "fixtureshead"><h3 class=" font-bold">Series</h3></div>
        <div class="series flex flex-col w-full">
        <div class="seriescards">{tournaments.map(item => {
                    return (
                        <Link to={`/tournament/${item.tour_name}`}>
                        <div class = "playercard cursor-pointer">
                            <a>{item.tour_name}</a>
                        </div>
                        </Link>
                    )
                })}</div>
      </div>

      <div class = "rankings mt-8">
        <div class = "fixtureshead"><h3 class=" font-bold">Records</h3></div>
        <div className="selector mx-20 mt-5">
                    {/* Tab nav */}
            {/* <ul className="nav relative flex flex-row w-1/2">
                <div class={`${activeTab === "tab1" ? "active" : ""} basis-1/3 rounded-t-xl`}><li class={`font-bold p-3 text-center border-violet-950 cursor-pointer hover:text-violet-500 ease-in-out duration-300 text-lightfont`} onClick={handleTab1}>Batting</li></div>
                <div class={`${activeTab === "tab2" ? "active" : ""} basis-1/3 rounded-t-xl`}><li class={`font-bold basis-1/2 p-3 text-center cursor-pointer hover:text-violet-500 ease-in-out duration-300 text-lightfont`} onClick={handleTab2}>Bowling</li></div>
                <div class={`${activeTab === "tab3" ? "active" : ""} basis-1/3 rounded-t-xl`}><li class={`font-bold basis-1/2 p-3 text-center cursor-pointer hover:text-violet-500 ease-in-out duration-300 text-lightfont`} onClick={handleTab3}>All-Rounder</li></div>
                <div class={`${activeTab === "tab4" ? "active" : ""} basis-1/3 rounded-t-xl`}><li class={`font-bold basis-1/2 p-3 text-center cursor-pointer hover:text-violet-500 ease-in-out duration-300 text-lightfont`} onClick={handleTab4}>Teams</li></div>
                </ul> */}


            <div className="outlet bg-darkbg h-full p-10 flex flex-row rounded-lg">
                        {/* content will be shown here */}
                  <div className="mostwickets basis-1/3">
                    <div><h3>Best Batsmen</h3></div>
                    <table className="wicketstable">
                        <thead>
                        <tr>
                            <th class="w-4/5">Player</th>
                            <th class="w-1/5">Batting Average</th>
                        </tr>
                        </thead>
                        {bat &&
                        bat
                          .sort((a, b) => b.runs / b.innings - a.runs / a.innings) // Sort the array in descending order of runs per innings
                          .slice(0, 10) // Get the top 10 items
                          .map((item, index) => ( // Add an index to enumerate the items
                            <tr key={item.playerid}>
                              <td>{index+1}. {item.player_name}</td>
                              <td>{(item.runs / item.innings).toFixed(2)}</td>
                            </tr>
                          ))}


                    </table>
                  </div>
                  {/* <div className="mostwickets basis-1/3">
                    <div><h3>Runs given per match</h3></div>
                    <table className="wicketstable">
                        <thead>
                        <tr>
                            <th class="w-4/5">Player</th>
                            <th>Eco</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bowl && bowl.map((item) => (
                          <tr key={item.playerid}>
                            <td>{item.player_name}</td>
                            <td>{(item.runs_conceded/(item.matches)).toFixed(2)}</td>
                          </tr>
                        ))}
                        </tbody>
                    </table>
                  </div> */}
                  <div className="mostwickets basis-1/3">
                    <div><h3>Best Bowlers</h3></div>
                    <table className="wicketstable">
                        <thead>
                        <tr>
                            <th class="w-4/5">Player</th>
                            <th>Bowling Average</th>
                        </tr>
                        </thead>
                        <tbody>
                        {wicks &&
                        wicks
                          .sort((a, b) => b.wickets / b.matches - a.wickets / a.matches) // Sort the array in descending order of wickets per match
                          .slice(0, 10) // Get the top 10 items
                          .map((item, index) => ( // Add an index to enumerate the items
                            <tr key={item.playerid}>
                              <td>{index + 1}. {item.player_name}</td> {/* Add an index to enumerate the items */}
                              <td>{(item.wickets / item.matches).toFixed(2)}</td>
                            </tr>
                          ))}

              
                        </tbody>
                    </table>
                  </div>
                  <div className="mostwickets basis-1/3">
                    <div><h3>Most Valuable Players</h3></div>
                    <table className="wicketstable">
                        <thead>
                        <tr>
                            <th class="w-4/5">Player</th>
                            <th>Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ar &&
                        ar
                          .sort((a, b) => b.rating - a.rating) // Sort the array in descending order of rating
                          .slice(0, 10) // Get the top 10 items
                          .map((item, index) => ( // Add an index to enumerate the items
                            <tr key={item.playerid}>
                              <td>{index + 1}. {item.player_name}</td>
                              <td>{item.rating}</td>
                            </tr>
                          ))}

                        </tbody>
                    </table>
                  </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;