import React, {createContext, useState, useContext, useEffect, Dispatch, SetStateAction} from 'react';
// import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';

import {AuthData, PostcodeData, heatmapData, authService} from '../services/authService';

import * as Font from 'expo-font';
import { isLoaded } from 'expo-font';

export type locationData = {
  lat: number;
  long: number;
  postcode: string;
}

export type savedLocationData = {
  lat: number;
  long: number;
  creationDate: Date;
}

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  userLocationData?: locationData;
  viewLocationData: locationData;
  savedLocations?: Array<savedLocationData>;
  // nearestPostcodes?: PostcodeData;
  heatmapData?: Array<heatmapData>;
  signUp(firstName: string, lastName: string, email: string, password: string): Promise<void>;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
  getUserLocationData(): void;
  getHeatmapData(): void;
  saveLocation(lat: number, long: number): void;
  setViewLocationDataWrapper(lat: number, long: number): void;
  // getNearestPostcodes(): void;
};

// Create the Auth Context with the data type specified and an empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [authData, setAuthData] = useState<AuthData>();

  // this is the user current location
  const [userLocationData, setUserLocationData] = useState<locationData>();

  // this is the location that will be viewed on the map
  const [viewLocationData, setViewLocationData] = useState<locationData>({lat: 0, long: 0, postcode: ""});

  const [heatmapData, setHeatmapData] = useState<Array<heatmapData>>();

  // const [fontLoaded, setFontLoaded] = useState<boolean>(false);

  const [nearestPostcodes, setNearestPostcodes] = useState<PostcodeData>();

  const [savedLocations, setSavedLocations] = useState<Array<savedLocationData>>();

  // AuthContext starts with loading = true and stays like that until the data is loaded from storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Every time the App is opened, do this....
    startUp();
  }, []);

  // everytime locationData is updated, get new neary postcodes
  useEffect(() => {
    // getNearestPostcodes();
    getHeatmapData();
  }, [viewLocationData])

  useEffect(() => {
    // getNearestPostcodes();
    if (userLocationData) {
      const locationData = {
        lat: userLocationData.lat,
        long: userLocationData.long,
        postcode: userLocationData.postcode
      };
      setViewLocationData(locationData);

    }
    
  }, [userLocationData])

  const startUp = async () => {
    console.log("Starting up app....");

    // load fonts
    await loadFonts();

    // get user location
    await getUserLocationData();

    if (userLocationData) {
      setViewLocationData(userLocationData);
    }

    await loadSavedLocationData();

    if (isLoaded('Roboto-Regular')) {
      setLoading(false)
    }
  }

  const setViewLocationDataWrapper = async (lat: number, long: number) => {

    let postcodeData = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: long
    })

    if (postcodeData[0].postalCode) {

      const locationData = {
        lat: lat,
        long: long,
        postcode: postcodeData[0].postalCode
      };
      setViewLocationData(locationData);
    }
  }

  const loadSavedLocationData = async () => {
  
    const fakeData = [
      {lat: 50.828748334140904,
      long: -0.15194431802911557,
      creationDate: new Date("2021-12-08T08:00:30.000+00:00")},
      {lat: 50.82829917805563,
      long: -0.17806380987167358,
      creationDate: new Date("2021-12-08T09:30:30.000+00:00")}
    ]

    setSavedLocations(fakeData);
  }

  const loadFonts = async () => {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      'Roboto-Regular': require('../../assets/fonts/Roboto/Roboto-Regular.ttf'),

      // Any string can be used as the fontFamily name
      'Roboto-Bold': require('../../assets/fonts/Roboto/Roboto-Bold.ttf')
    });
    // setFontLoaded(true);
  }

  const saveLocation = async (lat: number, long: number) => {

    if (authData && authData.userEmail) {
      await authService.saveLocation(lat, long, authData.userEmail);
    }
  };

  const getUserLocationData = async () => {

    let {status} = await Location.requestForegroundPermissionsAsync();
    let location = await Location.getCurrentPositionAsync({});

    // console.log(location);

    if (location) {

      let postcodeData = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })

      if (postcodeData[0].postalCode) {

        const locationData = {
          lat: location.coords.latitude,
          long: location.coords.longitude,
          postcode: postcodeData[0].postalCode
        };
  
        // console.log(locationData);
        setUserLocationData(locationData);
      }
    }
  }

  const getHeatmapData = async () => {
    
    if (viewLocationData && viewLocationData.postcode) {
      // var outerCode = userLocationData.postcode.replace(/[" "].*/, '').toUpperCase();
      // console.log(outerCode);
      let heatmapData = await authService.getHeatmapData(viewLocationData.postcode);
      //let heatmapData = await authService.getOuterHeatmapData(outerCode);

      setHeatmapData(heatmapData);
      // console.log("This is the heatmap data.")
      // console.log(heatmapData);
    }
  };

  // // function to get our location
  // const getNearestPostcodes = async () => {
    
  //   if (locationData) {
  //     let postcodeData = await authService.getNearestPostcodes(locationData.lat, locationData.long);

  //     setNearestPostcodes(postcodeData);
  //     console.log(postcodeData);
  //   }

  // };

  const signUp = async (firstName: string, lastName: string, email: string, _password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // call the service passing credential (email and password).
      authService.signUp(firstName, lastName, email, _password)
        .then(_authData => {
          // Set the data in the context, so the App can be notified and send the user to the AuthStack
          setAuthData(_authData);
          // Persist the data in the Async Storage to be recovered in the next user session.
          // await SecureStore.setItemAsync("AuthData", JSON.stringify(_authData));
          resolve();
        }).catch(error => {
          console.log(error);
          reject();
        });
    })
  };

    const signIn = async (email: string, _password: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // call the service passing credential (email and password).
        authService.signIn(email, _password)
          .then(_authData => {
            // Set the data in the context, so the App can be notified and send the user to the AuthStack
            setAuthData(_authData);
            // Persist the data in the Async Storage to be recovered in the next user session.
            // await SecureStore.setItemAsync("AuthData", JSON.stringify(_authData));
            resolve();
          }).catch(error => {
            console.log(error);
            reject();
          });
      }) // end promise
    };

  const signOut = async () => {
    // Remove data from context, so the App can be notified and send the user to the AuthStack
    setAuthData(undefined);
  };

  return (
    // This component will be used to encapsulate the whole App, so all components will have access to the Context
    <AuthContext.Provider value={{
      authData, loading, userLocationData, heatmapData, savedLocations, viewLocationData,
      signUp, signIn, signOut, getUserLocationData, getHeatmapData, saveLocation, setViewLocationDataWrapper}}>
      {children}
    </AuthContext.Provider>
  );
};

// A simple hook to facilitate the access to the AuthContext and permit components to subscribe to AuthContext updates
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export {AuthContext, AuthProvider, useAuth};