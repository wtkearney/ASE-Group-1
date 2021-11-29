import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {RootStackParamList} from '../screens/RootStackParams';

const Stack = createStackNavigator<RootStackParamList>();

export const AuthStack = () => {
  // console.log("Auth Stack");
  return (
    <Stack.Navigator>
        <Stack.Screen name="SignUp" options={{ title: 'Sign Up' }} component={SignUpScreen} />
        <Stack.Screen name="SignIn" options={{ title: 'Sign In' }} component={SignInScreen} />
    </Stack.Navigator>
  );
};