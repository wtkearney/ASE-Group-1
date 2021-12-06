import React, { useRef, useEffect} from 'react';
import {Animated, View, Text} from 'react-native';
import {Loading} from '../components/Loading';
import { Ionicons } from '@expo/vector-icons';

import {styles, colors} from "../../stylesheet";

const SplashScreen = () => {

  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    // Every time the App is opened, do this....
    fadeIn();
  }, []);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(fadeOut);
  };

  const fadeOut = () => {
      // Will change fadeAnim value to 0 in 3 seconds
      Animated.timing(fadeAnim, {
        toValue: 0.2,
        duration: 2000,
        useNativeDriver: false
      }).start(fadeIn);
  };
    
  
  return (

    <View style={[styles.backgroundContainer, {alignItems: 'center', justifyContent: 'center',}]}>
      
      <Animated.View
        style={[
          styles.fadingContainer,
            {
              // Bind opacity to animated value
              opacity: fadeAnim,
            },
          ]}>
        <Ionicons name="map-outline" color={colors.midLightColor} size={200} />
        {/* <Text style={styles.splashScreenTitle}>Welcome!</Text> */}
      </Animated.View>
      <Loading/>

    </View>

    
      

      
  );
};

export default SplashScreen;