import './App.css';
import Geolocation from 'react-native-geolocation-service';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

const databaseURL = 'https://geolocation-db.com/json/';
const serverURL = 'https://geoloc-ase-api.azurewebsites.net/';
const path = 'api/upload';
const headers = {
  headers : {
    token: 12344321 // ! hardcoded
  }
};

function App () {
  const [ip, setIP] = useState("");
  const [showIp, setShowIp] = useState(false);
  const [latitude, setLatitude] = useState(null); // ! typeless
  const [longitude, setLongitude] = useState(null); // ! typeless
  const [showLocation, setShowLocation] = useState(false);
  const [automaticMode, setAutomatic] = useState(false);
  
  useEffect(() => {
    (async function () {
      setIP((await axios.get(databaseURL)).data.IPv4); // ! anti-pattern
    })(); // ! self-invoke
   }, []);

  Geolocation.getCurrentPosition ((position) => { // ! anti-pattern
    setLatitude (position.coords.latitude);
    setLongitude (position.coords.longitude);
  });

  function SendLocation() {
    const body = { // ! duplicated
      uid: ip, // ! misname
      longitude: longitude,
      latitude: latitude
    };

    axios.post(serverURL + path, body, headers).then(console.log).catch(console.error); // ! duplicated
  }

  const MILLISECONDS = 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      const body = { // ! duplicated
        uid: ip, // ! misname
        longitude: longitude,
        latitude: latitude
      };

      if (automaticMode) {
        axios.post(serverURL + path, body, headers).then(console.log).catch(console.error);  // ! duplicated
      }
    }, MILLISECONDS);

    return () => clearInterval(interval);
  }, [ip, latitude,longitude, automaticMode]);
  
  return (
    <div className="App">
      <header className="App-header">
        { showIp ? ip.toString() : "—" }
        <Button onClick={() => setShowIp(!showIp)}>{showIp ? "Hide IP" : "Show IP"}</Button>
        <br/>
        {showLocation ? latitude.toString() + ' , ' + longitude.toString() : "—"}
        <Button onClick={() => setShowLocation(!showLocation)}>{showLocation ? "Hide Location" : "Show Location"}</Button>
        <Button onClick={SendLocation} disabled={automaticMode}>Send Location</Button>
        <br/>
        <Button onClick={() => setAutomatic(!automaticMode)}>{automaticMode ? "Enable Manual Mode" : "Enable Automatic Mode"}</Button>
      </header>
    </div>
  );
}

export default App;