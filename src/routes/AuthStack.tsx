import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {RootStackParamList} from '../screens/RootStackParams';
import { TouchableOpacity, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import {styles, colors} from "../../stylesheet";

const Stack = createStackNavigator<RootStackParamList>();

export const AuthStack = () => {
  // console.log("Auth Stack");
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
      <StatusBar style="light" />
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={
          ({ navigation }) => ({
            headerTitle: (props) => null, // replace the title with nothing
            headerStyle: {
              backgroundColor: colors.darkestColor,
            },
            // headerTitleStyle: {
            //   color: "#22223b", // ivory
            // },
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerTouchableContainer}
                onPress={() => navigation.navigate('SignUp')}>
                {/* <Text style={styles.headerQuietText}>First time user?</Text>
                <Text style={styles.headerLoudText}>Create an account</Text> */}

                <Text style={styles.headerQuietText}>
                  New user?<Text>{" "}</Text>
                  <Text style={styles.headerLoudText}>Create an account</Text>
                </Text>


              </TouchableOpacity>
            )
          })
        }
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={
          ({ navigation }) => ({
            headerTitle: (props) => null, // replace the title with nothing
            headerStyle: {
              backgroundColor: colors.darkestColor,
            },
            headerTitleStyle: {
              color: "#22223b", // ivory
            },

            headerLeft: () => (
              <TouchableOpacity
                style={styles.headerTouchableContainer}
                onPress={() => navigation.navigate('SignIn')}>
                {/* <Text style={styles.headerQuietText}>First time user?</Text>
                <Text style={styles.headerLoudText}>Create an account</Text> */}

                {/* <Text style={styles.headerQuietText}>Sign in</Text> */}

                <Ionicons name="chevron-back" color={colors.lightestColor} size={30} />


              </TouchableOpacity>
            )
          })
        }
      /> 
      
    </Stack.Navigator>
    </SafeAreaView>
    
  );
};