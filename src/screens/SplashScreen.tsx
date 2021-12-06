import React from 'react';
import {View, Text} from 'react-native';
import {Loading} from '../components/Loading';

import {styles, colors} from "../../stylesheet";

const SplashScreen = () => {
  
    return (

      <View style={[styles.backgroundContainer, {alignItems: 'center', justifyContent: 'center',}]}>
        <Text style={styles.splashScreenTitle}>Welcome!</Text>
        <View style={styles.space}/>
        <Text style={styles.copyrightNotice}>Contains HM Land Registry data © Crown copyright and database right 2021.{"\n"}This data is licensed under the Open Government Licence v3.0.</Text>
      </View>
       
    );
};

export default SplashScreen;