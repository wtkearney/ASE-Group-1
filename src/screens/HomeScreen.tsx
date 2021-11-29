import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { Text, View, TouchableOpacity } from "react-native";
import {RootStackParamList} from './RootStackParams';
import styles from "../../stylesheet";
import {useAuth} from '../contexts/Auth';
import * as Location from 'expo-location';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<homeScreenProp>();
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
    const signOut = async () => {
        isLoading(true);
        await auth.signOut();
    };

  // function to get our location
  const getLocation = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();
    let location = await Location.getCurrentPositionAsync({});

    if (location) {
        auth.setLatAndLong(location.coords.latitude, location.coords.longitude);
        console.log("Lat: " + auth.lat);
        console.log("Long: " + auth.long);
    }
  };

  getLocation();

  return (
    <View style={styles.backgroundContainer}>
      <Text style={styles.alreadyHaveAccountText}>Welcome, {auth.authData?.firstName}!</Text>

      <TouchableOpacity
        style={styles.alreadyHaveAccountContainer}
        onPress={() => signOut()}
      >
      <Text style={styles.alreadyHaveAccountText}>Sign out</Text>
      </TouchableOpacity>


      <Text style={styles.title}>Home screen</Text>
      <View style={styles.space}/>
      <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => navigation.navigate("Map")}
        >
          <Text style={styles.appButtonText}>Go to map</Text>
        </TouchableOpacity>
        <View style={styles.space}/>

  </View>
  );
};

export default HomeScreen;