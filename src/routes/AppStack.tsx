import React from 'react';
import SavedLocationsScreen from "../screens/SavedLocationsScreen";
import MapScreen from "../screens/MapScreen";
import AccountScreen from "../screens/AccountScreen";
import PriceDetailsScreen from "../screens/PriceDetailsScreen";
import {RootStackParamList} from '../screens/RootStackParams';
import {TouchableOpacity, Text} from "react-native";
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../contexts/Auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {Ionicons} from '@expo/vector-icons';
import {styles, colors} from "../../stylesheet";
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNav = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveBackgroundColor: colors.darkestColor,
      tabBarInactiveBackgroundColor: colors.darkestColor,
      tabBarActiveTintColor: colors.highlightColor,
      tabBarInactiveTintColor: colors.midLightColor,
      tabBarStyle: {borderTopColor: colors.midColor, backgroundColor: colors.darkestColor},
    }}>
      <Tab.Screen name="Map" component={MapScreen} options={{
        headerShown: false,
        tabBarIcon: ({color, size}) => (
          <Ionicons name="map-outline" color={color} size={size}/>
        )}}
      />
      <Tab.Screen name="Saved Locations" component={SavedLocationsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="location-outline" color={color} size={size}/>
          )}}
      />
    </Tab.Navigator>
  );
}

const StackNav = () => {
  const auth = useAuth();

  return (
    <SafeAreaView style={{flex: 1}} edges={['left', 'right']}>
      <StatusBar style="light"/>
      <Stack.Navigator screenOptions={{
          headerTitle: "",
          headerStyle: {
        },
      }}>
      <Stack.Screen
        name="TabNav"
        component={TabNav}
        options={
          ({ navigation }) => ({
            headerStyle: {
              backgroundColor: colors.darkestColor,
              shadowColor: colors.midColor, // iOS
              elevation: 0 // Android
            },
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerTouchableContainer}
                onPress={() => navigation.navigate('User Account')}>
                <Ionicons name="person-outline" size={30} color={colors.midLightColor} style={{marginRight: 15}} />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity
                style={styles.headerTouchableContainer}
                onPress={() => auth.signOut()}>
                <Ionicons name="chevron-back" color={colors.lightestColor} size={30} />
                <Text style={styles.headerLoudText}>Need a break?{"\n"}
                    <Text style={styles.headerQuietText}>Sign Out...</Text>
                  </Text>
                  
              </TouchableOpacity>
            ),
          })
        }
      />
      <Stack.Screen
        name="User Account"
        component={AccountScreen}
        options={
          ({navigation}) => ({
          headerShown: true,
          headerTitle: "Account Information",
          gestureEnabled: true,
          presentation: 'modal',
          headerTitleStyle: styles.headerStyle,
          headerStyle: {backgroundColor: colors.darkestColor,
          shadowColor: colors.midColor, // iOS
          elevation: 0 // Android
        },
         headerLeft: ()=> null,
         headerRight: () => (
           <TouchableOpacity
             style={{}}
              onPress={() => navigation.navigate("TabNav")}>
              <Ionicons name="close" size={30} color={colors.midLightColor} style={{marginRight: 15}} />
            </TouchableOpacity>
          )
        })
      }
    />
    <Stack.Screen
        name="Price Details"
        component={PriceDetailsScreen}
        options={
          ({navigation}) => ({
          headerShown: true,
          headerTitle: "Price Paid Data",
          gestureEnabled: true,
          presentation: 'modal',
          headerTitleStyle: styles.headerStyle,
          headerStyle: {backgroundColor: colors.darkestColor,
          shadowColor: colors.midColor, // iOS
          elevation: 0 // Android
        },
         headerLeft: ()=> null,
         headerRight: () => (
           <TouchableOpacity
             style={{}}
              onPress={() => navigation.navigate("TabNav")}>
              <Ionicons name="close" size={30} color={colors.midLightColor} style={{marginRight: 15}} />
            </TouchableOpacity>
          )
        })
      }
    />
    </Stack.Navigator>
    </SafeAreaView>
  )
};

export const AppStack = () => StackNav();