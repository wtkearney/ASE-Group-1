import logo from './logo.svg';
import './App.css';
import Geolocation from 'react-native-geolocation-service';
import React, { useState } from 'react';


function App() {
  const [lat, setLocLat] = useState(null);
  const [long, setLocLong] = useState(null);
  Geolocation.getCurrentPosition(function (position) {
    console.log(position)
    setLocLat(position.coords.latitude);
    setLocLong(position.coords.longitude);
    console.log("Latitude and Longitude is: " + lat + " : " + long);
  });



  return (
    <div className="App">
      <header className="App-header">
        <p>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        {lat}, {long}
      </header>
    </div>
  );
}

export default App;
