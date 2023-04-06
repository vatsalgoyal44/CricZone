import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link } from 'react-router-dom';
import ReactLoading from "react-loading";
import './home.css'
import MatchCard from "../cards/matchcard";

const Teampage= (props) => {

  const [loading, setLoading] = useState(true)

  if (!loading){
    return(
    <div>
      <ReactLoading type="bubbles" color="#263238" className="loading"
        height={500} width={250} />
    </div>)
  }
  else return (
    <div className="teampage">
      <h3 className="pagename">Hi</h3>
      <MatchCard/>
    </div>
  );
}

export default Teampage;