import Ionicons from '@expo/vector-icons/build/Ionicons';
import React, {useState} from 'react';
import {ActivityIndicator, TouchableOpacity, Text, View, TextInput, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { Divider } from 'react-native-elements';
import {styles, colors} from "../../stylesheet";
import {useAuth} from '../contexts/Auth';

const SignUpScreen = () => {
  const auth = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordMarco, setPasswordMarco] = useState("");
  const [passwordPolo, setPasswordPolo] = useState("");

  const [isLocked, setLock] = useState(false);

  function isValidEmail (email: string) {
    return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
  }

  async function signUp(firstName: string, lastName: string, email: string, password: string) {
    if (firstName.length <= 0) {
      alert("Your first name is required.");
      return;
    } else if (lastName.length <= 0) {
      alert("Your last name is required.");
      return;
    } else if (!isValidEmail(email)) {
      alert("Invalid email address.");
      return;
    } else if (password.length < 4) {
      alert("Password too short (minimum of 4).");
      return;
    } else if (password !== passwordPolo) {
      alert("Password confirmation is mismatched.");
      return;
    }

    setLock(true);

    auth.signUp(firstName, lastName, email, password).catch(() => setLock(false));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.backgroundContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Enter your details below.</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setFirstName}
          value={firstName}
          placeholder="First Name"
          clearButtonMode='while-editing'
          keyboardType="default"
          textContentType='givenName'
          placeholderTextColor={colors.midLightColor}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setLastName}
          value={lastName}
          placeholder="Last Name"
          clearButtonMode='while-editing'
          keyboardType="default"
          textContentType='givenName'
          placeholderTextColor={colors.midLightColor}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          clearButtonMode='while-editing'
          keyboardType="email-address"
          textContentType='username'
          autoCapitalize='none'
          placeholderTextColor={colors.midLightColor}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setPasswordMarco}
          value={passwordMarco}
          placeholder="Password"
          autoCorrect={false}
          clearButtonMode='while-editing'
          secureTextEntry={true}
          textContentType='password'
          placeholderTextColor={colors.midLightColor}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setPasswordPolo}
          value={passwordPolo}
          placeholder="Password Confirmation"
          autoCorrect={false}
          clearButtonMode='while-editing'
          secureTextEntry={true}
          textContentType='password'
          placeholderTextColor={colors.midLightColor}
        />
        <View style={styles.space}/>
        <Divider/>
        <View style={styles.space}/>
        <TouchableOpacity
          style={styles.appButtonContainer}
          disabled={isLocked}
          onPress={() => signUp(firstName, lastName, email, passwordMarco)}
        >
          <Text style={styles.appButtonText}>
            <Ionicons name="create-outline" color={colors.lightestColor} size={18}/>
            {" "}Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;