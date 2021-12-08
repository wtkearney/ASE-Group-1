import React, {useState} from 'react';
import {Text, View, TouchableOpacity, FlatList, Alert} from "react-native";
import {styles} from "../../stylesheet";
import {useAuth} from '../contexts/Auth';
import Dialog from "react-native-dialog";

const AccountScreen = () => {
  const auth = useAuth();

  const [deleteAccountIsLocked, setDeleteAccountIsLocked] = useState(false);

  const [verifyPassVisible, setVerifyPassVisible] = useState(false);

  const [_password, onChangePassword] = useState("");

  const handleVerifyCancel = () => {
    onChangePassword("");
    // this will make the dialog disappear
    setVerifyPassVisible(false);
  };

  const handleAccountDeleteUnlock = async () => {
    // The user has pressed the "Verify" button
    // we will now check if the password is correct, and if so unlock the button

    if (auth.authData) {
      let authData = await auth.verifyPassword(auth.authData?.userEmail, _password)

      if (authData) {

        console.log("Password is correct");
        // unlock the delete account button
        setDeleteAccountIsLocked(true);
      } else {
        console.log("Password is NOT correct");
      }
    }

    onChangePassword("");
    // hide the dialog
    setVerifyPassVisible(false);
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes, delete my account",
        onPress: () => deleteAccount() }
      ]
    );
  }

  const unlockAccountDelete = async () => {
    // this will make teh dialog visible
    setVerifyPassVisible(true);
  };

  const deleteAccount = async () => {
    if (auth.authData) {
      auth.deleteAccount(auth.authData?.userEmail)
    }
  };

  return (
    <View style={styles.backgroundContainer}>
      <Dialog.Container visible={verifyPassVisible}>
        <Dialog.Title>Please verify your password</Dialog.Title>
        <Dialog.Input
          value={_password}
          onChangeText={onChangePassword}
          placeholder="Password"
          autoCorrect={false}
          clearButtonMode='while-editing'
          secureTextEntry={true}
          textContentType='password'
          // placeholderTextColor={colors.midLightColor}
          />
        <Dialog.Button label="Verify" onPress={handleAccountDeleteUnlock} />
        <Dialog.Button label="Cancel" onPress={handleVerifyCancel} />
      </Dialog.Container>

      <FlatList
        scrollEnabled={false}
        ListFooterComponent=
          {deleteAccountIsLocked ?
          <View>
            <View style={styles.space}/>
          <TouchableOpacity
                style={styles.appButtonContainerDanger}
                onPress={() => confirmDeleteAccount()}
              >
                
                <Text style={styles.appButtonText}>Delete Account</Text>
          </TouchableOpacity>
          </View>
          :
          <View>
            <View style={styles.space}/>
          <TouchableOpacity
                style={styles.appButtonContainer}
                onPress={() => unlockAccountDelete()}
              >
                <Text style={styles.appButtonText}>Unlock delete account</Text>
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