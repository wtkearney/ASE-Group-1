// import React from 'react';
// const url = require('url');
// import axios from 'axios';
import axios, {AxiosError} from 'axios';
import configData from "../../config.json";

// webserver URL
export const serverURL = configData.SERVER_URL;

// paths for REST API
const apiPath = '/api';
const usersPath = '/users';

const headers = {
    headers : {
        "Content-Type": "application/json"
    }
};

export type AuthData = {
    token: string;
    userEmail: string;
    firstName: string;
    lastName: string;
  };

const signUp = async (firstName: string, lastName: string, userEmail: string, _password: string): Promise<AuthData> => {

    // console.log("Calling signUp from authService...")

    // create payload to send to webserver
    const payload = {
        firstName: firstName,
        lastName: lastName, 
        userEmail: userEmail,
        password: _password
    };

    // embed the whole function body inside a Promise constructor, so should any error happen, it will be converted to a rejection
    return new Promise((resolve, reject) => {
        axios.post(serverURL + usersPath + "/create", payload, headers).then((response) => {
            // check response status
            if (response.status == 201) {
                // user account was created successfully
                alert("User account created successfully! You are now logged in.")
                resolve({
                    token: response.data.token,
                    userEmail: response.data.userEmail,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName
                });
            } else {
                console.log("Good response, but strange response code...?");
                resolve({
                    token: response.data.token,
                    userEmail: response.data.userEmail,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName
                });
            }
        })
        .catch(err => {
            // console.log(err);
            if (err.response) {
                // client received an error response (5xx, 4xx)
                if (err.response.status == 409) {
                    alert("Account already exists with that email. Please try another.")
                    reject(new Error("User account already exists."));
                } else if (err.response.status == 400) {
                    alert("Error 400 during user creation.")
                    reject(new Error("Error 400 during user creation."));
                }
            } else if (err.request) {
                // client never received a response, or request never left
                reject(new Error("Client never received a response, or request never left."));
            } else {
                // anything else
                reject(new Error());
            }
        }) // end catch
    }) // end Promise return
}; // end signUp

const signIn = async (userEmail: string, _password: string): Promise<AuthData> => {
    
    // console.log("Calling signIn from authService...");

    // create payload to send to webserver
    const payload = {
        userEmail: userEmail,
        password: _password
    };

    // embed the whole function body inside a Promise constructor, so should any error happen, it will be converted to a rejection
    return new Promise((resolve, reject) => {
        axios.post(serverURL + usersPath + "/verify", payload, headers).then((response) => {
            // check response status
            if (response.status == 200) {
                // user account found and verified
                resolve({
                    token: response.data.token,
                    userEmail: response.data.userEmail,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName
                });
            } else {
                console.log("Good response, but strange response code...?");
                resolve({
                    token: response.data.token,
                    userEmail: response.data.userEmail,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName
                });
            }
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                // client received an error response (5xx, 4xx)
                if (err.response.status == 401) {
                    alert("Password incorrect.")
                    reject(new Error("Password incorrect."));
                } else if (err.response.status == 404) {
                    alert("No user account found with that email address.")
                    reject(new Error("No user account found with that email address."));
                } else {
                    console.log("Unknown response error code.");
                    reject(new Error());
                }
            } else if (err.request) {
                // client never received a response, or request never left
                alert("Client never received a response, or request never left")
                reject(new Error("Client never received a response, or request never left."));
            } else {
                // anything else
                alert("Anything else.")
                reject(new Error());
            }
        }) // end catch
    }) // end Promise return
}; // end signIn
  
export const authService = {
    signIn,
    signUp
};
