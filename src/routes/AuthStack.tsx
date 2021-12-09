import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {RootStackParamList} from '../screens/RootStackParams';
import {TouchableOpacity, Text} from "react-native";
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {styles, colors} from "../../stylesheet";

const Stack = createStackNavigator<RootStackParamList>();

export const AuthStack = () => {
  return (
    <SafeAreaView style={{flex: 1}} edges={['left', 'right']}>
      <StatusBar style="light"/>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={
            ({navigation}) => ({
              headerTitle: () => null,
              headerStyle: {backgroundColor: colors.darkestColor},
              headerRight: () => (
                <TouchableOpacity
                  style={styles.headerTouchableContainer}
                  onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.headerLoudText}>New around here?{"\n"}
                    <Text style={styles.headerQuietText}>Sign Up...</Text>
                  </Text>
                  <Ionicons name="chevron-forward" color={colors.lightestColor} size={30} />
                </TouchableOpacity>
              )
            })
          }
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={
            ({navigation}) => ({
              headerTitle: () => null,
              headerStyle: {backgroundColor: colors.darkestColor},
              headerTitleStyle: {color: colors.lightestColor},
              headerLeft: () => (
                <TouchableOpacity
                  style={styles.headerTouchableContainer}
                  onPress={() => navigation.navigate('SignIn')}>
                  <Ionicons name="chevron-back" color={colors.lightestColor} size={30}/>
                  <Text style={styles.headerLoudText}>Already signed up?{"\n"}
                    <Text style={styles.headerQuietText}>Sign In...</Text>
                  </Text>
                </TouchableOpacity>
              )
            })
          }
        /> 
      </Stack.Navigator>
    </SafeAreaView>
  );
};