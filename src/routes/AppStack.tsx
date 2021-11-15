import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import GeolocationScreen from "../screens/GeolocationScreen";
import {RootStackParamList} from '../screens/RootStackParams';

const Stack = createStackNavigator<RootStackParamList>();

export const AppStack = () => {
    console.log("App Stack");
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Geolocation" component={GeolocationScreen} />
    </Stack.Navigator>
  );
};