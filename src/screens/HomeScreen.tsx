import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { Text, View, TouchableOpacity } from "react-native";
import {RootStackParamList} from './RootStackParams';
import styles from "../../stylesheet";
import {useAuth} from '../contexts/Auth';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<homeScreenProp>();
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
    const signOut = async () => {
        isLoading(true);
        await auth.signOut();
    };
  
  return (
    <View style={styles.backgroundContainer}>
      <TouchableOpacity
        style={styles.alreadyHaveAccountContainer}
        onPress={() => signOut()}
      >
      <Text style={styles.alreadyHaveAccountText}>Sign out</Text>
      </TouchableOpacity>


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