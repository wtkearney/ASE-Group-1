import React, {useState, useContext, useEffect, useRef} from 'react';
// import {View, ActivityIndicator} from 'react-native';
import  MapView, { Marker, Heatmap, PROVIDER_GOOGLE, LatLng, Callout} from 'react-native-maps';
import {useAuth} from '../contexts/Auth';
import {styles, colors} from "../../stylesheet";
import { View, ActivityIndicator, Text, Alert } from "react-native";
import {Loading} from '../components/Loading';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../screens/RootStackParams';

type exportMapProp = StackNavigationProp<RootStackParamList, 'ExportMap'>;

export type WeightedLatLng = {
  latitude: number;
  longitude: number;
  weight?: number;
}

export const ExportMap = () => {

  const navigation = useNavigation<exportMapProp>();

  const [weightedLatLngArray, setWeightedLatLngArray] = useState<WeightedLatLng[]>();

  const auth = useAuth();

  const [latitudeDelta, setLatitudeDelta] = useState<number>(0.005);
  const [longitudeDelta, setLongitudeDelta] = useState<number>(0.005);

  const [lastPressCoordinates, setLastPressCoordinates] = useState<LatLng>({
    latitude: auth.viewLocationData.lat,
    longitude: auth.viewLocationData.long
  });

  const markerRef = useRef(null);

  useEffect(() => {
    // getNearestPostcodes();
    setLastPressCoordinates({latitude: auth.viewLocationData.lat,
      longitude: auth.viewLocationData.long})
  }, [auth.viewLocationData])

  // everytime locationData is updated, get new neary postcodes
  useEffect(() => {
    // getNearestPostcodes();
    updateWeightedArray();
  }, [auth.heatmapData])

  // useEffect(() => {
  //   // getNearestPostcodes();
  //   console.log(lastPressCoordinates);
  // }, [lastPressCoordinates])

  const confirmSaveLocation = () =>
    Alert.alert(
      "Save Location",
      "Are you sure you want to save this location?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK",
        onPress: saveLocation }
      ]
    );

  const saveLocation = async () => {

    console.log("Saving Location!")

    if (lastPressCoordinates) {
      auth.saveLocation(lastPressCoordinates.latitude, lastPressCoordinates.longitude);
    }

    navigation.navigate("Saved Locations");
  }


  const updateWeightedArray = async () => {

    var tmpArray = new Array<WeightedLatLng>();

    if (auth.heatmapData) {

      for(var i = 0; i < auth.heatmapData.length; i++) {

        if (auth.heatmapData[i].average > 0) {

          // create new WeightedLatLng object
        const newEntry = {
          latitude: auth.heatmapData[i].latitude,
          longitude: auth.heatmapData[i].longitude,
          weight: auth.heatmapData[i].average
        }

        // add the entry to our temp array
        tmpArray.push(newEntry)

        }
        
      } // end for loop

      console.log(tmpArray);
      setWeightedLatLngArray(tmpArray);
    }
    // console.log("Updated weightedLatLng array:")
    // console.log(weightedLatLngArray);
  }

  if (weightedLatLngArray && auth.heatmapData && auth.viewLocationData) {
    // console.log("Trying to return mapview");
    // console.log(auth.heatmapData);
    // console.log(weightedLatLngArray);
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        //minZoomLevel={0}
        //maxZoomLevel={5}
        onPress={ (event) => setLastPressCoordinates(event.nativeEvent.coordinate)}
        region={{ latitude: lastPressCoordinates.latitude,
          longitude: lastPressCoordinates.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta }} >

        <Heatmap
          points={weightedLatLngArray}
          radius={100}
          opacity={0.7}
          // gradient={gradientObject} // use default
        />
      
      { lastPressCoordinates &&
      <Marker 
        //description={{}}
        coordinate={lastPressCoordinates}
        // onPress={() => console.log("You pressed me!")}
        //onCalloutPress={() => console.log("You pressed me!")}
      >
        <Callout
          onPress={confirmSaveLocation}
          style={{}}>
            <View>
              <Text style={styles.calloutTitle}>Click me to save this location</Text>
              <Text style={styles.calloutDescription}>Lat: {lastPressCoordinates.latitude.toFixed(3)}, Long: {lastPressCoordinates.longitude.toFixed(3)}</Text>
            </View>
        </Callout>
      </Marker>
      }
  
      <Marker pinColor={colors.lightestColor}
        title="Current Location"
        description={"Lat: " + auth.viewLocationData.lat.toFixed(4) + ", Long: " + auth.viewLocationData.long.toFixed(4)}
        coordinate={{ latitude: auth.viewLocationData.lat, longitude: auth.viewLocationData.long }}/>
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