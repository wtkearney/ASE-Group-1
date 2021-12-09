import React, {useState, useContext, useEffect, useRef} from 'react';
// import {View, ActivityIndicator} from 'react-native';
import  MapView, { Marker, Heatmap, PROVIDER_GOOGLE, LatLng, Callout} from 'react-native-maps';
import {useAuth} from '../contexts/Auth';
import {styles, colors} from "../../stylesheet";
import { View, ActivityIndicator, Text, Alert, Button, Touchable } from "react-native";
import {Loading} from '../components/Loading';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../screens/RootStackParams';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons';

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

  const [heatmapRadius, setHeatmapRadius] = useState<number>(20);

  //create a Hook to store our region data.
  const [region, setRegion] = useState({
    latitude: auth.viewLocationData.lat,
    longitude: auth.viewLocationData.long,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  });

  const [markerCoordinates, setMarkerCoordinates] = useState({
    latitude: auth.viewLocationData.lat,
    longitude: auth.viewLocationData.long
  });


  // when the marker coordinates change, update the view location
  // this will also update the heatmap data
  useEffect(() => {
    if (markerCoordinates) {
      auth.setViewLocationDataWrapper(markerCoordinates.latitude, markerCoordinates.longitude);
      updateWeightedArray();
    }
  }, [markerCoordinates])

  // when the heatmap data updates, update the weighted array used for the heatmap
  useEffect(() => {
    updateWeightedArray();
  }, [auth.heatmapData])

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

    if (auth.viewLocationData) {
      auth.saveLocation(auth.viewLocationData.lat, auth.viewLocationData.long);
    }

    navigation.navigate("Saved Locations");
  }


  const updateWeightedArray = async () => {

    if (auth.heatmapData) {
      var tmpArray = new Array<WeightedLatLng>();

      for(var i = 0; i < auth.heatmapData.length; i++) {

        if (auth.heatmapData[i].average) {

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
      console.log(tmpArray.length);
      setWeightedLatLngArray(tmpArray);
    }
  }

  if (weightedLatLngArray && auth.heatmapData && auth.userLocationData) {
    return (

      <View style={[styles.container, {}]}>

          
        
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        minZoomLevel={12}
        maxZoomLevel={15}
        onPress={ (event) => setMarkerCoordinates(event.nativeEvent.coordinate)}
        initialRegion={{ latitude: auth.userLocationData.lat,
          longitude: auth.userLocationData.long,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta }}
          //onRegionChangeComplete runs when the user stops dragging MapView
        region={region}
        onRegionChangeComplete={(region) => {
          if (latitudeDelta < 0.03) {
            console.log("Lat delta: ", latitudeDelta)
          }

          setLatitudeDelta(region.latitudeDelta);
          setLongitudeDelta(region.longitudeDelta);
          setRegion(region);
          // console.log(region.latitude, region.longitude);
          // if (markerRef && markerRef.current && markerRef.current.showCallout) {
          //   markerRef.current.showCallout();
          // }
        }}
      >
        

      <Heatmap
        key={heatmapRadius}
        points={weightedLatLngArray}
        radius={heatmapRadius}
        // radius={weightedLatLngArray.length*100}
        opacity={0.7}
        // gradient={gradientObject} // use default
      />
      
      {markerCoordinates &&
      <Marker 
        //description={{}}
        coordinate={markerCoordinates}
        // onPress={() => console.log("You pressed me!")}
        //onCalloutPress={() => console.log("You pressed me!")}
      >
        <Callout
          onPress={confirmSaveLocation}
          style={{}}>
            <View>
              <Text style={styles.calloutTitle}>Click me to save this location</Text>
              <Text style={styles.calloutDescription}>Lat: {markerCoordinates.latitude.toFixed(3)}, Long: {markerCoordinates.longitude.toFixed(3)}</Text>
            </View>
        </Callout>
      </Marker>
      }
      
  
      {/* <Marker pinColor={colors.lightestColor}
        title="Current Location"
        description={"Lat: " + auth.viewLocationData.lat.toFixed(4) + ", Long: " + auth.viewLocationData.long.toFixed(4)}
        coordinate={{ latitude: auth.viewLocationData.lat, longitude: auth.viewLocationData.long }}/> */}
    </MapView>
      <View style={styles.heatmapControlView}>
        <Text style={styles.heatmapControlText}>Heatmap</Text>
        <Text style={styles.heatmapControlText}>Radius: {heatmapRadius}</Text>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            if (heatmapRadius < 250) {
              setHeatmapRadius(heatmapRadius + 10);
            }
            console.log(heatmapRadius);
          }}>
          <Ionicons name="add-circle-outline" style={styles.heatmapControlIcons} size={50}/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (heatmapRadius > 10) {
              setHeatmapRadius(heatmapRadius - 10);
            }
          }}>
          <Ionicons name="remove-circle-outline" style={styles.heatmapControlIcons} size={50}/>
        </TouchableOpacity>
      </View>
    </View>
  
    );
  } else {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

};