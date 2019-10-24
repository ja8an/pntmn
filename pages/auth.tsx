import React, { Component } from "react";
import { View, Text, AsyncStorage, ActivityIndicator, StatusBar } from "react-native";
import firebase, { firebaseAuth } from '../shared/firebase';

interface Props {
    navigation: any
}

export default class AuthScreen extends Component<Props> {

    componentDidMount() {
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        this.props.navigation.navigate(firebaseAuth.currentUser ? 'App' : 'Auth');
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