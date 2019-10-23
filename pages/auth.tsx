import React, { Component } from "react";
import { View, Text, AsyncStorage, ActivityIndicator, StatusBar } from "react-native";

interface Props {
    navigation: any
}

export default class AuthScreen extends Component<Props> {

    componentDidMount() {
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}