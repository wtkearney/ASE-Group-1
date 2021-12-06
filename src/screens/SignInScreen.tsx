import React, {useState} from 'react';
import {ActivityIndicator, TouchableOpacity, Text, View, TextInput, Keyboard, TouchableWithoutFeedback} from 'react-native';
// import {RootStackParamList} from './RootStackParams';
// import {useNavigation} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';

import {styles, colors} from "../../stylesheet";
import {useAuth} from '../contexts/Auth';

//type signInScreenProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

const SignInScreen = () => {
    //const navigation = useNavigation<signInScreenProp>();
    const [loading, isLoading] = useState(false);
    const auth = useAuth();
    const signIn = async (email: string, password: string) => {

        isLoading(true);

        auth.signIn(email, password)
            .then((response) => {
                // console.log("Sign up successful")
            }).catch((error) => {
                isLoading(false);
            });
    };
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.backgroundContainer}>
                <Text style={styles.title}>Log in</Text>
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
                {loading ? (
                    <ActivityIndicator color={colors.midLightColor} animating={true} size="small" />
                ) : (
                    <TouchableOpacity
                        style={styles.appButtonContainer}
                        onPress={() => signIn(email, password)}
                    >
                        <Text style={styles.appButtonText}>Log in</Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableWithoutFeedback>
  );
};

export default SignInScreen;