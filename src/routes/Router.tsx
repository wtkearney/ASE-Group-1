import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '../contexts/Auth';
import SplashScreen from '../screens/SplashScreen';

export const Router = () => {
  const {authData, loading} = useAuth();

  if (loading) {
    console.log("Loading screen...");
    return (<SplashScreen/>)
  }

  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
      {/* {authData ? <AuthStack  /> : <AppStack />} */}
    </NavigationContainer>
  );
};