import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ActivityIndicator, TouchableOpacity, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import {RootStackParamList} from './RootStackParams';
import {styles, colors} from "../../stylesheet";
import {useAuth} from '../contexts/Auth';
import { AxiosError } from 'axios';

const SignUpScreen = () => {

    function emailIsValid (email: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const [loading, isLoading] = useState(false);
    const auth = useAuth();
    const signUp = async (firstName: string, lastName: string, email: string, password: string) => {
        
        // do some error checking
        if (firstName.length <= 0) {
            alert("Please enter a first name");
            return;
        } else if (lastName.length <= 0) {
            alert("Please enter a last name");
            return;
        } else if (!emailIsValid(email)) {
            alert("Please enter a valid email address");
            return;
        } else if (password.length < 4) {
            alert("Please enter a password of minimum length 4");
            return;
        } else if (password !== passwordConfirm) {
            alert("Password was entered incorrectly for confirmation");
            return;
        }

        isLoading(true);

        auth.signUp(firstName, lastName, email, password)
            .then((response) => {
                // console.log("Sign up successful")
            }).catch((error) => {
                isLoading(false);
            });
    };
    const [firstName, onChangeFirstName] = React.useState("");
    const [lastName, onChangeLastName] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [passwordConfirm, onChangePasswordConfirm] = React.useState("");

    return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.backgroundContainer}>

                    <Text style={styles.title}>Sign up</Text>
                    <Text style={styles.subtitle}>Create an account to access app features.</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={onChangeFirstName}
                        value={firstName}
                        placeholder="First name"
                        clearButtonMode='while-editing'
                        keyboardType="default"
                        textContentType='givenName'
                        placeholderTextColor={colors.midLightColor}
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={onChangeLastName}
                        value={lastName}
                        placeholder="Last name"
                        clearButtonMode='while-editing'
                        keyboardType="default"
                        textContentType='givenName'
                        placeholderTextColor={colors.midLightColor}
                    />
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
                    <TextInput
                        style={styles.textInput}
                        onChangeText={onChangePasswordConfirm}
                        value={passwordConfirm}
                        placeholder="Confirm Password"
                        autoCorrect={false}
                        clearButtonMode='while-editing'
                        secureTextEntry={true}
                        textContentType='password'
                        placeholderTextColor={colors.midLightColor}
                    />
                    <View style={styles.space}/>
                    {loading ? (
                        <ActivityIndicator color={'#000'} animating={true} size="small" />
                    ) : (
                        <TouchableOpacity
                            style={styles.appButtonContainer}
                            onPress={() => signUp(firstName, lastName, email, password)}
                        >
                            <Text style={styles.appButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;