import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { Text, View, TouchableOpacity } from "react-native";
import {RootStackParamList} from './RootStackParams';
import {styles, colors} from "../../stylesheet";
import {useAuth} from '../contexts/Auth';

type userAccountScreenProp = StackNavigationProp<RootStackParamList, 'User Account'>;

const UserAccountScreen = () => {
//   const navigation = useNavigation<userAccountScreenProp>();

  const auth = useAuth();
  
//   const [loading, isLoading] = useState(false);

    return (
        <View style={styles.backgroundContainer}>
            <Text style={styles.title}>{auth.authData?.firstName} {auth.authData?.lastName}</Text>
        </View>
    );
};

export default UserAccountScreen;