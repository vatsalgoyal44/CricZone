import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link } from 'react-router-dom';
import ReactLoading from "react-loading";
import './player.css'
import MatchCard from "../cards/matchcard";
import {BiUserCircle} from 'react-icons/bi';
const Playerpage= (props) => {

  const [loading, setLoading] = useState(true)

  if (false){
    return(
    <div>
      <ReactLoading type="bubbles" color="#263238" className="loading"
        height={500} width={250} />
    </div>)
  }
  else return (
    <div className="playerpage">
      <div className="flex flex-col">
        <div className="basis-1/6 snap-center align-middle flex flex-row my-10">
            <div className="basis-1/5"><BiUserCircle size={200} class="md:w-48 md:h-auto mx-auto "/></div>
            <div className="basis-4/5 m-auto text-center ml-10"><h1 className="playername ">Virat Kohli</h1></div>
        </div>
        <div className="basis-5/6 flex flex-row">
        <div className="basis-1/5">
            <table className="infotable table-auto">
                        <tbody>
                            <tr key="dob">
                                <td class = "font-bold w-1/2">Born</td>
                                <td>Nov 05, 1988(34 years)</td>
                            </tr>
                            <tr key="place">
                                <td class = "font-bold w-1/2">Birth place</td>
                                <td>Delhi</td>
                            </tr>
                            <tr key="batting">
                                <td class = "font-bold w-1/2">Batting Style</td>
                                <td>Right Handed Bat</td>
                            </tr>
                            <tr key="bowling">
                                <td class = "font-bold w-1/2">Bowling Style</td>
                                <td>Right-arm medium</td>
                            </tr>
                        </tbody>
                    </table>
            </div>
            <div class="basis-4/5 px-10">
            <div><h3 class="careersum font-bold text-lg">Batting Career Summary</h3></div>
            <table className="careersumtable table-auto ">
                        <thead>
                        <tr>
                            <th>Format</th>
                            <th>M</th>
                            <th>Inn</th>
                            <th>Runs</th>
                            <th>HS</th>
                            <th>Avg</th>
                            <th>BF</th>
                            <th>SR</th>
                            <th>100</th>
                            <th>200</th>
                            <th>50</th>
                            <th>4s</th>
                            <th>6s</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr key="test">
                                <td class="font-bold">Test</td>
                                <td>108</td>
                                <td>183</td>
                                <td>8273</td>
                                <td>254</td>
                                <td>48.32</td>
                                <td>16324</td>
                                <td>55.33</td>
                                <td>28</td>
                                <td>7</td>
                                <td>58</td>
                                <td>932</td>
                                <td>24</td>
                            </tr>
                            
                        </tbody>
                    </table>
                    <div><h3 class="careersum font-bold text-lg mt-10">Bowling Career Summary</h3></div>
            <table className="careersumtable table-auto ">
                        <thead>
                        <tr>
                            <th>Format</th>
                            <th>M</th>
                            <th>Inn</th>
                            <th>B</th>
                            <th>Runs</th>
                            <th>Wkts</th>
                            <th>Econ</th>
                            <th>Avg</th>
                            <th>SR</th>
                            <th>5W</th>
                            <th>10W</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr key="test">
                                <td class="font-bold">Test</td>
                                <td>108</td>
                                <td>11</td>
                                <td>175</td>
                                <td>84</td>
                                <td>0</td>
                                <td>2.88</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
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