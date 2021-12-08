import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import {RootStackParamList} from './RootStackParams';
import {styles, colors} from "../../stylesheet";
import {useAuth} from '../contexts/Auth';
import {Loading} from '../components/Loading';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Saved Locations'>;

const SavedLocationsScreen = () => {
  const navigation = useNavigation<homeScreenProp>();
  const [loading, isLoading] = useState(false);
  const auth = useAuth();

  const loadSavedLocation = async (lat: number, long: number) => {
    auth.setViewLocationDataWrapper(lat, long);
    navigation.navigate("Map");
  };

  if (!loading && auth.viewLocationData) {
    return (

      <View style={styles.backgroundContainer}>
      <Text style={styles.title}>Welcome, {auth.authData?.firstName}!</Text>
      <Text style={styles.subtitle}>The list below is all the locations you have previously saved. Press a location to view it on the map.</Text>
  
      <FlatList
          data={auth.savedLocations}
          // renderItem={renderItem}
          renderItem={({ item }) => (
              <View style={styles.flatListView}>
                  <TouchableOpacity onPress={() => loadSavedLocation(item.lat, item.long)} style={{}}>
                  <Text style={styles.flatListTitle}>{item.creationDate.toLocaleDateString(
                        'en-gb', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'}) } at {item.creationDate.toLocaleTimeString(
                            'en-gb', { hour: '2-digit', minute: '2-digit' }) }
                      </Text>
                      {/* <Text style={styles.flatListTitle}>{item.creationDate}
                      </Text> */}
                      <Text style={styles.flatListValue}>Latitude: {item.lat}</Text>
                      <Text style={styles.flatListValue}>Longitude: {item.long}</Text>
                  </TouchableOpacity>
                  </View>
              )}
              keyExtractor={(item) => item.creationDate.toString()}
      />
      </View>
    )

    } else  {
      return(
        <View style={styles.container}>
        <Loading/>
      </View>
      )
    }
};

export default SavedLocationsScreen;