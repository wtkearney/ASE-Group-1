import React, {useState, useContext, useEffect} from 'react';
// import {View, ActivityIndicator} from 'react-native';
import  MapView, { Marker, Heatmap} from 'react-native-maps';
import {useAuth} from '../contexts/Auth';
import {styles, colors} from "../../stylesheet";
import { View } from "react-native";
import {Loading} from '../components/Loading';

export type WeightedLatLng = {
  latitude: number;
  longitude: number;
  weight?: number;
}

export const ExportMap = () => {

  const [weightedLatLngArray, setWeightedLatLngArray] = useState<WeightedLatLng[]>();

  const auth = useAuth();

  // everytime locationData is updated, get new neary postcodes
  useEffect(() => {
    // getNearestPostcodes();
    updateWeightedArray();
  }, [auth.heatmapData])

  const updateWeightedArray = async () => {

    var tmpArray = new Array<WeightedLatLng>();

    if (auth.heatmapData) {

      for(var i = 0; i < auth.heatmapData.length; i++) {

        // create new WeightedLatLng object
        const newEntry = {
          latitude: auth.heatmapData[i].latitude,
          longitude: auth.heatmapData[i].longitude,
          weight: auth.heatmapData[i].average
        }

        // add the entry to our temp array
        tmpArray.push(newEntry)
      } // end for loop

      console.log(tmpArray);
      setWeightedLatLngArray(tmpArray);
    }
    console.log("Updated weightedLatLng array:")
    console.log(weightedLatLngArray);
  }

  // const gradientObject = {
  //   colors: ["red", "yellow", "green"],
  //   startPoints: [0.0, 0.5, 1.0],
  //   colorMapSize: 256
  // }

  if (weightedLatLngArray && auth.heatmapData && auth.locationData) {
    console.log("Trying to return mapview");
    // console.log(auth.heatmapData);
    console.log(weightedLatLngArray);
    return (
      <MapView
        style={styles.map}
        initialRegion={{ latitude: auth.locationData.lat,
          longitude: auth.locationData.long,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05 }} >

        <Heatmap
          points={weightedLatLngArray}
          radius={20}
          opacity={0.7}
          // gradient={gradientObject} // use default
        />
  
      <Marker pinColor='#30D5C8'
        title="Current Location"
        description={"Lat: " + auth.locationData.lat.toFixed(4) + ", Long: " + auth.locationData.long.toFixed(4)}
        coordinate={{ latitude: auth.locationData.lat, longitude: auth.locationData.long }} />
    </MapView>
  
    );
  } else {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

};