import React, {createContext, useState, useContext, useEffect} from 'react';
import { resolve } from 'url';
// import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';

import {AuthData, PostcodeData, authService} from '../services/authService';

export type locationData = {
  lat: number;
  long: number;
}

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  locationData?: locationData;
  nearestPostcodes?: PostcodeData;
  signUp(firstName: string, lastName: string, email: string, password: string): Promise<void>;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
  getLatLong(): void;
  getNearestPostcodes(): void;
};

// Create the Auth Context with the data type specified and an empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [authData, setAuthData] = useState<AuthData>();

  const [locationData, setLocationData] = useState<locationData>();

  const [nearestPostcodes, setNearestPostcodes] = useState<PostcodeData>();

  // AuthContext starts with loading = true and stays like that until the data is loaded from storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Every time the App is opened, do this....
    startUp();
  }, []);

  // everytime locationData is updated, get new neary postcodes
  useEffect(() => {
    getNearestPostcodes();
  }, [locationData])

  const startUp = async () => {
    console.log("Starting up app....");
    setLoading(false);
    await getLatLong();
  }

  const getLatLong = async () => {

    let {status} = await Location.requestForegroundPermissionsAsync();
    let location = await Location.getCurrentPositionAsync({});

    if (location) {
      const locationData = {
        lat: location.coords.latitude,
        long: location.coords.longitude};

      console.log(locationData);
      setLocationData(locationData);
    }
  }

  // function to get our location
  const getNearestPostcodes = async () => {
    
    if (locationData) {
      let postcodeData = await authService.getNearestPostcodes(locationData.lat, locationData.long);

      setNearestPostcodes(postcodeData);
      console.log(postcodeData);
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

    // Remove the data from storage to NOT be recoverable in next session.
    // await SecureStore.deleteItemAsync('AuthData');
  };

  return (
    // This component will be used to encapsulate the whole App, so all components will have access to the Context
    <AuthContext.Provider value={{
      authData, loading, locationData, nearestPostcodes,
      signUp, signIn, signOut, getLatLong, getNearestPostcodes}}>
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