import React, {createContext, useState, useContext, useEffect, Dispatch, SetStateAction} from 'react';
// import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';

import {AuthData, PostcodeData, heatmapData, authService, savedLocationData, markerData} from '../services/authService';
import { Alert } from "react-native";

import * as Font from 'expo-font';
import { isLoaded } from 'expo-font';

export type locationData = {
  lat: number;
  long: number;
  postcode: string;
}

type AuthContextData = {
  authData?: AuthData;
  isAuthorised: boolean;
  userLocationData?: locationData;
  viewLocationData: locationData;
  savedLocations?: Array<savedLocationData>;
  heatmapData?: Array<heatmapData>;
  markerData?: Array<markerData>;
  currentPostCodeDetail?: string;
  verifyPassword(email: string, _password: string): Promise<boolean>;
  signUp(firstName: string, lastName: string, email: string, password: string): Promise<void>;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
  getUserLocationData(): void;
  getHeatmapData(): void;
  getMarkerData(): void;
  saveLocation(lat: number, long: number): void;
  setViewLocationDataWrapper(lat: number, long: number): void;
  deleteAccount(userEmail: string): void;
  loadSavedLocationData(): void;
  setCurrentPostcodeDetailWrapper(postcode: string): void;
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
  const [markerData, setMarkerData] = useState<Array<markerData>>();
  const [savedLocations, setSavedLocations] = useState<Array<savedLocationData>>();
  const [currentPostCodeDetail, setCurrentPostcodeDetail] = useState<string>();

  // AuthContext starts with loading = true and stays like that until the data is loaded from storage
  const [loading, setLoading] = useState(true);

  const setCurrentPostcodeDetailWrapper = (postcode: string) => {
    // console.log("setting current postcode detail: " + postcode)
    setCurrentPostcodeDetail(postcode);
  }

  useEffect(() => {
    // Every time the App is opened, do this....
    startUp();
  }, []);

  useEffect(() => {

    if (true) {
      getHeatmapData();
    }
    getMarkerData();
  }, [viewLocationData]);

  useEffect(() => {
    if (userLocationData) {
      const locationData = {
        lat: userLocationData.lat,
        long: userLocationData.long,
        postcode: userLocationData.postcode
      };
      setViewLocationData(locationData);
    }
    
  }, [userLocationData])

  // update the saved locations whenever the auth data is updated, because we need the user's email
  useEffect(() => {
    loadSavedLocationData();
  }, [authData])

  const startUp = async () => {
    console.log("Starting up app....");

    // load fonts
    await loadFonts();

    // get user location
    await getUserLocationData();

    if (userLocationData) {
      setViewLocationData(userLocationData);
    }

    if (viewLocationData) {
      console.log("Getting heatmap and marker data")
      getHeatmapData();
      getMarkerData();
    }

    

    if (isLoaded('Roboto-Regular')) {
      setLoading(false)
    }
  }

  const setViewLocationDataWrapper = async (lat: number, long: number) => {

    // console.log("Updating view location....")
    // console.log("Lat: ", lat)
    // console.log("Long: ", long)

    await authService.getNearestPostcodes(lat, long, 1)
      .then(postcode => {
        // console.log("This is the returned postcode:")
        // console.log(postcode)

        const locationData = {
          lat: lat,
          long: long,
          postcode: postcode
        };
        setViewLocationData(locationData);

      })
      .catch(error => {
        console.log(error);

        Alert.alert(
          "Hmmmm",
          "Looks like we weren't able to get a postcode for those coordinates.",
          [
            { text: "OK",
            onPress: () => null }
          ]
        );

      })

  }

  const deleteAccount = async (userEmail: string) => {
    let result = await authService.deleteAccount(userEmail);
    if (result) {
      signOut();
    }
  };

  const loadSavedLocationData = async () => {

    setSavedLocations(undefined);

    if (authData) {
      let data = await authService.getSavedLocationData(authData?.userEmail);

      for(var i = 0; i < data.length; i++) {
        data[i].creationDate = new Date(data[i].creationDate)
      }

      setSavedLocations(data);
    }
    
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
      await authService.saveLocation(lat, long, authData.userEmail)
        .then(() => loadSavedLocationData())
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
      setHeatmapData(await authService.getHeatmapData(viewLocationData.postcode));
    }
  };

  const getMarkerData = async () => {
    if (viewLocationData && viewLocationData.postcode) {
      setMarkerData(await authService.getMarkerData(viewLocationData.postcode));
    }
  };

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

  const verifyPassword = async (email: string, _password: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      // call the service passing credential (email and password).
      authService.signIn(email, _password)
        .then(_authData => {
          resolve(true);
        }).catch(error => {
          resolve(false);
        });
    }) // end promise
  }

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
      authData, isAuthorised: loading, userLocationData, heatmapData, markerData, savedLocations, viewLocationData,
      currentPostCodeDetail,
      verifyPassword, deleteAccount, signUp, signIn, signOut, getUserLocationData, loadSavedLocationData,
      getHeatmapData, getMarkerData, saveLocation, setViewLocationDataWrapper,
      setCurrentPostcodeDetailWrapper}}>
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