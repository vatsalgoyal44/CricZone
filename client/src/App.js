import logo from './logo.svg';
import './App.css';
import Homepage from './Components/pages/home'
import Playerpage from './Components/pages/player';
import Matchpage from './Components/pages/match';
import Sidebar from './Components/sidebar/sidebar';
import Navbar from './Components/NavigationBar/navbar';
import Teampage from './Components/pages/team';
import { BrowserRouter, Routes, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />

        <Routes>
        <Route path="/" element={<Homepage />}/>
          <Route exact path="/home" element={<Homepage />}/>
          <Route exact path="/teams/:teamname" element={<Teampage />}/>
          <Route exact path="/match/:matchid" element={<Matchpage />}/>
          <Route exact path="/player/:playerid" element={<Playerpage />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
