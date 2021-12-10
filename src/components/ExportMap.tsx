import React, {useState, useContext, useEffect, useRef} from 'react';
// import {View, ActivityIndicator} from 'react-native';
import  MapView, { Marker, Heatmap, PROVIDER_GOOGLE, LatLng, Callout, MapEvent} from 'react-native-maps';
import {useAuth} from '../contexts/Auth';
import {styles, colors} from "../../stylesheet";
import { View, Text, Alert, Switch, TouchableOpacity } from "react-native";
import {Loading} from '../components/Loading';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../screens/RootStackParams';
import {  } from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type exportMapProp = StackNavigationProp<RootStackParamList, 'ExportMap'>;

export type WeightedLatLng = {
  latitude: number;
  longitude: number;
  weight: number;
}

export const ExportMap = () => {

  const navigation = useNavigation<exportMapProp>();

  const [weightedLatLngArray, setWeightedLatLngArray] = useState<WeightedLatLng[]>();

  const auth = useAuth();

  const [latitudeDelta, setLatitudeDelta] = useState<number>(0.005);
  const [longitudeDelta, setLongitudeDelta] = useState<number>(0.005);

  const [heatmapRadius, setHeatmapRadius] = useState<number>(40);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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

  const mapMarkers = () => {
    if (auth.heatmapData) {
      return auth.heatmapData.map((item) =>
      <Marker
        key={item.areaCode}
        coordinate={{ latitude: item.latitude, longitude: item.longitude }}
        // description={}
        pinColor={colors.midColor}
        onPress={(event) => handleMarkerPress(event, item.areaCode)}
      >
        <Callout
          onPress={() => navigation.navigate("Price Details")}
          style={{}}
        >
          <View>
            <Text style={styles.calloutTitle}>Click me to view detailed sale data</Text>
            <Text style={styles.calloutDescription}>Average price for {item.areaCode}: {'\u00A3'}{item.average.toLocaleString()}</Text>
          </View>
        </Callout>
      </Marker >
    )
    }
  }

  const handleMarkerPress = (e: MapEvent, postcode: string) => {
    // set the current postcode state in the app context
    auth.setCurrentPostcodeDetailWrapper(postcode);

    // open callout with navigation capability to open price data screen

    // stop onPress event from propagating to mapView
     e.stopPropagation();
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

  const gradientObject = {
    colors: [
      "rgba(102, 255, 0, 1)",
      "rgba(147, 255, 0, 1)",
      "rgba(193, 255, 0, 1)",
      "rgba(238, 255, 0, 1)",
      "rgba(244, 227, 0, 1)",
      "rgba(249, 198, 0, 1)",
      "rgba(255, 170, 0, 1)",
      "rgba(255, 113, 0, 1)",
      "rgba(255, 57, 0, 1)",
      "rgba(255, 0, 0, 1)",
    ],
    startPoints: [0.005, 0.01, 0.02, 0.03, 0.04, 0.05, 0.055, 0.065, 0.07, 0.08],
    colorMapSize: 256,
  }

  if (weightedLatLngArray && auth.heatmapData && auth.userLocationData) {
    return (

      <View style={[styles.container, {}]}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          minZoomLevel={12}
          maxZoomLevel={20}
          onPress={ (event) => setMarkerCoordinates(event.nativeEvent.coordinate)}
          initialRegion={{ latitude: auth.userLocationData.lat,
            longitude: auth.userLocationData.long,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta }}
          region={region}
          //onRegionChangeComplete runs when the user stops dragging MapView
          onRegionChangeComplete={(region) => {
            setLatitudeDelta(region.latitudeDelta);
            setLongitudeDelta(region.longitudeDelta);
            setRegion(region);
            // console.log(region.latitude, region.longitude);
            // if (markerRef && markerRef.current && markerRef.current.showCallout) {
            //   markerRef.current.showCallout();
            // }
          }}
        >
          
          {isEnabled && mapMarkers()}
            
            <Heatmap
              key={heatmapRadius}
              points={weightedLatLngArray}
              radius={heatmapRadius}
              // radius={weightedLatLngArray.length*100}
              opacity={0.7}
              gradient={gradientObject} // use default
            />
      
            {markerCoordinates &&
              <Marker 
                coordinate={markerCoordinates}
                //description={{}}
                // onPress={() => console.log("You pressed me!")}
                //onCalloutPress={() => console.log("You pressed me!")}
              >
                <Callout
                  onPress={confirmSaveLocation}
                  style={{}}
                >
                  <View>
                    <Text style={styles.calloutTitle}>Click me to save this location</Text>
                    <Text style={styles.calloutDescription}>Lat: {markerCoordinates.latitude.toFixed(3)}, Long: {markerCoordinates.longitude.toFixed(3)}</Text>
                  </View>
                </Callout>
              </Marker>
            }
        </MapView>
        <View style={styles.switchView}>
          <Text style={styles.switchText}>Show markers?</Text>
          <Switch
              trackColor={{ false: colors.midDarkColor, true: colors.midDarkColor }}
              thumbColor={isEnabled ? colors.highlightColor : colors.lightestColor}
              ios_backgroundColor={colors.midDarkColor}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
        </View>

        <View style={styles.heatmapControlView}>
          <Text style={styles.heatmapControlText}>Heatmap</Text>
          <Text style={styles.heatmapControlText}>Radius: {heatmapRadius}</Text>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              if (heatmapRadius < 500) {
                setHeatmapRadius(heatmapRadius + 5);
              }
            }}>
            <Ionicons name="add-circle-outline" style={styles.heatmapControlIcons} size={50}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (heatmapRadius > 10) {
                setHeatmapRadius(heatmapRadius - 5);
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