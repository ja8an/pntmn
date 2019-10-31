import React, { Component } from "react";
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, View, TextInput, Text, Button, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-navigation";
import styles from "../shared/styles";
import firebase, { firebaseRef, firebaseAuth } from '../shared/services/firebase';
import { Geolocation } from "../shared/services/geolocation";

interface Props {
    navigation?: any,
    visible?: boolean
}

export default class QuestionFormScreen extends Component<Props> {

    state = {
        text: '',
        loading: false
    };

    valid() {
        return !!(this.state.text);
    }

    async _sendQuestion() {

        this.setState({ loading: true });

        const loc = await Geolocation._getLocationAsync();

        const response = await firebaseRef.child('/questions').push({
            question: this.state.text,
            answers: [],
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
            uid: firebaseAuth.currentUser.uid,
            type: 'TEXT'
        });

        this.props.navigation.navigate('Answers', {
            qId: response.key
        });

        this.setState({ loading: false, text: '' });
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.centerView}>
                    <ActivityIndicator size='large'></ActivityIndicator>
                </View>
            );
        }
        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
                <SafeAreaView style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inner}>
                            <Text >O que você precisa?</Text>
                            <TextInput
                                style={[styles.input, styles.fillHeight, styles.fillWidth, { flex: 1 }]}
                                onChangeText={text => this.setState({ text })}
                                value={this.state.text}
                                autoFocus={true}
                                placeholder="O que você precisa?"
                                multiline>
                            </TextInput>
                            <Button title="Enviar" onPress={() => this._sendQuestion()}
                                disabled={!this.valid()}></Button>
                        </View>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}