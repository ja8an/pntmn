import React, { Component } from "react";
import { View, Text, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, Keyboard, TextInput, Button } from "react-native";
import styles from "../shared/settings";

import { firebaseAuth, firebaseRef } from '../shared/firebase';

interface Props {
    navigation: any
}

export default class CreateAccountScreen extends Component<Props> {

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    _createAccount() {
        if (!this.valid())
            return;
        firebaseAuth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(response => {
                const user = {
                    uid: response.user.uid,
                    lat: null,
                    lng: null,
                    lastUpdate: null
                };
                firebaseRef.child('users').push(user);
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    valid() {
        if (!(this.state.name || this.state.email || this.state.password))
            return false;
        if (this.state.password.length < 6 || this.state.password != this.state.confirmPassword)
            return false;
        return true;
    }

    componentDidMount() {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigator.navigate('Auth');
            }
        });
    }

    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
                <SafeAreaView style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inner}>
                            <Text style={styles.header}>Nova conta</Text>

                            <TextInput
                                placeholder="Nome"
                                onChangeText={name => this.setState({ name })}
                                style={[styles.input, styles.fillWidth]}
                                autoCompleteType="name"
                                autoCapitalize="words"
                                textContentType="name" />
                            <TextInput
                                placeholder="E-mail"
                                onChangeText={email => this.setState({ email })}
                                style={[styles.input, styles.fillWidth]}
                                autoCapitalize="none"
                                autoCompleteType="email"
                                textContentType="emailAddress"
                                keyboardType="email-address" />
                            <TextInput
                                placeholder="Senha"
                                secureTextEntry={true}
                                onChangeText={password => this.setState({ password })}
                                style={[styles.input, styles.fillWidth]}
                                autoCompleteType="password"
                                textContentType="password" />
                            <TextInput
                                placeholder="Confirme a senha"
                                secureTextEntry={true}
                                onChangeText={confirmPassword => this.setState({ confirmPassword })}
                                style={[styles.input, styles.fillWidth]}
                                autoCompleteType="password"
                                textContentType="newPassword" />

                            <Button title="Criar conta" onPress={() => this._createAccount()}></Button>

                            <View style={{ flex: 1 }} />

                        </View>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}