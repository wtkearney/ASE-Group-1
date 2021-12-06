import React from 'react';

import SavedLocationsScreen from "../screens/SavedLocationsScreen";
import MapScreen from "../screens/MapScreen";
import UserAccountScreen from "../screens/UserAccountScreen";
import {RootStackParamList} from '../screens/RootStackParams';
import { TouchableOpacity, Text } from "react-native";
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../contexts/Auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import {styles, colors} from "../../stylesheet";

import {createStackNavigator} from '@react-navigation/stack'; // we need this in order to have a header
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<RootStackParamList>();

// type appStackProp = StackNavigationProp<RootStackParamList, 'SavedLocations'>;

function TabNav() {
  // const navigation = useNavigation<homeScreenProp>();
  return (
    
    <Tab.Navigator screenOptions={{
      tabBarActiveBackgroundColor: colors.darkestColor,
      tabBarInactiveBackgroundColor: colors.darkestColor,
      tabBarActiveTintColor: colors.highlightColor,
      tabBarInactiveTintColor: colors.midLightColor,
      tabBarStyle: {borderTopColor: colors.midColor, backgroundColor: colors.darkestColor},
    }}>
      <Tab.Screen name="Map" component={MapScreen} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          )}}
      />
      <Tab.Screen name="Saved Locations" component={SavedLocationsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location" color={color} size={size} />
          ) }}
      />
    </Tab.Navigator>
  );
}

function StackNav() {

  // const navigation = useNavigation();
  const auth = useAuth();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
      <StatusBar style="light" />
  <Stack.Navigator screenOptions={{
    headerTitle: "",
    headerStyle: {
    },
  }}>
    <Stack.Screen
      name="TabNav"
      component={TabNav}
      options={
        ({ navigation }) => ({
        headerStyle: {backgroundColor: colors.darkestColor,
          shadowColor: colors.midColor, // this covers iOS
          elevation: 0, // this covers Android
        },
        headerLeft: () => (
          <TouchableOpacity
            style={styles.headerTouchableContainer}
            onPress={() => navigation.navigate('User Account')}>
            <Ionicons name="person" size={25} color={colors.midLightColor} style={{marginLeft: 15}} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            style={{marginRight: 15}}
            onPress={() => auth.signOut()}>
            <Text style={styles.signOutText}>Sign out</Text>
          </TouchableOpacity>
        ),
        })
      }
    />
    <Stack.Screen
      name="User Account"
      component={UserAccountScreen}
      options={
        ({ navigation }) => ({
          headerShown: true,
          headerTitle: "Account Info",
          gestureEnabled: true,
         presentation: 'modal',
         headerTitleStyle: styles.headerStyle,
         headerStyle: {backgroundColor: colors.darkestColor,
          shadowColor: colors.midColor, // this covers iOS
          elevation: 0, // this covers Android
        },
         headerLeft: ()=> null,
         headerRight: () => (
           <TouchableOpacity
             style={{}}
              onPress={() => navigation.navigate("TabNav")}>
              <Ionicons name="close" size={25} color={colors.midLightColor} style={{marginRight: 15}} />
            </TouchableOpacity>
          )
        })
      }
    />
  </Stack.Navigator>
  </SafeAreaView>

  )}

export const AppStack = () => {
  // console.log("App Stack");
  return (

      StackNav()

    
    
  );
};