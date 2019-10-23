import React, { Component } from "react";
import { View, Text, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView, Platform, AsyncStorage } from "react-native";

import styles from "../shared/settings";

import firebase, { firebaseRef } from '../shared/firebase';
import Notifier from "../shared/notifications";

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

    async _sendQuestion() {
        const response = await firebaseRef.child('/questions').push({
            question: this.state.text
        });
        this.setState({ text: '' });
        this.props.navigation.navigate('Answers', {
            qId: response.key
        });
    }

    valid() {
        return !!(this.state.text);
    }

    componentDidMount() {
        Notifier.registerForPushNotificationsAsync();
    }

    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
                <SafeAreaView style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inner}>
                            <Text >O que você precisa?</Text>
                            <TextInput
                                style={[styles.input, styles.fillHeight, styles.fillWidth]}
                                onChangeText={text => this.setState({ text })}
                                value={this.state.text}
                                autoFocus={true}
                                placeholder="O que você precisa?"
                                multiline>
                            </TextInput>
                            <Button title="Enviar" onPress={() => this._sendQuestion()}
                                disabled={!this.valid()}></Button>
                            <View style={{ flex: 1 }} />
                        </View>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}