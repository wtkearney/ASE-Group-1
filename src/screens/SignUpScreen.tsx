import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ActivityIndicator, TouchableOpacity, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import {RootStackParamList} from './RootStackParams';
import styles from "../../stylesheet";
import {useAuth} from '../contexts/Auth';

type signUpScreenProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUpScreen = () => {

    const navigation = useNavigation<signUpScreenProp>();

    const [loading, isLoading] = useState(false);
    const auth = useAuth();
    const signUp = async (firstName: string, lastName: string, email: string, password: string) => {
        isLoading(true);
        await auth.signUp(firstName, lastName, email, password);
    };
    const [firstName, onChangeFirstName] = React.useState("");
    const [lastName, onChangeLastName] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.backgroundContainer}>

                    <TouchableOpacity
                        style={styles.alreadyHaveAccountContainer}
                        onPress={() => navigation.navigate("SignIn")}
                    >
                        <Text style={styles.alreadyHaveAccountText}>Already have an account? Log In</Text>
                    </TouchableOpacity>

                    <Text style={styles.title}>Welcome to Geolocation</Text>
                    <Text style={styles.subtitle}>Create an account to access geolocation features.</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeFirstName}
                        value={firstName}
                        placeholder="First name"
                        clearButtonMode='while-editing'
                        keyboardType="default"
                        textContentType='givenName'
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeLastName}
                        value={lastName}
                        placeholder="Last name"
                        clearButtonMode='while-editing'
                        keyboardType="default"
                        textContentType='givenName'
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeEmail}
                        value={email}
                        placeholder="Email"
                        clearButtonMode='while-editing'
                        keyboardType="email-address"
                        textContentType='username'
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangePassword}
                        value={password}
                        placeholder="Password"
                        autoCorrect={false}
                        clearButtonMode='while-editing'
                        secureTextEntry={true}
                        textContentType='password'
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