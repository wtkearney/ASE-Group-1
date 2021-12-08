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

  //create a Hook to store our region data.
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  });

  const [lastPressCoordinates, setLastPressCoordinates] = useState<LatLng>({
    latitude: auth.viewLocationData.lat,
    longitude: auth.viewLocationData.long
  });

  const markerRef = useRef(null);

  useEffect(() => {
    // setLastPressCoordinates({latitude: auth.viewLocationData.lat,
    //   longitude: auth.viewLocationData.long})
    
      setRegion({
        latitude: auth.viewLocationData.lat,
        longitude: auth.viewLocationData.long,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      })

  }, [auth.viewLocationData])

  // everytime heatmap data is updated, update the weighted array for use in the heatmap
  useEffect(() => {
    updateWeightedArray();
  }, [auth.heatmapData])

  const confirmSaveLocation = () => {
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
        onPress: () => saveLocation() }
      ]
    );
  }

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

      // set weighted array state
      setWeightedLatLngArray(tmpArray);
    }
  }

  if (weightedLatLngArray && auth.heatmapData && auth.userLocationData) {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        //minZoomLevel={0}
        //maxZoomLevel={5}
        onPress={ (event) => setLastPressCoordinates(event.nativeEvent.coordinate)}
        initialRegion={{ latitude: auth.userLocationData.lat,
          longitude: auth.userLocationData.long,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta }}
          //onRegionChangeComplete runs when the user stops dragging MapView
        region={region}
        onRegionChangeComplete={(region) => {
          setRegion(region);
          // console.log(region.latitude, region.longitude);
          // if (markerRef && markerRef.current && markerRef.current.showCallout) {
          //   markerRef.current.showCallout();
          // }
        }}
      >
        <Heatmap
          points={weightedLatLngArray}
          radius={100}
          opacity={0.7}
          // gradient={gradientObject} // use default
        />
      
      {lastPressCoordinates &&
      <Marker 
        //description={{}}
        coordinate={lastPressCoordinates}
        // onPress={() => console.log("You pressed me!")}
        //onCalloutPress={() => console.log("You pressed me!")}
        ref={markerRef}
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