import React from 'react';
// import {View, ActivityIndicator} from 'react-native';
import  MapView ,{ Marker } from 'react-native-maps';
import {useAuth} from '../contexts/Auth';
import styles from "../../stylesheet";

export const ExportMap = () => {

  const auth = useAuth();
    
  return (
    <MapView
      style={styles.map}
      initialRegion={{ latitude: auth.lat,
        longitude: auth.long,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05 }} >

    <Marker pinColor='#30D5C8'
      title="Current Location"
      description={"Lat: " + auth.lat.toFixed(4) + ", Long: " + auth.long.toFixed(4)}
      coordinate={{ latitude: auth.lat, longitude: auth.long }} />
  </MapView>

  );
};