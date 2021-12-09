import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {colors} from "../../stylesheet";

export const Loading = () => {
  return (
    <View style={{justifyContent: "center"}}>
      <ActivityIndicator color={colors.midLightColor} animating={true} size="small"/>
    </View>
  );
};