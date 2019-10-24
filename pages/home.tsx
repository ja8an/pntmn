import React, { Component } from "react";
import { View, Text, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView, Platform, AsyncStorage } from "react-native";

import styles from "../shared/settings";

import firebase, { firebaseRef } from '../shared/firebase';
import Notifier from "../shared/notifications";
import QuestionFormScreen from "./question-form";



interface Props {
    navigation: any
}


export default class HomeScreen extends Component<Props> {

    state = {
        text: ''
    }

    async _logout() {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }

    componentDidMount() {

        Notifier.registerForPushNotificationsAsync();
        
    }

    openModal() {
        this.props.navigation.navigate('Questions');
    }

    render() {
        return (
            <View style={styles.centerView}>
                <Button title="PNTMN" onPress={() => { this.openModal(); }}></Button>
            </View>
        );
    }
}