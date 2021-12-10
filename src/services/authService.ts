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
const postcodesPath = '/postcodes';

const headers = {
    headers : {
        "Content-Type": "application/json"
    }
};

export type savedLocationData = {
    lat: number;
    long: number;
    creationDate: Date;
  }

export type priceData = {
    year: string;
    price: number;
    address: string;
}

export type heatmapData = {
    areaCode: string;
    average: number;
    latitude: number;
    longitude: number;
  }

export type markerData = {
    areaCode: string;
    average: number;
    latitude: number;
    longitude: number;
    data: Array<priceData>;
  }

export type AuthData = {
    userEmail: string;
    firstName: string;
    lastName: string;
  };

export type PostcodeData = {
    nearestPostcodes: Array<string>;
}

// const formatPrice = (price: string): string => {

//     return()

// }

const getOuterHeatmapData = async (outerPostcode: string): Promise<heatmapData[]> => {

    // embed the whole function body inside a Promise constructor, so should any error happen, it will be converted to a rejection
    return new Promise((resolve, reject) => {
        axios.get(serverURL + apiPath + `/mapview/outcode/${outerPostcode}`)
        .then((response) => {
              //console.log(response);
            // check response status
            if (response.status == 200 || response.status == 304) {
                resolve(response.data);
            } else {
                reject(new Error("Response status code " + response.status ));
            }
        })
        .catch(err => {
            //console.log(err);
            if (err.response) {
                reject(new Error("Error " + err.response.status ));
            } else if (err.request) {
                // client never received a response, or request never left
                reject(new Error("Client never received a response, or request never left."));
            } else {
                // anything else
                reject(new Error());
            }
        })
    })
};

const deleteAccount = async (userEmail: string): Promise<boolean> => {
    // embed the whole function body inside a Promise constructor, so should any error happen, it will be converted to a rejection
    return new Promise((resolve, reject) => {
        axios.delete(serverURL + usersPath + `/${userEmail}`)
        .then((response) => {
              //console.log(response);
            // check response status
            if (response.status == 200) {
                resolve(true);
            } else {
                reject(new Error("Response status code " + response.status ));
            }
        })
        .catch(err => {
            //console.log(err);
            if (err.response) {
                reject(new Error("Error " + err.response.status ));
            } else if (err.request) {
                // client never received a response, or request never left
                reject(new Error("Client never received a response, or request never left."));
            } else {
                // anything else
                reject(new Error());
            }
        })
    })
  }


const getSavedLocationData = async (userEmail: string): Promise<savedLocationData[]> => {

    return new Promise((resolve, reject) => {
        axios.get(serverURL + usersPath + `/userLocations/${userEmail}`)
        .then((response) => {
              //console.log(response);
            // check response status
            if (response.status == 200) {
                resolve(response.data);
            } else {
                reject(new Error("Response status code " + response.status ));
            }
        })
        .catch(err => {
            //console.log(err);
            if (err.response) {
                if (err.response.status == 404) {
                    // user doesn't have any saved locations; resolve with empty list
                    resolve([]);
                } else {
                    reject(new Error("Error " + err.response.status ));
                }
            } else if (err.request) {
                // client never received a response, or request never left
                reject(new Error("Client never received a response, or request never left."));
            } else {
                // anything else
                reject(new Error());
            }
        })
    })
}

const getHeatmapData = async (postcode: string): Promise<heatmapData[]> => {
    // embed the whole function body inside a Promise constructor, so should any error happen, it will be converted to a rejection
    return new Promise((resolve, reject) => {
        // console.log(postcode);
        axios.get(serverURL + apiPath + "/mapview/unit/" + postcode)
        .then((response) => {
              //console.log(response);
            // check response status
            if (response.status == 200 || response.status == 304) {
                resolve(response.data);
            } else {
                reject(new Error("Response status code " + response.status ));
            }
        })
        .catch(err => {
            if (err.response) {
                console.log(postcode)
                reject(new Error("Error " + err.response.status ));
            } else if (err.request) {
                // client never received a response, or request never left
                reject(new Error("Client never received a response, or request never left."));
            } else {
                // anything else
                reject(new Error());
            }
        })
    })
}

const getMarkerData = async (postcode: string): Promise<markerData[]> => {

    // console.log(postcode)

    // embed the whole function body inside a Promise constructor, so should any error happen, it will be converted to a rejection
    return new Promise((resolve, reject) => {
        axios.get(serverURL + apiPath + `/mapview/${postcode}?limit=200`)
        .then((response) => {
            // check response status
            if (response.status == 200 || response.status == 304) {
                resolve(response.data);
            } else {
                reject(new Error("Response status code " + response.status ));
            }
        })
        .catch(err => {
            if (err.response) {
                console.log(postcode)
                reject(new Error("Error " + err.response.status ));
            } else if (err.request) {
                // client never received a response, or request never left
                reject(new Error("Client never received a response, or request never left."));
            } else {
                // anything else
                reject(new Error());
            }
        })
    })
}

const saveLocation = async (lat: number, long: number, userEmail: string): Promise<void> => {

    // create payload to send to webserver
    const payload = {
        userEmail: userEmail,
        longitude: long,
        latitude: lat
    };

    // embed the whole function body inside a Promise constructor, so should any error happen, it will be converted to a rejection
    return new Promise((resolve, reject) => {
        axios.post(serverURL + apiPath + "/saveLocation", payload, headers).then((response) => {
            // check response status
            if (response.status == 200) {
                // user account found and verified
                resolve();
            }
        })
        .catch(err => {
            // console.log(err.response);
            if (err.response) {
                // client received an error response (5xx, 4xx)
                if (err.response.status == 400) {
                    alert("Error Uploading Coordinates")
                    reject(new Error("Error Uploading Coordinates"));
                } else {
                    console.log("Unknown response error code: " + err.response.status);
                    alert("Unknown response error code: " + err.response.status);
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
}

const getNearestPostcodes = async (lat: number, long: number, limit: number): Promise<string> => {

    return new Promise((resolve, reject) => {
        
        axios.get(serverURL + postcodesPath + `/getNearestPostcodes?long=${long}&lat=${lat}&limit=${limit}`)
        .then((response) => {
            // console.log(response.data)
            resolve(
                response.data[0]
            );
        })
        .catch(err => {
            console.log(err)
            reject(new Error("This is the error you are looking for!"));
        }); // end catch
    }); // end Promise
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
                    userEmail: response.data.userEmail,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName
                });
            } else {
                console.log("Good response, but strange response code...?");
                resolve({
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
                    userEmail: response.data.userEmail,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName
                });
            } else {
                console.log("Good response, but strange response code...?");
                resolve({
                    userEmail: response.data.userEmail,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName
                });
            }
        })
        .catch(err => {
            // console.log(err.response);
            if (err.response) {
                // client received an error response (5xx, 4xx)
                if (err.response.status == 401) {
                    alert("Password incorrect.")
                    reject(new Error("Password incorrect."));
                } else if (err.response.status == 404) {
                    alert("No user account found with that email address.")
                    reject(new Error("No user account found with that email address."));
                } else {
                    console.log("Unknown response error code: " + err.response.status);
                    alert("Unknown response error code: " + err.response.status);
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
    signUp,
    getNearestPostcodes,
    getHeatmapData,
    getMarkerData,
    getOuterHeatmapData,
    saveLocation,
    deleteAccount,
    getSavedLocationData
};
