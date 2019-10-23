import React, { Component } from "react";
import { View, Text, TextInput, Button, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, Keyboard, AsyncStorage } from "react-native";
import styles from "../shared/settings";
import firebase, { firebaseAuth } from '../shared/firebase';

interface Props {
    navigation: any
}

export default class LoginScreen extends Component<Props> {

    state = {
        username: '',
        password: ''
    }

    provider;

    async _login() {
        const login = await firebaseAuth.signInWithEmailAndPassword(this.state.username, this.state.password);
        const token = await login.user.getIdToken();
        await AsyncStorage.setItem('userToken', token);
        this.props.navigation.navigate('App');
    }

    valid(){
        return (this.state.username && this.state.password && this.state.password.length >= 6);
    }

    componentDidMount() {

    }

    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
                <SafeAreaView style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inner}>
                            <Text style={styles.header}>Autenticação</Text>
                            <TextInput
                                placeholder="E-mail"
                                onChangeText={username => this.setState({ username })}
                                style={[styles.input, styles.fillWidth]}></TextInput>
                            <TextInput
                                placeholder="Password"
                                onChangeText={password => this.setState({ password })}
                                style={[styles.input, styles.fillWidth]}></TextInput>
                            <Button title="Entrar" onPress={() => this._login()} disabled={!this.valid()}/>
                            <View style={{ flex: 1 }} />
                        </View>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}