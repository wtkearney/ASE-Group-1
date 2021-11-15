import React, {createContext, useState, useContext, useEffect} from 'react';
import * as SecureStore from 'expo-secure-store';

import {AuthData, authService} from '../services/authService';

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signUp(firstName: string, lastName: string, email: string, password: string): Promise<void>;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
};

// Create the Auth Context with the data type specified and an empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [authData, setAuthData] = useState<AuthData>();

  // AuthContext starts with loading = true and stays like that until the data is loaded from storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Every time the App is opened, this provider is rendered and calls loadStorageData
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      // Try get the data from Async Storage
      const authDataSerialized = await SecureStore.getItemAsync('@AuthData');
      
      if (authDataSerialized) {
        // If there is data, it's converted to an Object and the state is updated
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      // loading finished
      setLoading(false);
    }
  }

    const signUp = async (firstName: string, lastName: string, email: string, _password: string) => {
        console.log("Calling signUp from Auth.tsx....")
        // call the service passing credential (email and password).

        const _authData = await authService.signUp(firstName, lastName, email, _password);

        // Set the data in the context, so the App can be notified and send the user to the AuthStack
        setAuthData(_authData);

        // Persist the data in the Async Storage to be recovered in the next user session.
        await SecureStore.setItemAsync("AuthData", JSON.stringify(_authData));
    };

    const signIn = async (email: string, _password: string) => {
        console.log("Calling signIn from Auth.tsx....")
        // call the service passing credential (email and password).

        const _authData = await authService.signIn(email, _password);

        // Set the data in the context, so the App can be notified and send the user to the AuthStack
        setAuthData(_authData);

        // Persist the data in the Async Storage to be recovered in the next user session.
        await SecureStore.setItemAsync("AuthData", JSON.stringify(_authData));
    };

  const signOut = async () => {
    // Remove data from context, so the App can be notified and send the user to the AuthStack
    setAuthData(undefined);

    // Remove the data from storage to NOT be recoverable in next session.
    await SecureStore.deleteItemAsync('AuthData');
  };

  return (
    // This component will be used to encapsulate the whole App, so all components will have access to the Context
    <AuthContext.Provider value={{authData, loading, signUp, signIn, signOut}}>
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