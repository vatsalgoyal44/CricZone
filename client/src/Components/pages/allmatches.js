import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link } from 'react-router-dom';
import ReactLoading from "react-loading";
import './allmatches.css'
import MatchListCard from "../cards/matchlistcard";
import {getallmatches} from '../data/data' 
const MatchListPage = (props) => {

  const [loading, setLoading] = useState(true)
  const [allMatches, setAllMatches] = useState()
  const [liveMatches, setLiveMatches] = useState()
  const [recentMatches, setRecentMatches] = useState()
  const [mergedLiveMatches, setMergedLiveMatches] = useState()
  const [mergedRecentMatches, setMergedRecentMatches] = useState()
  const [activeTab, setActiveTab] = useState("tab1");

  const fetchdata = ()=>{
      getallmatches().then((res)=>{
      setAllMatches(res.data.matches);
      setLiveMatches(allMatches.filter((match) => match.result && match.result.toLowerCase().includes("in progress")));
      setRecentMatches(allMatches.filter((match) => !match.result || !match.result.toLowerCase().includes("in progress")));

      if(allMatches){
        getMerged();
      }
      console.log(allMatches);
      if(res.status != 200){
        setLoading(true);
      }
    }).catch((res)=>{
      // console.log(res);
      setLoading(true);
    });
  }
  useEffect(() => {
    fetchdata();
  }, []);

  const getMerged =()=>{
    if(liveMatches){
    const mergeLive = liveMatches.reduce((matches, currentMatch) => {
    const existingMatch = matches.find((match) => match.id === currentMatch.id);
      if (existingMatch) {
        if (currentMatch.teamid === existingMatch.teamid2) {
          existingMatch.teamid2 = currentMatch.teamid;
          existingMatch.total_score2 = currentMatch.total_score;
          existingMatch.total_wickets2 = currentMatch.total_wickets;
        } else {
          existingMatch.teamid2 = existingMatch.teamid;
          existingMatch.total_score2 = existingMatch.total_score;
          existingMatch.total_wickets2 = existingMatch.total_wickets;
          existingMatch.teamid = currentMatch.teamid;
          existingMatch.total_score = currentMatch.total_score;
          existingMatch.total_wickets = currentMatch.total_wickets;
        }
      } else {
        matches.push({
          id: currentMatch.id,
          date: currentMatch.date,
          venue: currentMatch.venue,
          tour_name: currentMatch.tour_name,
          result: currentMatch.result,
          teamid: currentMatch.teamid,
          total_score: currentMatch.total_score,
          total_wickets: currentMatch.total_wickets,
          teamid2: '',
          total_score2: '',
          total_wickets2: '',
        });
      }
    
      return matches;
    }, []);
    setMergedLiveMatches(mergeLive);
    }
    if(recentMatches){
    const mergeRecent = recentMatches.reduce((matches, currentMatch) => {
      const existingMatch = matches.find((match) => match.id === currentMatch.id);
        if (existingMatch) {
          if (currentMatch.teamid === existingMatch.teamid2) {
            existingMatch.teamid2 = currentMatch.teamid;
            existingMatch.total_score2 = currentMatch.total_score;
            existingMatch.total_wickets2 = currentMatch.total_wickets;
          } else {
            existingMatch.teamid2 = existingMatch.teamid;
            existingMatch.total_score2 = existingMatch.total_score;
            existingMatch.total_wickets2 = existingMatch.total_wickets;
            existingMatch.teamid = currentMatch.teamid;
            existingMatch.total_score = currentMatch.total_score;
            existingMatch.total_wickets = currentMatch.total_wickets;
          }
        } else {
          matches.push({
            id: currentMatch.id,
            date: currentMatch.date,
            venue: currentMatch.venue,
            tour_name: currentMatch.tour_name,
            result: currentMatch.result,
            teamid: currentMatch.teamid,
            total_score: currentMatch.total_score,
            total_wickets: currentMatch.total_wickets,
            teamid2: '',
            total_score2: '',
            total_wickets2: '',
          });
        }
      
        return matches;
      }, []);
    setMergedRecentMatches(mergeRecent);
    console.log(mergedRecentMatches)
    }
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
                {activeTab === "tab1" && mergedLiveMatches && (mergedLiveMatches.map(match => {
                    console.log(match);
                    return <MatchListCard matchData={match} key={match.id} />;
                }))}
                {activeTab === "tab2" && mergedRecentMatches && (mergedRecentMatches.map(match => {
                    console.log(match);
                    return <MatchListCard matchData={match} key={match.id} />;
                }))}
            </div>
        </div>
    </div>
  );
}

export default MatchListPage;