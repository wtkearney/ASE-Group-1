import Ionicons from '@expo/vector-icons/build/Ionicons';
import React, {useState} from 'react';
import {TouchableOpacity, Text, View, TextInput, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Divider} from 'react-native-elements';
import {styles, colors} from "../../stylesheet";
import {useAuth} from '../contexts/Auth';

const SignInScreen = () => {
  const auth = useAuth();

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [isLocked, setLock] = useState(false);

  function signIn(email: string, password: string) {
    setLock(true);
    auth.signIn(email, password).catch(() => setLock(false));
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.backgroundContainer}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Enter your email and password below.</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeEmail}
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
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
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
          onPress={() => signIn(email, password)}
        >
          <Text style={styles.appButtonText}>
            <Ionicons name="log-in-outline" color={colors.lightestColor} size={18}/>
            {" "}Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;