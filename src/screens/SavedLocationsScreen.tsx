import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { Text, View, TouchableOpacity } from "react-native";
import {RootStackParamList} from './RootStackParams';
import styles from "../../stylesheet";
import {useAuth} from '../contexts/Auth';
import * as Location from 'expo-location';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'SavedLocations'>;

const SavedLocationsScreen = () => {
  const navigation = useNavigation<homeScreenProp>();
  const [loading, isLoading] = useState(false);
  const auth = useAuth();

  const signOut = async () => {
      isLoading(true);
      auth.signOut();
  };

  return (
    <View style={styles.backgroundContainer}>
      <Text style={styles.alreadyHaveAccountText}>Welcome, {auth.authData?.firstName}!</Text>


      <Text style={styles.title}>Home screen</Text>
      <View style={styles.space}/>
      <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => navigation.navigate("Map")}
        >
          <Text style={styles.appButtonText}>Go to map</Text>
        </TouchableOpacity>
        <View style={styles.space}/>

  </View>
  );
};

export default SavedLocationsScreen;