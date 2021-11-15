import React, {useState} from 'react';
import {ActivityIndicator, TouchableOpacity, Text, View, TextInput, Keyboard, TouchableWithoutFeedback} from 'react-native';
// import {RootStackParamList} from './RootStackParams';
// import {useNavigation} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';

import styles from "../../stylesheet";
import {useAuth} from '../contexts/Auth';

//type signInScreenProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

const SignInScreen = () => {
    //const navigation = useNavigation<signInScreenProp>();
    const [loading, isLoading] = useState(false);
    const auth = useAuth();
    const signIn = async (email: string, password: string) => {
        isLoading(true);
        await auth.signIn(email, password);
    };
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.backgroundContainer}>
                <Text style={styles.title}>Sign In Screen</Text>
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
                        onPress={() => signIn(email, password)}
                    >
                        <Text style={styles.appButtonText}>Sign In</Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableWithoutFeedback>
  );
};

export default SignInScreen;