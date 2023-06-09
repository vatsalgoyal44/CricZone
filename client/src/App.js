import logo from './logo.svg';
import './App.css';
import Homepage from './Components/pages/home'
import Playerpage from './Components/pages/player';
import Matchpage from './Components/pages/match';
import Sidebar from './Components/sidebar/sidebar';
import Navbar from './Components/NavigationBar/navbar';
import Teampage from './Components/pages/team';
import Tournamentpage from './Components/pages/tournament';
import { BrowserRouter, Routes, Switch, Route } from "react-router-dom";
import MatchListPage from './Components/pages/allmatches';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />

        <Routes>
        <Route path="/" element={<Homepage />}/>
          <Route exact path="/home" element={<Homepage />}/>
          <Route exact path="/matches" element={<MatchListPage />}/>
          <Route exact path="/teams/:teamid" element={<Teampage />}/>
          <Route exact path="/match/:matchid" element={<Matchpage />}/>
          <Route exact path="/player/:playerid" element={<Playerpage />}/>
          <Route exact path="/tournament/:tourid" element={<Tournamentpage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
