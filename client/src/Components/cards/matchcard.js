import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link } from 'react-router-dom';
import ReactLoading from "react-loading";
import './matchcard.css'
const MatchCard= (props) => {

  const [loading, setLoading] = useState(true)

  if (!loading){
    return(
    <div>
      <ReactLoading type="bubbles" color="#263238" className="loading"
        height={500} width={250} />
    </div>)
  }
  else return (
    <div className="matchcard">
      <p className="tournament">Tournament Name</p><p className="format">ODI</p>
      <p className="team">Team 1</p>
      <p className="score">100-10</p>
      <p className="team">Team 2</p>
      <p className="score">10-1</p>
      <p className="result">Team 1 needs 90 runs to win</p>
    </div>
  );
}

export default MatchCard;