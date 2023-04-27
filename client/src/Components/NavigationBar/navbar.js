import { Navigate, useNavigate  } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import {
    Link
} from "react-router-dom";
import './navbar.css';
import { getallteam } from '../data/data';

const Navbar = () => {
  let navigate = useNavigate();
  const pathname = window.location.pathname
  const [loading, setLoading] = useState(true)
  const [res, setRes] = useState('')
  const [teams, setTeams] = useState()
  const slideLeft = () => {
    var slider = document.getElementById("slider")
    slider.scrollLeft = slider.scrollLeft - 500
  }

  const fetchdata = ()=>{
    getallteam().then((res)=>{
      console.log(res.data)
      setTeams(res.data);
      setLoading(false)
      if(res.status != 200){
        setLoading(true)
      }
    }).catch(()=>{
      console.log(res.status)
      setLoading(true)
    })
  }

  const [currentUrl, setCurrentUrl] = React.useState(pathname)
    React.useEffect(() => {
    setCurrentUrl(pathname)
    fetchdata()
    }, [pathname])

    return(
        <div className="navbar">
            <div className='cont'>
            <Link to='/home'><h1 className="criczone" >CricZone</h1></Link>
            <ul className='nav-links'>
                <Link to='/home'>
                    <li>
                            Home
                    </li>
                </Link>
                <Link to='/matches'>
                    <li>
                            Matches
                    </li>
                </Link>
                <div class="dropdown">
                    <li>Teams</li>
                    <div class="dropdown-content">
                    {(!loading) && 
                        teams.map(item => {
                        return (
                            <Link to={`/teams/${item.teamid}`}><a>{item.team_name}</a></Link>
                        );
                    })}
                    </div>
                </div>
            </ul>
            </div>
        </div>
    )
}

export default Navbar;