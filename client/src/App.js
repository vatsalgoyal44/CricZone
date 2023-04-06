import logo from './logo.svg';
import './App.css';
import Homepage from './Components/pages/home'
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
          <Route exact path="/teams/:team" element={<Teampage />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
