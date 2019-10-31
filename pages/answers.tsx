import React, { Component } from "react";
import { View, Text, FlatList, ScrollView, ActivityIndicator, Button, Keyboard } from "react-native";
import { firebaseRef } from "../shared/services/firebase";
import styles from "../shared/styles";

interface Props {
    navigation?: any,
    visible?: boolean
}

export default class AnswersScreen extends Component<Props> {

    state = {
        answers: []
    }

    componentDidMount() {
        firebaseRef.child('questions/' + this.props.navigation.getParam('qId') + '/answers').on('child_added', answer => {
            console.log('answer', answer);
        });
        Keyboard.dismiss();
    }

    render() {
        if (!this.state.answers) {
            return (
                <View style={styles.centerView}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                </View>
            );
        }
        return (
            <View>
                <Text style={styles.header}>Respostas</Text>
                <ScrollView>
                    <FlatList data={this.state.answers} renderItem={({ item }) =>
                        <View style={styles.listItem}>
                            <Text>{item}</Text>
                        </View>
                    }></FlatList>
                </ScrollView>
                <Button title="Fechar" onPress={() => console.log} />
            </View>
        );
    }
}