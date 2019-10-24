import React, { Component } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { firebaseRef } from "../shared/firebase";

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
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <FlatList data={this.state.answers} renderItem={({ item }) =>
                        <Text>{item}</Text>
                    }></FlatList>
                </ScrollView>
            </View>
        );
    }
}