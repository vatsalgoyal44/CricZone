import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link } from 'react-router-dom';
import ReactLoading from "react-loading";
import './match.css'
import MatchCard from "../cards/matchcard";

const Matchpage= (props) => {

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tab1");
  const [activeTab2, setActiveTab2] = useState("tab1");

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

  if (true){
    return(
    <div class = "matchpage">
    <div class = "gridcontainermatch">
        <div class = "firstcol">
        <div class = "curscore flex flex-col">
            <div class = "info basis-1/5 border-b-2 border-violet-950">
                    <h3 class="font-bold mx-3 my-1 text-lg">Indian Premier League</h3>
                    <div class="relative flex">
                        <a class="mx-3">Date</a>
                        <a>Chennai</a>
                        <a class="mx-3">T20</a>
                    </div>
                </div>
            <div class = "status basis-4/5">
            <div class="flex flex-row h-full">
                <div class="basis-3/5 border-r-2 border-violet-950">
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
                <div class="basis-2/5 flex flex-col h-full">
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
                        {/* {mostwickets.map(item => {
                            return (
                            <tr key={item.playerid}>
                                <td>{item.player}</td>
                                <td>{item.wickets}</td>
                            </tr>
                            );
                        })} */}
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
                        {/* {mostwickets.map(item => {
                            return (
                            <tr key={item.playerid}>
                                <td>{item.player}</td>
                                <td>{item.wickets}</td>
                            </tr>
                            );
                        })} */}
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
                </div>
            </div>
            </div>
        </div>
        <div class = "commentarycomp flex flex-col">
                <div class="comphead basis-5 border-b-2 border-violet-950"><h3 class="font-bold mx-3 my-1 text-lg">Commentary</h3></div>
                <div class="commentary p-5">
                    <p>Commentary data not available</p>
                </div>
            </div>
        </div>
        <div class = "secondcol flex flex-col">
            
            <div class = "scoreboard flex flex-col">
                <div className="scorehead basis-5 border-b-2 border-violet-950"><h3 class="font-bold mx-3 my-2 text-lg align-middle">Scorecard</h3></div>
                <div className="Tabs">
                    {/* Tab nav */}
                    <ul className="nav relative flex flex-row">
                        <div class={`${activeTab === "tab1" ? "active" : ""} basis-1/2 `}><li class={`font-bold p-3 text-center border-r-2 border-violet-950 cursor-pointer hover:text-violet-500 ease-in-out duration-300`} onClick={handleTab1}>Team 1</li></div>
                        <div class={`${activeTab === "tab2" ? "active" : ""} basis-1/2 `}><li class={`font-bold basis-1/2 p-3 text-center cursor-pointer hover:text-violet-500 ease-in-out duration-300`} onClick={handleTab2}>Team 2</li></div>
                    </ul>
                    <div className="outlet">
                        {/* content will be shown here */}
                    </div>
                    </div>
            </div>  
            <div class = "squads flex flex-col">
                <div className="scorehead basis-5 border-b-2 border-violet-950"><h3 class="font-bold mx-3 my-2 text-lg align-middle">Squads</h3></div>
                <div className="Tabs">
                    {/* Tab nav */}
                    <ul className="nav relative flex flex-row">
                        <div class={`${activeTab2 === "tab1" ? "active" : ""} basis-1/2 `}><li class={`font-bold p-3 text-center border-r-2 border-violet-950 cursor-pointer hover:text-violet-500 ease-in-out duration-300`} onClick={handleTab12}>Team 1</li></div>
                        <div class={`${activeTab2 === "tab2" ? "active" : ""} basis-1/2 `}><li class={`font-bold basis-1/2 p-3 text-center cursor-pointer hover:text-violet-500 ease-in-out duration-300`} onClick={handleTab22}>Team 2</li></div>
                    </ul>
                    <div className="outlet">
                        {/* content will be shown here */}
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