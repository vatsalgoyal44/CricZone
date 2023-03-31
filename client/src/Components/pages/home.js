import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link } from 'react-router-dom';
import ReactLoading from "react-loading";
import './home.css'

const Homepage= (props) => {

  const [loading, setLoading] = useState(true)

  if (!loading){
    return(
    <div>
      <ReactLoading type="bubbles" color="#263238" className="loading"
        height={500} width={250} />
    </div>)
  }
  else return (
    <div className="homepage">
      <h3 className="pagename">CricZone</h3>
    </div>
  );
}

export default Homepage;