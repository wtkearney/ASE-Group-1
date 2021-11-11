import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { Text, View, TouchableOpacity } from "react-native";
import {RootStackParamList} from './RootStackParams';
import * as Location from 'expo-location';
import styles from "../../stylesheet";

type geolocationScreenProp = StackNavigationProp<RootStackParamList, 'Geolocation'>;

const GeolocationScreen = () => {
    const navigation = useNavigation<geolocationScreenProp>();

    // define some state variables
    const [location, setLocation] = useState({});
    const [statusText, setStatusText] = useState("Waiting for user input.");
    const [latText, setLatText] = useState('');
    const [longText, setLongText] = useState('');

    // function to get our location
    const getLocation = async () => {

        setStatusText('Retrieving location...')
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setStatusText('Permission to access location was denied.');
            return;
        }

        setStatusText('Getting location...');
        
        let location = await Location.getCurrentPositionAsync({});
        if (location) {
            // console.log(location);
            setLocation(location);

            setStatusText('Location retrieved!');
            setLatText(location.coords.latitude.toFixed(7))
            setLongText(location.coords.longitude.toFixed(7))
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>React Native Geolocation</Text>
            <View style={styles.space}/>
            <Text style={styles.status}>Status: {statusText}</Text>
            <View style={styles.space}/>
            <Text style={styles.textStyle}>Latitude: {latText} </Text>
            <Text style={styles.textStyle}>Longitude: {longText} </Text>
            <View style={styles.space}/>
            <TouchableOpacity
                style={styles.appButtonContainer}
                onPress={getLocation}
            >
              <Text style={styles.appButtonText}>Get current location</Text>
            </TouchableOpacity>
            <View style={styles.space}/>
            <TouchableOpacity
                style={styles.appButtonContainer}
                onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.appButtonText}>Go back to Home</Text>
            </TouchableOpacity>

      </View>
      );
};

export default GeolocationScreen;