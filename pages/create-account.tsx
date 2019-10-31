import React, { Component } from "react";
import { View, Text, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, Keyboard, TextInput, Button } from "react-native";
import styles from "../shared/styles";

import { firebaseAuth, firebaseRef } from '../shared/services/firebase';
import { Geolocation } from "../shared/services/geolocation";

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

    private _createAccount() {
        if (!this.valid())
            return;

        console.info(this.state);

        firebaseAuth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(async response => {
                const loc = await Geolocation._getLocationAsync();
                const user = {
                    uid: response.user.uid,
                    lat: loc.coords.latitude,
                    lng: loc.coords.longitude,
                    lastUpdate: loc.timestamp
                };
                firebaseRef.child('users').push(user);
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    private valid() {
        if (!(this.state.name || this.state.email || this.state.password))
            return false;
        if (this.state.password.length < 6 || this.state.password != this.state.confirmPassword)
            return false;
        return true;
    }

    componentDidMount() {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('Auth');
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
                                value={this.state.name}
                                textContentType="name" />
                            <TextInput
                                placeholder="E-mail"
                                onChangeText={email => this.setState({ email })}
                                style={[styles.input, styles.fillWidth]}
                                autoCapitalize="none"
                                value={this.state.email}
                                autoCompleteType="email"
                                textContentType="emailAddress"
                                keyboardType="email-address" />
                            <TextInput
                                placeholder="Senha"
                                secureTextEntry={true}
                                onChangeText={password => this.setState({ password })}
                                style={[styles.input, styles.fillWidth]}
                                value={this.state.password}
                                autoCompleteType="password"
                                textContentType="password" />
                            <TextInput
                                placeholder="Confirme a senha"
                                secureTextEntry={true}
                                onChangeText={confirmPassword => this.setState({ confirmPassword })}
                                value={this.state.confirmPassword}
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