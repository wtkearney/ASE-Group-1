import React from 'react';
// import {View, ActivityIndicator} from 'react-native';
import  MapView ,{ Marker } from 'react-native-maps';
import {useAuth} from '../contexts/Auth';
import styles from "../../stylesheet";

import {Loading} from '../components/Loading';

export const ExportMap = () => {

  const auth = useAuth();

  // const {authData} = useAuth();

  if (!auth.locationData) {
    console.log("Loading screen...")
    return <Loading />;
  }
    
  return (
    <MapView
      style={styles.map}
      initialRegion={{ latitude: auth.locationData.lat,
        longitude: auth.locationData.long,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05 }} >

    <Marker pinColor='#30D5C8'
      title="Current Location"
      description={"Lat: " + auth.locationData.lat.toFixed(4) + ", Long: " + auth.locationData.long.toFixed(4)}
      coordinate={{ latitude: auth.locationData.lat, longitude: auth.locationData.long }} />
  </MapView>

  );
};