import React, { useState, useEffect  } from "react";
import { Navigate, useNavigate , Link, useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import './match.css'
import {getmatchinfo, getallteam} from '../data/data' 

const Matchpage= (props) => {

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tab1");
  const [activeTab2, setActiveTab2] = useState("tab1");

  const [res, setRes] = useState('')
  const [matchinfo, setMatchinfo] = useState();

  const [finalres, setFinalres] = useState();
  const [team1Players, setTeam1Players] =useState();
  const [team2Players, setTeam2Players] =useState();

  const [teaminfo, setTeaminfo] = useState();

  const [live, setLive] = useState(false);

  let { matchid } = useParams();

  const fetchdata = ()=>{
    getmatchinfo(matchid).then((res)=>{
      console.log(res.data);
      setMatchinfo(res.data);
      if(res.status != 200){
        setLoading(true);
      }
    }).catch((res)=>{
      console.log(res);
      setLoading(true);
    });
    
    getallteam().then((res)=>{
        console.log(res.data);
        setTeaminfo(res.data);
        }).catch(()=>{
            console.log(res);
        setLoading(true);
        })
  }

  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() =>{
    console.log(matchinfo);
    if(matchinfo){
        if(matchinfo.match_deets && teaminfo){
            if(matchinfo.team1.result == "In Progress"){
                setLive(true);
                setInterval(fetchdata(), 1000);
            }
            else{
                setLive(false);
            }
        }
        if(matchinfo.team1 == null){
            setLoading(true);
        }
        else{
            setLoading(false);
            getfinalres();
            getteam1team2();
        }
        
    }
  },[matchinfo]);

  useEffect(()=>{
    if(matchinfo && teaminfo && matchinfo.match_deets){
        setLoading(false);
    }
  }, [matchinfo, teaminfo])

  const getfinalres = ()=>{
    console.log(matchinfo);
    const scoreteam1 = matchinfo.team1.total_score;
    const wicteam1 = matchinfo.team1.total_wickets;
    const scoreteam2 = matchinfo.team2.total_score;
    const wicteam2 = matchinfo.team2.total_wickets;

    if(matchinfo.team1.result == "win"){
        const result = `${matchinfo.team1.teamid} won by ${scoreteam1-scoreteam2} runs`;
        setFinalres(result) 
    }
    else{
        const result = `${matchinfo.team2.teamid} won by ${10-wicteam2} wickets`;
        setFinalres(result) 
    }
  }
  const getteam1team2 =()=>{
    const teamIds = [...new Set(matchinfo.player_deets.map((player) => player.teamid))];
    const team1Id = matchinfo.team1.teamid;
    setTeam1Players(matchinfo.player_deets.filter((player) => player.teamid === team1Id));
    setTeam2Players(matchinfo.player_deets.filter((player) => player.teamid !== team1Id));
  }

 



  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };

  const handleTab12 = () => {
    // update the state to tab1
    setActiveTab2("tab1");
  };
  const handleTab22 = () => {
    // update the state to tab2
    setActiveTab2("tab2");
  };

  if (loading){
    return(
    <div>
      <ReactLoading type="bubbles" color="#263238" className="loading"
        height={500} width={250} />
    </div>)
  }
    else{
    return(
    <div class = "matchpage">
    <div class = "gridcontainermatch flex flex-row">
        <div class = "firstcol basis-3/5">
        <div class = "curscore flex flex-col">
            <div class = "info basis-1/4 border-b-2 border-violet-950">
                    <h3 class="font-bold mx-3 my-1 text-lg">{matchinfo.match_deets[0].tour_name}</h3>
                    <div class="relative flex">
                        <a class="mx-3">{matchinfo.match_deets[0].date.substring(0, matchinfo.match_deets[0].date.indexOf("T"))}</a>
                        <a>{matchinfo.match_deets[0].venue}</a>
                        <a class="mx-3">ODI</a>
                    </div>
                </div>
            <div class = "status basis-3/4">
            <div class="w-full h-fit">
                <div class="border-violet-950">
                    <div className="mx-3 my-1">{live && <h3 class="font-bold text-xl">Live</h3>}</div>
                    <div class="flex flex-col">
                        <div class="basis-1/2 relative flex flex-row">
                            <h3 class="basis-3/4 font-bold ml-10 my-5 text-xl">{teaminfo.find(t => t.teamid === matchinfo.team1.teamid).team_name}</h3>
                            <h3 class="basis-1/4 font-bold my-5 text-xl">{matchinfo.team1.total_score}/{matchinfo.team1.total_wickets}</h3>
                        </div>
                        <div class="basis-1/2 relative flex flex-row">
                            <h3 class="basis-3/4 font-bold ml-10 my-5 text-xl">{teaminfo.find(t => t.teamid === matchinfo.team2.teamid).team_name}</h3>
                            <h3 class="basis-1/4 font-bold my-5 text-xl">{matchinfo.team2.total_score}/{matchinfo.team2.total_wickets}</h3>
                        </div>
                    </div>
                    {!live && <h3 class="mx-3 my-1 text-xl">{finalres}</h3>}
                </div>
                {/* <div class="basis-2/5 flex flex-col h-full">
                    <div class="basis-3/5">
                        <table className="battertable table-auto h-full">
                        <thead>
                        <tr>
                            <th class="w-1/2">Batter</th>
                            <th>R</th>
                            <th>B</th>
                            <th>4s</th>
                            <th>6s</th>
                            <th>SR</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr key="Dhoni">
                                <td>MS Dhoni</td>
                                <td>50</td>
                                <td>25</td>
                                <td>4</td>
                                <td>2</td>
                                <td>200</td>
                            </tr>
                            <tr key="Dhoni">
                                <td>MS Dhoni</td>
                                <td>50</td>
                                <td>25</td>
                                <td>4</td>
                                <td>2</td>
                                <td>200</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div class="basis-2/5">
                    <table className="ballertable table-auto h-full">
                        <thead>
                        <tr>
                            <th class="w-1/2">Baller</th>
                            <th>O</th>
                            <th>M</th>
                            <th>R</th>
                            <th>W</th>
                            <th>Eco</th>
                        </tr>
                        </thead>
                        <tbody>
                      
                            <tr key="Bumrah">
                                <td>Bumrah</td>
                                <td>2</td>
                                <td>0</td>
                                <td>12</td>
                                <td>1</td>
                                <td>6</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div> */}
            </div>
            </div>
        </div>
        <div class = "commentarycomp flex flex-col">
                <div class="comphead basis-5 border-b-2 border-violet-950"><h3 class="font-bold mx-3 my-1 text-lg">Commentary</h3></div>
                <div class="commentary p-5">
                    {/*display commentary here*/}
                    <div class="commentary p-5">
                      {matchinfo.commentary.map((comment) => (
                        <p key={`${comment.innings}-${comment.over}-${comment.ball}`} className="py-2">
                          <a className="font-bold mr-2">{comment.over}.{comment.ball} </a>{comment.action === "W" ? `${comment.batsman} is out!` : `Great shot by ${comment.batsman} for ${comment.action} run${comment.action === "1" ? "" : "s"}!`}
                        </p>
                      ))}
                    </div>

                </div>
            </div>
        </div>
        <div class = "secondcol basis-2/5 flex flex-col flex-initial">
            
            <div class = "scoreboardmatch flex flex-col w-full">
                <div className="scorehead basis-5 border-b-2 border-violet-950"><h3 class="font-bold mx-3 my-2 text-lg align-middle">Scorecard</h3></div>
                <div className="Tabs bg-lightfont">
                    {/* Tab nav */}
                    <ul className="nav relative flex flex-row bg-pinkcustom">
                        <div class={`${activeTab === "tab1" ? "active" : ""} basis-1/2 `}><li class={`font-bold p-3 text-center border-r-2 border-violet-950 cursor-pointer hover:text-violet-500 ease-in-out duration-300`} onClick={handleTab1}>{matchinfo.team1.teamid}</li></div>
                        <div class={`${activeTab === "tab2" ? "active" : ""} basis-1/2 `}><li class={`font-bold basis-1/2 p-3 text-center cursor-pointer hover:text-violet-500 ease-in-out duration-300`} onClick={handleTab2}>{matchinfo.team2.teamid}</li></div>
                    </ul>
                    <div className="outlet">
                    {activeTab === "tab1" && (
            <div>
                {/* Team 1 player table */}
                <table className="battertablescore table-fixed">
                    <thead>
                        <tr className="my-10">
                            <th className="w-1/3">Batter</th>
                            <th className="w-2/15">Runs</th>
                            <th className="w-2/15">Balls</th>
                            <th className="w-2/15">Fours</th>
                            <th className="w-2/15">Sixes</th>
                            <th className="w-2/15">SR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team1Players
                        .filter((player) => player.balls > 0)
                        .map((player) => (
                            <tr key={player.playerid}>
                                <td>{player.player_name}</td>
                                <td>{player.runs}</td>
                                <td>{player.balls}</td>
                                <td>{player.fours}</td>
                                <td>{player.sixes}</td>
                                <td>{(player.runs*100/player.balls).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Team 2 player table */}
                <table>
                    <thead>
                        <tr>
                            <th className="w-2/5">Bowler</th>
                            <th className="w-1/5">Overs</th>
                            <th className="w-1/5">Wickets</th>
                            <th className="w-1/5">Runs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team2Players
                        .filter((player) => player.overs > 0)
                        .map((player) => (
                            <tr key={player.playerid}>
                                <td>{player.player_name}</td>
                                <td>{player.overs}</td>
                                <td>{player.wickets}</td>
                                <td>{player.runs_conceded}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
        {activeTab === "tab2" && (
            <div>
            {team1Players.some(player => player.balls > 0) && (
                <div>
                    {/* Team 1 player table */}
                    <table>
                        <thead>
                            <tr>
                            <th className="battertablescore w-1/3">Batter</th>
                            <th className="w-2/15">Runs</th>
                            <th className="w-2/15">Balls</th>
                            <th className="w-2/15">Fours</th>
                            <th className="w-2/15">Sixes</th>
                            <th className="w-2/15">SR</th>
                            </tr>
                        </thead>
                        <tbody>
                        {team2Players
                        .filter((player) => player.balls > 0)
                        .map((player) => (
                                <tr key={player.playerid}>
                                    <td>{player.player_name}</td>
                                    <td>{player.runs}</td>
                                    <td>{player.balls}</td>
                                    <td>{player.fours}</td>
                                    <td>{player.sixes}</td>
                                    <td>{(player.runs*100/player.balls).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
        {team2Players.some(player => player.overs > 0) && (
            <div>
                {/* Team 2 player table */}
                <table>
                    <thead>
                        <tr>
                        <th className="w-2/5">Bowler</th>
                            <th className="w-1/5">Overs</th>
                            <th className="w-1/5">Wickets</th>
                            <th className="w-1/5">Runs</th>
                        </tr>
                    </thead>
                    <tbody>                         
                        {team1Players
                        .filter((player) => player.overs > 0)
                        .map((player) => (
                            <tr key={player.playerid}>
                                <td>{player.player_name}</td>
                                <td>{player.overs}</td>
                                <td>{player.wickets}</td>
                                <td>{player.runs_conceded}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
        </div>
    )}

                    </div>
                </div>
            </div>  
            <div class = "squads flex flex-col">
                <div className="scorehead basis-5 border-b-2 border-violet-950"><h3 class="font-bold mx-3 my-2 text-lg align-middle">Squads</h3></div>
                <div className="Tabs">
                    {/* Tab nav */}
                    <ul className="nav relative flex flex-row">
                        <div class={`${activeTab2 === "tab1" ? "active" : ""} basis-1/2 `}><li class={`font-bold p-3 text-center border-r-2 border-violet-950 cursor-pointer hover:text-violet-500 ease-in-out duration-300`} onClick={handleTab12}>{matchinfo.team1.teamid}</li></div>
                        <div class={`${activeTab2 === "tab2" ? "active" : ""} basis-1/2 `}><li class={`font-bold basis-1/2 p-3 text-center cursor-pointer hover:text-violet-500 ease-in-out duration-300`} onClick={handleTab22}>{matchinfo.team2.teamid}</li></div>
                    </ul>
                    <div className="outlet">
                    {activeTab2 === "tab1" && (
            <div>
                {/* Team 1 player table */}
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team1Players.map((player) => (
                            <tr key={player.playerid}>
                                <td className="cursor-pointer"><Link to={`/player/${player.playerid}`}>{player.player_name}</Link></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
        {activeTab2 === "tab2" && (
            <div>
                {/* Team 1 player table */}
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team2Players.map((player) => (
                            <tr key={player.playerid}>
                               <td className="cursor-pointer"><Link to={`/player/${player.playerid}`}>{player.player_name}</Link></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
                    </div>
                    </div>
            </div>  
        </div>  
    </div>
    </div>
  );
}
}

export default Matchpage;