import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '100%'
    },
    header: {
        fontSize: 32,
        padding: 15
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "flex-end",
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        backgroundColor: '#ECECEC',
        padding: 15,
        paddingTop: 15,
        borderRadius: 30,
        margin: 10
    },
    fillHeight: {
        flex: 1
    },
    fillWidth: {
        minWidth: '100%'
    }
});

export default styles;