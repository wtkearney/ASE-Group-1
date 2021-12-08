import React, {useRef, useEffect} from 'react';
import {Animated, View, Text} from 'react-native';
import {Loading} from '../components/Loading';
import {Ionicons} from '@expo/vector-icons';
import {styles, colors} from "../../stylesheet";

const SplashScreen = () => {
  const fadeOpacityMinimum = 0.2;
  const fadeOpacityMaximum = 1.0;
  const fadeOpacityDuration = 2000;
  const fadeOpacity = useRef(new Animated.Value(fadeOpacityMinimum)).current;

  useEffect(() => fadeIn(), []);

  const fadeIn = () => {
    Animated.timing(fadeOpacity, {
      toValue: fadeOpacityMaximum,
      duration: fadeOpacityDuration,
      useNativeDriver: false,
    }).start(fadeOut);
  };

  const fadeOut = () => {
    Animated.timing(fadeOpacity, {
      toValue: fadeOpacityMinimum,
      duration: fadeOpacityDuration,
      useNativeDriver: false
    }).start(fadeIn);
  };

  return (
    <View style={[styles.backgroundContainer, {alignItems: 'center', justifyContent: 'center'}]}>
      <Animated.View
        style={[styles.fadingContainer, {opacity: fadeOpacity}]}>
        <Ionicons name="map" color={colors.midLightColor} size={200}/>
      </Animated.View>
      <View style={styles.space}/>
      <Loading/>
      <View style={styles.space}/>
      <Text style={styles.copyrightNotice}>Contains HM Land Registry data © Crown copyright and database right 2021. This data is licensed under the Open Government Licence v3.0.</Text>
    </View>
  );
};

export default SplashScreen;