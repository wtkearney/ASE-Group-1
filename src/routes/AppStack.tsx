import React from 'react';

import SavedLocationsScreen from "../screens/SavedLocationsScreen";
import MapScreen from "../screens/MapScreen";
import UserAccountScreen from "../screens/UserAccountScreen";
import {RootStackParamList} from '../screens/RootStackParams';
import { TouchableOpacity, Text } from "react-native";
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../contexts/Auth';

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import styles from "../../stylesheet";

import {createStackNavigator} from '@react-navigation/stack'; // we need this in order to have a header
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<RootStackParamList>();

// type appStackProp = StackNavigationProp<RootStackParamList, 'SavedLocations'>;

function TabNav() {
  // const navigation = useNavigation<homeScreenProp>();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" component={MapScreen} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          )}}
      />
      <Tab.Screen name="SavedLocations" component={SavedLocationsScreen} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="location" color={color} size={size} />
        ) }}
      
      />
    </Tab.Navigator>
  );
}

function StackNav() {

  const navigation = useNavigation();
  const auth = useAuth();

  return (<Stack.Navigator screenOptions={{
    headerTitle: ""
  }}>
    <Stack.Screen
      name="TabNav"
      component={TabNav}
      options={
        ({ navigation }) => ({
        headerStyle: {backgroundColor: '#fff'},
        headerLeft: () => (
          <TouchableOpacity
            style={styles.headerTouchableContainer}
            onPress={() => navigation.navigate('User Account')}>
            <Ionicons name="person" size={25} color="black" style={{marginLeft: 15}} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            style={styles.alreadyHaveAccountContainer}
            onPress={() => auth.signOut()}>
            <Text style={styles.alreadyHaveAccountText}>Sign out</Text>
          </TouchableOpacity>
        ),
      })}
    />
    <Stack.Screen
      name="User Account"
      component={UserAccountScreen}
      options={
        ({ navigation }) => ({
          headerShown: true,
          gestureEnabled: true,
         presentation: 'modal',
         headerLeft: ()=> null,
         headerRight: () => (
           <TouchableOpacity
             style={styles.alreadyHaveAccountContainer}
              onPress={() => navigation.navigate("TabNav")}>
              <Ionicons name="close" size={25} color="black" style={{marginLeft: 15}} />
            </TouchableOpacity>
          )
        })
      }
    />
  </Stack.Navigator>

  )}

export const AppStack = () => {
  // console.log("App Stack");
  return (

      StackNav()

    
    
  );
};