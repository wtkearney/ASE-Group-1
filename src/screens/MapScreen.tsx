import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { Text, View, TouchableOpacity } from "react-native";
import {RootStackParamList} from './RootStackParams';
import {styles, colors} from "../../stylesheet";

import {ExportMap} from "../components/ExportMap";

type mapScreenProp = StackNavigationProp<RootStackParamList, 'Map'>;

const MapScreen = () => {
  const navigation = useNavigation<mapScreenProp>();
  
//   const [loading, isLoading] = useState(false);
  
    return (

             <ExportMap/>
       
    );
};

export default MapScreen;