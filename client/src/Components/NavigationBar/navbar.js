import { Navigate, useNavigate  } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import {
    Link
} from "react-router-dom";
import './navbar.css';


const Navbar = () => {
  let navigate = useNavigate();
  const pathname = window.location.pathname

  const [currentUrl, setCurrentUrl] = React.useState(pathname)
    React.useEffect(() => {
    setCurrentUrl(pathname)
    }, [pathname])

    const teams = ['India', 'England', 'Australia', 'Sri Lanka']

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
                <Link to='/home/registration'>
                    <li>
                            Matches
                    </li>
                </Link>
                <div class="dropdown">
                    <li>Teams</li>
                    <div class="dropdown-content">
                        {teams.map(item => {
                        return (
                            <a href={"/teams/"+item}>{item}</a>
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