import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link } from 'react-router-dom';
import ReactLoading from "react-loading";
import './home.css'
import MatchCard from "../cards/matchcard";
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import {getalltournament} from '../data/data' 


const Homepage= (props) => {

  const [loading, setLoading] = useState(true)
  const [res, setRes] = useState('')
  const [tournaments, setTournaments] = useState('')
  const slideLeft = () => {
    var slider = document.getElementById("slider")
    slider.scrollLeft = slider.scrollLeft - 500
  }
  const [activeTab, setActiveTab] = useState("tab1");

  const fetchdata = ()=>{
    getalltournament().then((res)=>{
      console.log(res.data)
      setTournaments(res.data);
      
      setLoading(false)
      if(res.status != 200){
        setLoading(true)
      }
    }).catch(()=>{
      console.log(res.status)
      setLoading(true)
    })
  }

  useEffect(() => {
    fetchdata()
  }, [])

  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };
  const handleTab3 = () => {
    // update the state to tab3
    setActiveTab("tab3");
  };
  const handleTab4 = () => {
    // update the state to tab3
    setActiveTab("tab4");
  };
  const slideRight = () => {
    var slider = document.getElementById("slider")
    slider.scrollLeft = slider.scrollLeft + 500
  }
  const matches = [1,2,3,4,5,5,6,7]

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
                        return (<div className='inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'><Link to="/match/1"><MatchCard/></Link></div>)
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
        <div class = "fixtureshead"><h3 class=" font-bold">Rankings</h3></div>
        <div className="selector mx-20 mt-5">
                    {/* Tab nav */}
            <ul className="nav relative flex flex-row w-1/2">
                <div class={`${activeTab === "tab1" ? "active" : ""} basis-1/3 rounded-t-xl`}><li class={`font-bold p-3 text-center border-violet-950 cursor-pointer hover:text-violet-500 ease-in-out duration-300 text-lightfont`} onClick={handleTab1}>Batting</li></div>
                <div class={`${activeTab === "tab2" ? "active" : ""} basis-1/3 rounded-t-xl`}><li class={`font-bold basis-1/2 p-3 text-center cursor-pointer hover:text-violet-500 ease-in-out duration-300 text-lightfont`} onClick={handleTab2}>Bowling</li></div>
                <div class={`${activeTab === "tab3" ? "active" : ""} basis-1/3 rounded-t-xl`}><li class={`font-bold basis-1/2 p-3 text-center cursor-pointer hover:text-violet-500 ease-in-out duration-300 text-lightfont`} onClick={handleTab3}>All-Rounder</li></div>
                <div class={`${activeTab === "tab4" ? "active" : ""} basis-1/3 rounded-t-xl`}><li class={`font-bold basis-1/2 p-3 text-center cursor-pointer hover:text-violet-500 ease-in-out duration-300 text-lightfont`} onClick={handleTab4}>Teams</li></div>
                </ul>
            <div className="outlet bg-darkbg h-full p-10 flex flex-row">
                        {/* content will be shown here */}
                  <div className="mostwickets basis-1/3">
                    <div><h3>Test</h3></div>
                    <table className="wicketstable">
                        <thead>
                        <tr>
                            <th class="w-4/5">Player/Team</th>
                            <th>Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        
                        </tbody>
                    </table>
                  </div>
                  <div className="mostwickets basis-1/3">
                    <div><h3>ODI</h3></div>
                    <table className="wicketstable">
                        <thead>
                        <tr>
                            <th class="w-4/5">Player/Team</th>
                            <th>Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        
                        </tbody>
                    </table>
                  </div>
                  <div className="mostwickets basis-1/3">
                    <div><h3>T20</h3></div>
                    <table className="wicketstable">
                        <thead>
                        <tr>
                            <th class="w-4/5">Player/Team</th>
                            <th>Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        
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