import React from 'react';
import {View, Text} from 'react-native';
import {Loading} from '../components/Loading';

import {styles, colors} from "../../stylesheet";

const SplashScreen = () => {
  
    return (

      <View style={[styles.backgroundContainer, {alignItems: 'center', justifyContent: 'center',}]}>
        <Text style={styles.splashScreenTitle}>Welcome!</Text>
      </View>
       
    );
};

export default SplashScreen;