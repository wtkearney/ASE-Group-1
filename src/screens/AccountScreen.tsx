import React from 'react';
import {Text, View, TouchableOpacity, FlatList} from "react-native";
import {styles} from "../../stylesheet";
import {useAuth} from '../contexts/Auth';

const AccountScreen = () => {
  const auth = useAuth();

  return (
    <View style={styles.backgroundContainer}>
      <FlatList
        data={[
          {
            id: 1,
            title: "First Name",
            value: auth.authData?.firstName
          },
          {
            id: 2,
            title: "Last Name",
            value: auth.authData?.lastName
          },
          {
            id: 3,
            title: "Email",
            value: auth.authData?.userEmail
          },
        ]}
        renderItem={({item}) => (
          <View style={styles.flatListView}>
            <Text style={styles.flatListTitle}>{item.title}</Text>
            <Text style={styles.flatListValue}>{item.value}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default AccountScreen;