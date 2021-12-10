import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, Alert } from "react-native";
import Dialog from "react-native-dialog";
import { Ionicons } from '@expo/vector-icons';
import { styles, colors } from "../../stylesheet";
import { useAuth } from '../contexts/Auth';

const AccountScreen = () => {
  const auth = useAuth();

  const [isVerified, setIsVerified] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [password, setPassword] = useState("");

  function handleVerifyCancel() {
    setPassword("");
    setShowVerification(false);
  };

  async function verifyPassword() {
    if (auth.authData) {
      if (await auth.verifyPassword(auth.authData?.userEmail, password)) {
        setIsVerified(true);
      }
    }

    setPassword("");
    setShowVerification(false);
  };

  function confirmDeleteAccount() {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => deleteAccount()
        }
      ]
    );
  }

  const deleteAccount = async () => {
    if (auth.authData) {
      auth.deleteAccount(auth.authData?.userEmail)
    }
  };

  return (
    <View style={styles.backgroundContainer}>
      <Dialog.Container visible={showVerification}>
        <Dialog.Title>Verify Password</Dialog.Title>
        <Dialog.Description>Enter your password below.</Dialog.Description>
        <Dialog.Input
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          autoCorrect={false}
          clearButtonMode='while-editing'
          secureTextEntry={true}
          textContentType='password'
        />
        <Dialog.Button label="Verify" onPress={verifyPassword}/>
        <Dialog.Button label="Cancel" onPress={handleVerifyCancel}/>
      </Dialog.Container>
      <FlatList
        scrollEnabled={false}
        ListFooterComponent={isVerified ?
          <View>
            <View style={styles.space}/>
            <TouchableOpacity
              style={styles.appButtonContainer}
              onPress={() => confirmDeleteAccount()}
            >
              <Text style={styles.appButtonText}>
                <Ionicons name="lock-open-outline" color={colors.lightestColor} size={18}/>
                {" "}Delete Account
              </Text>
            </TouchableOpacity>
          </View>
          :
          <View>
            <View style={styles.space}/>
            <TouchableOpacity
              style={styles.appButtonContainerDanger}
              onPress={() => setShowVerification(true)}
            >
              <Text style={styles.appButtonText}>
                <Ionicons name="lock-closed-outline" color={colors.lightestColor} size={18}/>
                {" "}Delete Account
              </Text>
              
            </TouchableOpacity>
          </View>
        }
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