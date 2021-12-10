import React, { useState, useEffect } from 'react';
import  MapView, { Marker, Heatmap, PROVIDER_GOOGLE, Callout, MapEvent } from 'react-native-maps';
import { useAuth } from '../contexts/Auth';
import { styles, colors } from "../../stylesheet";
import { View, Text, Alert, Switch, TouchableOpacity } from "react-native";
import { Loading } from '../components/Loading';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../screens/RootStackParams';
import { Ionicons } from '@expo/vector-icons';

type exportMapProp = StackNavigationProp<RootStackParamList, 'ExportMap'>;

export type WeightedLatLng = {
  latitude: number;
  longitude: number;
  weight: number;
}

export const ExportMap = () => {
  const auth = useAuth();

  const navigation = useNavigation<exportMapProp>();

  const [weightedLatLngArrayHeatmap, setWeightedLatLngArrayHeatmap] = useState<WeightedLatLng[]>([]);
  const [weightedLatLngArrayMarker, setWeightedLatLngArrayMarker] = useState<WeightedLatLng[]>([]);
  const [latitudeDelta, setLatitudeDelta] = useState(0.005);
  const [longitudeDelta, setLongitudeDelta] = useState(0.005);
  const [heatmapRadius, setHeatmapRadius] = useState(50);

  const [zoom, setZoom] = useState<number>(14);

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
      updateMarkerWeightedArray();
    }
  }, [markerCoordinates]);

  // when the heatmap data updates, update the weighted array used for the heatmap
  useEffect(() => {
    updateHeatmapWeightedArray();
  }, [auth.heatmapData])

  useEffect(() => {
    updateMarkerWeightedArray();
  }, [auth.markerData])

  useEffect(() => {
    updateHeatmapWeightedArray();
    updateMarkerWeightedArray();
  }, [])

  useEffect(() => {
      setRegion({
        latitude: auth.viewLocationData.lat,
        longitude: auth.viewLocationData.long,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      });

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
        { text: "Save",
        onPress: () => saveLocation() }
      ]
    );
  }

  const mapMarkers = () => {
    if (auth.markerData) {
      return auth.markerData.map((item) =>
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
            <Text style={styles.calloutTitle}>Click here to see more information...<Ionicons name="chevron-forward"/></Text>
            <Text style={styles.calloutDescription}>Average for {item.areaCode}: {'\u00A3'}{item.average.toLocaleString()}</Text>
          </View>
        </Callout>
      </Marker >
    )
    }
  }

  const handleMarkerPress = (event: MapEvent, postcode: string) => {
    // set the current postcode state in the app context
    auth.setCurrentPostcodeDetailWrapper(postcode);
    // stop onPress event from propagating to mapView
    event.stopPropagation();
 }

  const saveLocation = async () => {
    console.log("Saving Location!")
    if (auth.viewLocationData) {
      auth.saveLocation(auth.viewLocationData.lat, auth.viewLocationData.long);
    }

    navigation.navigate("Saved Locations");
  }

  const updateMarkerWeightedArray = async () => {
    if (auth.markerData) {
      var tmpArray = new Array<WeightedLatLng>();

      for (let i = 0; i < auth.markerData.length; i++) {

        if (auth.markerData[i].average > 0) {

          // create new WeightedLatLng object
          const newEntry = {
            latitude: auth.markerData[i].latitude,
            longitude: auth.markerData[i].longitude,
            weight: auth.markerData[i].average
          }

          // add the entry to our temp array
          tmpArray.push(newEntry)
        }
      } // end for loop
      // set weighted array state
      setWeightedLatLngArrayMarker(tmpArray);
    }
  }

  const updateHeatmapWeightedArray = async () => {
    if (auth.heatmapData) {
      var tmpArray = new Array<WeightedLatLng>();

      for (let i = 0; i < auth.heatmapData.length; i++) {

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
      setWeightedLatLngArrayHeatmap(tmpArray);
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

  if (auth.markerData && auth.userLocationData) {
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
            let zoom = Math.log(360 / region.longitudeDelta) / Math.LN2
            setZoom(zoom);
            // console.log(zoom);
            // console.log(region.latitude, region.longitude);
            // if (markerRef && markerRef.current && markerRef.current.showCallout) {
            //   markerRef.current.showCallout();
            // }
          }}
        >
          
          {isEnabled && mapMarkers()}

          {(zoom > 12)? <Heatmap
              key={heatmapRadius}
              points={weightedLatLngArrayMarker}
              radius={heatmapRadius}
              opacity={0.7}
              gradient={gradientObject
              }
            />
          :
          <Heatmap
              key={heatmapRadius}
              points={weightedLatLngArrayHeatmap}
              radius={heatmapRadius}
              opacity={0.7}
              gradient={gradientObject
              }
            />
          }
      
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
          <Text style={styles.switchText}>Markers</Text>
          <Switch
              trackColor={{ false: colors.midDarkColor, true: colors.midDarkColor }}
              thumbColor={isEnabled ? colors.highlightColor : colors.lightestColor}
              ios_backgroundColor={colors.midDarkColor}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
        </View>

        {/* <View style={styles.heatmapControlView}>
          <TouchableOpacity onPress={() => setHeatmapRadius(heatmapRadius < 50 ? heatmapRadius + 5 : heatmapRadius)}>
            <Ionicons name="add-circle-outline" style={styles.heatmapControlIcons} size={60}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setHeatmapRadius(heatmapRadius > 5 ? heatmapRadius - 5 : heatmapRadius)}>
            <Ionicons name="remove-circle-outline" style={styles.heatmapControlIcons} size={60}/>
          </TouchableOpacity>
        </View> */}
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