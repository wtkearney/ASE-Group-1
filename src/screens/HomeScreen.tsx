import React from "react";
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { Text, View, TouchableOpacity } from "react-native";
import {RootStackParamList} from './RootStackParams';
import styles from "../../stylesheet";

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<homeScreenProp>();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home screen</Text>
      <View style={styles.space}/>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => navigation.navigate("Geolocation")}
        >
          <Text style={styles.appButtonText}>Go to geolocation demo</Text>
        </TouchableOpacity>

  </View>
  );
};

export default HomeScreen;