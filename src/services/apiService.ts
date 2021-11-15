// import React from 'react';
import axios from 'axios';
const url = require('url');

export const serverURL = "https://geolocation-express-demo.herokuapp.com/";

const locationPath = 'api/log-location';
const usersPath = 'users';

const headers = {
    headers : {
        "Content-Type": "application/json"
    }
};

const createUser = async (firstName: string, lastName: string, userEmail: string, password: string) => {
    const payload = {
        firstName: firstName,
        lastName: lastName, 
        userEmail: userEmail,
        password: password
    };

    console.log("Sending post request...");

    let res = await axios.post(serverURL + usersPath + "/create", payload, headers);

    let data = res.data;
    console.log(data);
    return(data);
};

const verifyUser = async (userEmail: string, password: string) => {

    const payload = {
        userEmail: userEmail,
        password: password
    };

    console.log("Sending post request to verify user...");

    let res = await axios.post(serverURL + usersPath + "/verify", payload, headers);

    console.log("Status code: ", res.status);
    return(res);

    // let data = res.data;
    // console.log(data);
    // return(data);
};

const postLocation = async (userEmail: string, lat: number, long: number) => {
    const payload = {
        userEmail: userEmail,
        // ipAddress: "demoIPAddress",
        lat: lat,
        long: long
    };

    console.log("Sending post request...");

    let res = await axios.post(serverURL + locationPath, payload, headers);

    let data = res.data;
    console.log(data);
    return(data);
};
  
export const apiService = {
    postLocation,
    verifyUser,
    createUser
};