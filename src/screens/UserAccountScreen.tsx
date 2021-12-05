import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { Text, View, TouchableOpacity } from "react-native";
import {RootStackParamList} from './RootStackParams';
import styles from "../../stylesheet";

type userAccountScreenProp = StackNavigationProp<RootStackParamList, 'User Account'>;

const UserAccountScreen = () => {
  const navigation = useNavigation<userAccountScreenProp>();
  
//   const [loading, isLoading] = useState(false);
  
    return (

             <View><Text>User account screen</Text></View>
       
    );
};

export default UserAccountScreen;