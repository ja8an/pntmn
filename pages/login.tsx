import React, { Component, useReducer } from "react";
import { Button, View, Text, TextInput, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, Keyboard, AsyncStorage, ActivityIndicator } from "react-native";
import styles from "../shared/styles";
import firebase, { firebaseAuth, firebaseRef } from '../shared/services/firebase';
import * as U from '../shared/entities/user';

interface Props {
    navigation: any
}

export default class LoginScreen extends Component<Props> {

    state = {
        username: '',
        password: '',
        loading: false
    }

    provider;

    _login() {
        this.setState({ loading: true });
        firebaseAuth.signInWithEmailAndPassword(this.state.username, this.state.password);
    }

    _createAccount() {
        this.props.navigation.navigate('NewAccount');
    }

    valid() {
        return (this.state.username && this.state.password && this.state.password.length >= 6);
    }

    componentDidMount() {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('App');
            }
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.centerView}>
                    <ActivityIndicator color="#cc1e00" size="large" />
                </View>
            );
        }
        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={[{ flex: 1 }]}>
                <SafeAreaView style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={[styles.inner, styles.redBackground]}>
                            <Text style={[styles.header, styles.whiteText]}>Autenticação</Text>

                            <TextInput
                                placeholder="E-mail"
                                autoCapitalize="none"
                                autoFocus={true}
                                autoCompleteType="email"
                                keyboardType="email-address"
                                onChangeText={username => this.setState({ username })}
                                style={[styles.input, styles.fillWidth]} />

                            <TextInput
                                placeholder="Password"
                                autoCompleteType="password"
                                autoCapitalize="none"
                                secureTextEntry={true}
                                selectTextOnFocus={true}
                                onChangeText={password => this.setState({ password })}
                                style={[styles.input, styles.fillWidth]} />

                            <Button title="Entrar" color="#FFFFFF" onPress={() => this._login()} disabled={!this.valid()} />
                            <Button title="Criar conta" color="#FFFFFF" onPress={() => this._createAccount()} />

                            <View style={{ flex: 1 }} />
                        </View>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}