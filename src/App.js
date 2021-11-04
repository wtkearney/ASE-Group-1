import './App.css';
import Geolocation from 'react-native-geolocation-service';
import React, { useState } from 'react';
import axios from 'axios';
// import DeviceInfo from 'react-native-device-info';


const uri = 'https://geoloc-ase-api.azurewebsites.net/';
const path = 'api/upload';
const headers = {headers :{ token: 12344321}};



function App() {
  const [lat, setLocLat] = useState(null);
  const [long, setLocLong] = useState(null); 
  const [showLocation, setShowLocation] = useState(false);
  const [showId, setShowId] = useState(false);
  const [uid, setDeviceId] = useState(1234);

  Geolocation.getCurrentPosition(function (position) {
    console.log(position)
    setLocLat(position.coords.latitude);
    setLocLong(position.coords.longitude);
    // setDeviceId(DeviceInfo.getUniqueId());
    console.log("Latitude and Longitude is: " + lat + " : " + long); 
    const body = { uid: uid, longitude: long, latitude: lat };
    
    axios.post(uri + path, body, headers).then(console.log).catch(console.error); 
  });

  function Test() {
    console.log('Anything')
  }

  return (
    <div className="App">
      <header className="App-header">

        { showId ? uid.toString() : "–" } 
        <button type ="button" onClick={() => setShowId(!showId)}> {showId ? "Hide ID" : "Show ID"} </button>  
        {showLocation ? lat + "" + long : "–"}
        <button type="button" onClick={() => setShowLocation(!showLocation)} > {showLocation ? "Hide Location" : "Show Location"} </button>
        <button type="button" onClick={Test}> Send Coordinates </button>
        
      </header>

    </div>
  );
}

export default App;


// Button at the bottom that toggles between manual and automatic sending of data. 
// Manual mode is going to send it only if button pressed 
// Automatic mode will also work with the button but it needs to be regularly sending (every minute) 

// Move the ID button to the right-top-corner. - Yunusa
// Send Coordinates needs to be placed somewhere else. - Callum   
// Send Coordinates Button needs to have a function attached to it that sends the location when the "Manual/Automatic" button is set on Manual.
// Button for switching between manual and automatic mode. 