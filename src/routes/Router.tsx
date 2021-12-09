import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '../contexts/Auth';
import SplashScreen from '../screens/SplashScreen';

export const Router = () => {
  const {authData, isAuthorised} = useAuth();

  if (isAuthorised) {
    return (<SplashScreen/>)
  }

  return (
    <NavigationContainer>
      {authData ? <AppStack/> : <AuthStack/>}
    </NavigationContainer>
  );
};