import React from "react";
import './App.css';
import Time from './Component/Time';
import Weather from './Component/Weather';
import Spotify from './Component/Spotify';
import Calendar from './Component/Calendar';
import PhotoSlideshow from './Component/PhotoSlideshow';


function App() {
  return (
    <div className="App">
      <div className="widgets">
        <div className='timeWidget'><Time/></div>
        <div className='weatherWidget'><Weather/></div>
        <div className='calendarWidget'><Calendar/></div>
        <div className='musicWidget'><Spotify/></div>
      </div>
      <div className="slideShows"><PhotoSlideshow/></div>
    </div>
  );
}

export default App;
