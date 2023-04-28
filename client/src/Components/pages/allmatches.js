import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link } from 'react-router-dom';
import ReactLoading from "react-loading";
import './allmatches.css'
import MatchListCard from "../cards/matchlistcard";
import {getallmatches} from '../data/data' 
const MatchListPage = (props) => {

  const matches = [1,2,3,4,5,5,6,7]
  const [loading, setLoading] = useState(true)
  const [allMatches, setAllMatches] = useState()
  const [liveMatches, setLiveMatches] = useState()
  const [recentMatches, setRecentMatches] = useState()
  const [activeTab, setActiveTab] = useState("tab1");

  const fetchdata = ()=>{
    getallmatches().then((res)=>{
      console.log(res.data);
      setAllMatches(res.data);
      if(res.status != 200){
        setLoading(true);
      }
    }).catch((res)=>{
      console.log(res);
      setLoading(true);
    });
  }
  useEffect(() => {
    fetchdata();
  }, []);
  useEffect(() => {
    if(allMatches){
      getFiltered();
    }
  }, [allMatches]);

  const getFiltered =()=>{
    setLiveMatches(allMatches.filter((match) => match.result.indexOf("In Progress") !== -1));
    setRecentMatches(allMatches.filter((match) => match.result.indexOf("In Progress") === -1));
  }

  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };

  if (!loading){
    return(
    <div>
      <ReactLoading type="bubbles" color="#263238" className="loading"
        height={500} width={250} />
    </div>)
  }
  else return (
    <div className="homepage">
        <div><h3 class="font-bold text-2xl text-lightfont my-3 mx-5">Matches</h3></div>

        <div className="selector mx-20">
                    {/* Tab nav */}
            <ul className="nav relative flex flex-row w-1/2">
                <div class={`${activeTab === "tab1" ? "active" : ""} basis-1/3 rounded-t-xl`}><li class={`font-bold p-3 text-center border-violet-950 cursor-pointer hover:text-violet-500 ease-in-out duration-300 text-lightfont`} onClick={handleTab1}>Live</li></div>
                <div class={`${activeTab === "tab2" ? "active" : ""} basis-1/3 rounded-t-xl`}><li class={`font-bold basis-1/2 p-3 text-center cursor-pointer hover:text-violet-500 ease-in-out duration-300 text-lightfont`} onClick={handleTab2}>Recent</li></div>
                </ul>
            <div className="outlet bg-darkbg h-full p-10">
                        {/* content will be shown here */}
                {matches.map(item=>{
                    return <MatchListCard/>
                })}
            </div>
        </div>
    </div>
  );
}

export default MatchListPage;