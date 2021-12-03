import React, {createContext, useState, useContext, useEffect} from 'react';
import { resolve } from 'url';
// import * as SecureStore from 'expo-secure-store';

import {AuthData, PostcodeData, authService} from '../services/authService';

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  lat: number;
  long: number;
  signUp(firstName: string, lastName: string, email: string, password: string): Promise<void>;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
  setLatAndLong(lat: number, long: number): Promise<void>;
  getNearestPostcodes(lat: number, long: number): Promise<PostcodeData>;
};

// Create the Auth Context with the data type specified and an empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [authData, setAuthData] = useState<AuthData>();

  const [lat, setLat] = useState<number>(0.0);
  const [long, setLong] = useState<number>(0.0);

  // AuthContext starts with loading = true and stays like that until the data is loaded from storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Every time the App is opened, this provider is rendered and calls loadStorageData
    // loadStorageData();
    startUp();
  }, []);
  async function startUp(): Promise<void> {
    console.log("Starting up app....");
    setLoading(false);
  }

  // async function loadStorageData(): Promise<void> {
  //   try {
  //     // Try get the data from Async Storage
  //     const authDataSerialized = await SecureStore.getItemAsync('@AuthData');
      
  //     if (authDataSerialized) {
  //       // If there is data, it's converted to an Object and the state is updated
  //       const _authData: AuthData = JSON.parse(authDataSerialized);
  //       setAuthData(_authData);
  //     }
  //   } catch (error) {
  //   } finally {
  //     // loading finished
  //     setLoading(false);
  //   }
  // }

    const setLatAndLong = async (lat: number, long: number): Promise<void>  => {
      setLat(lat);
      setLong(long);

      return new Promise((resolve) => {resolve()});
      // console.log("Updated lat and long in auth context: " + lat + " " + long);
    }

    const getNearestPostcodes = async (lat: number, long: number): Promise<PostcodeData> => {
      return new Promise((resolve, reject) => {
        authService.getNearestPostcodes(lat, long)
        .then(postcodeData => {
          resolve(postcodeData);
        })
        .catch(error => {
          reject("There was an error getting nearest postcodes...");
        })
      })
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
    <AuthContext.Provider value={{authData, loading, lat, long, signUp, signIn, signOut, setLatAndLong, getNearestPostcodes}}>
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