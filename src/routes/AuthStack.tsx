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
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
};