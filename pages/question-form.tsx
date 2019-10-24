import React, { Component } from "react";
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, View, TextInput, Text, Button } from "react-native";
import { SafeAreaView } from "react-navigation";
import styles from "../shared/settings";
import firebase, { firebaseRef } from '../shared/firebase';
import { Geolocation } from "../shared/geolocation";

interface Props {
    navigation?: any,
    visible?: boolean
}

export default class QuestionFormScreen extends Component<Props> {

    state = {
        text: ''
    };

    valid() {
        return !!(this.state.text);
    }

    async _sendQuestion() {

        const loc = await Geolocation._getLocationAsync();

        const response = await firebaseRef.child('/questions').push({
            question: this.state.text,
            answers: [],
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
        });
        this.setState({ text: '' });
        this.props.navigation.navigate('Answers', {
            qId: response.key
        });
    }

    render() {
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