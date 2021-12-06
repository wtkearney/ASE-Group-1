import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import {RootStackParamList} from './RootStackParams';
import {styles, colors} from "../../stylesheet";
import {useAuth} from '../contexts/Auth';
import {AuthData} from '../services/authService';

// type userAccountScreenProp = StackNavigationProp<RootStackParamList, 'User Account'>;

type accountListData = {
    id: number;
    title: string;
    value: string;
  }

const UserAccountScreen = () => {
//   const navigation = useNavigation<userAccountScreenProp>();

    const auth = useAuth();

    const data = [
        {
            id: 1,
            title: "First name",
            value: auth.authData?.firstName
        },
        {
            id: 2,
            title: "Last name",
            value: auth.authData?.lastName
        },
        {
            id: 3,
            title: "Email address",
            value: auth.authData?.userEmail
        },
    ];

    const renderItem = ({ item }: {item: accountListData}) => (
        <Item id={item.id} title={item.title} value={item.value} />
    );
  
    const Item = ({id, title, value} : accountListData) => (
        <View>
        <TouchableOpacity onPress={() => null} style={{}}>
            <Text style={styles.flatListTitle}>{title}</Text>
            <Text style={styles.flatListValue}>{value}</Text>
        </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.backgroundContainer}>

            <FlatList
                data={data}
                // renderItem={renderItem}
                renderItem={({ item }) => (
                    <View style={styles.flatListView}>
                        <TouchableOpacity onPress={() => null} style={{}}>
                            <Text style={styles.flatListTitle}>{item.title}</Text>
                            <Text style={styles.flatListValue}>{item.value}</Text>
                        </TouchableOpacity>
                        </View>
                    )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default UserAccountScreen;