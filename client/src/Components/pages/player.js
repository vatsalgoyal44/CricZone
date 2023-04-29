import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link, useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import './player.css'
import MatchCard from "../cards/matchcard";
import {BiUserCircle} from 'react-icons/bi';
import {getplayerinfo} from '../data/data'

const Playerpage= (props) => {

  const [loading, setLoading] = useState(true)
  const [player, setPlayer] = useState(true)

    let {playerid }= useParams();

  const fetchdata = ()=>{
    getplayerinfo(playerid).then((res)=>{
      console.log(res.data);
      setPlayer(res.data);
      setLoading(false);
      
      if(res.status != 200){
        setLoading(true)
      }
    }).catch((res)=>{
      console.log(res.status)
      setLoading(true)
    })
  }

  useEffect(() => {
    fetchdata();
  }, []);

  if (loading){
    return(
    <div>
      <ReactLoading type="bubbles" color="#263238" className="loading"
        height={500} width={250} />
    </div>)
  }
  else return (
    <div className="playerpage">
      <div className="flex flex-col">
        <div className="basis-1/6 flex flex-row my-10">
            <div className="basis-1/5"><BiUserCircle size={200} class="md:w-48 md:h-auto mx-auto "/></div>
            <div className="basis-4/5 m-auto text-center ml-10"><h1 className="playername ">{player.playerinfo[0].player_name}</h1></div>
        </div>
        <div className="basis-5/6 flex flex-row">
        <div className="basis-1/5">
            <table className="infotable table-auto">
                        <tbody>
                            
                            <tr key="batting">
                                <td class = "font-bold w-1/2">Batting Style</td>
                                <td>{player.playerinfo[0].batting_style}</td>
                            </tr>
                            <tr key="bowling">
                                <td class = "font-bold w-1/2">Bowling Style</td>
                                <td>{player.playerinfo[0].bowling_style}</td>
                            </tr>
                        </tbody>
                    </table>
            </div>
            <div class="basis-4/5 px-10">
            <div><h3 class="careersum font-bold text-lg">Batting Career Summary</h3></div>
            <table className="careersumtable table-auto ">
                        <thead>
                        <tr>
                            <th>Matches</th>
                            <th>Innings</th>
                            <th>Runs</th>
                            <th>High Score</th>
                            <th>Average</th>
                            <th>Balls Faced</th>
                            <th>Strike Rate</th>
                            <th>50s</th>
                            <th>100s</th>
                            <th>200s</th>
                            <th>4s</th>
                            <th>6s</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr key="test">
                                <td> {player.batting_summary[0].matches}</td>
                                <td> {player.batting_summary[0].inns}</td>
                                <td> {player.batting_summary[0].runs}</td>
                                <td> {player.batting_summary[0].hs}</td>
                                <td> {player.batting_summary[0].avg}</td>
                                <td> {player.batting_summary[0].balls}</td>
                                <td> {player.batting_summary[0].sr}</td>
                                <td> {player.batting_summary[0].fif}</td>
                                <td> {player.batting_summary[0].hund}</td>
                                <td> {player.batting_summary[0].dual}</td>
                                <td> {player.batting_summary[0].fours}</td>
                                <td> {player.batting_summary[0].sixes}</td>
                            </tr>
                            
                        </tbody>
                    </table>
                    <div><h3 class="careersum font-bold text-lg mt-10">Bowling Career Summary</h3></div>
            <table className="careersumtable table-auto ">
                        <thead>
                        <tr>
                            <th>Matches</th>
                            <th>Innings</th>
                            <th>Overs</th>
                            <th>Runs</th>
                            <th>Wickets</th>
                            <th>Economy</th>
                            <th> Average</th>
                            <th>Strike Rate</th>
                            <th>5W</th>       
                            <th>10W</th>                     
                        </tr>
                        </thead>
                        <tbody>
                        <tr key="test">
                                <td> {player.bowling_summary[0].matches}</td>
                                <td> {player.bowling_summary[0].inns}</td>
                                <td> {player.bowling_summary[0].overs}</td>
                                <td> {player.bowling_summary[0].runs}</td>
                                <td> {player.bowling_summary[0].wicks}</td>
                                <td> {player.bowling_summary[0].eco}</td>
                                <td> {player.bowling_summary[0].avg}</td>
                                <td> {player.bowling_summary[0].sr}</td>
                                <td> {player.bowling_summary[0].fives}</td>
                                <td> {player.bowling_summary[0].tens}</td>
                            </tr>
                            
                        </tbody>
                    </table>
            </div>
            
        </div>
      </div>
    </div>
  );
}

export default Playerpage;