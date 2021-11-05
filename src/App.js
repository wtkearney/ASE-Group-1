import './App.css';
import Geolocation from 'react-native-geolocation-service';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  Button from '@mui/material/Button';
// import DeviceInfo from 'react-native-device-info';


const uri = 'https://geoloc-ase-api.azurewebsites.net/';
const path = 'api/upload';
const headers = {headers :{ token: 12344321}};



function App() {
  const [lat, setLocLat] = useState(null);
  const [long, setLocLong] = useState(null); 
  const [showLocation, setShowLocation] = useState(false);
  const [showId, setShowId] = useState(false);
  const [ip, setIP] = useState('');
  const [showMode, setMode] = useState(false);
  
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);
    setIP(res.data.IPv4)
  }

  useEffect( () => {
    //passing getData method to the lifecycle method
    getData()

  }, [])

  

  Geolocation.getCurrentPosition(function (position) {
    console.log(position)
    setLocLat(position.coords.latitude);
    setLocLong(position.coords.longitude);
    // setDeviceId(DeviceInfo.getUniqueId());
    console.log("Latitude and Longitude is: " + lat + " : " + long); 
    
  
    
  });

  function SendCoordinates() {
    const body = { uid: ip, longitude: long, latitude: lat };
    axios.post(uri + path, body, headers).then(console.log).catch(console.error); 
  }

  const MINUTE = 3000
    useEffect(() => {
      const interval = setInterval(() => {
        var body = {
          uid: "test",
          longitude: long,
          latitude: lat
        }
        axios.post(uri + path, body, headers).then(
          console.log()
        );
  
      }, MINUTE);
      return () => clearInterval(interval);
    }, [lat,long]);
  
  return (
    <div className="App">
      <header className="App-header">
        { showId ? ip.toString() : "–" }   
        <Button onClick={() => setShowId(!showId)}> {showId ? "Hide ID" : "Show ID"} </Button>
        {showLocation ? lat + "" + long : "–"}
        <Button onClick={() => setShowLocation(!showLocation)}> {showLocation ? "Hide Location" : "Show Location"} </Button>
        <Button onClick={SendCoordinates}> Send Coordinates </Button>
           
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