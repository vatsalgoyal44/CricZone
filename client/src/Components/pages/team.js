import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link , useParams} from 'react-router-dom';
import ReactLoading from "react-loading";
import './home.css'
import MatchCard from "../cards/matchcard";
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';


const Teampage = (props) => {

  const [loading, setLoading] = useState(true)

  let { teamname } = useParams();

  const slideLeft = () => {
    var slider = document.getElementById("slider")
    slider.scrollLeft = slider.scrollLeft - 500
  }

  const slideRight = () => {
    var slider = document.getElementById("slider")
    slider.scrollLeft = slider.scrollLeft + 500
  }

  const matches = [1,2,3,4,5,5,6,7]

  const Players = ["Sachin Tendulkar", "MS Dhoni", "Virat Kohli", "Rohit Sharma"]

  if (true){
    return(
    <div class = "teampage">
    <div class = "gridcontainer">
        <div class = "team">
            <h3 className="teamname">{teamname}</h3>
        </div>
        <div class = "fixtures">
            <div><h3>Recent Fixtures</h3></div>
            <div className="overflow-x-hidden relative flex items-center">
                <MdChevronLeft size = {40} onClick={slideLeft} className="opacity-50 cursor-pointer hover:opacity-100"/>
                <div className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth" id="slider">
                    {matches.map(item=>{
                        return (<div className='inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'><MatchCard/></div>)
                    })}
                </div>
                <MdChevronRight size = {40} onClick={slideRight} className="cursor-pointer hover:opacity-100 ease-in-out duration-300"/></div>
           
            </div>
        <div class = "secondrow">
            <div class = "players">
                <div><h3>Players</h3></div>
                <div class="playercards">{Players.map(item => {
                    return (
                        <div class = "playercard">
                            <a>{item}</a>
                        </div>
                    )
                })}</div>
            </div>
            <div class = "stats">
                <div><h3>Statistics</h3></div>
                <div className="statcards">

                </div>
            </div>  
        </div>  
    </div>
    </div>
  );
}
}
export default Teampage;