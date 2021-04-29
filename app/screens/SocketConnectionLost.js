import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import Screen from './../components/Screen';
import AppText from '../components/AppText';
import colors from '../config/colors';

function SocketConnectionLost(props) {

    return (
        <Screen style={styles.container}>
            <LottieView 
                loop
                autoPlay
                style={styles.animation}
                source={require('../assets/animations/loading.json')} 
            />
            <AppText style={styles.connectingText}>Connecting you to our community</AppText>
        </Screen>
    );
}


const styles = StyleSheet.create({
    animation: {
        width: '100%',
    },
    button: {
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: colors.accept,
        paddingVertical: 5,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    buttonText: {
        color: colors.white
    },
    connectingText: {
        alignSelf: 'center',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})


export default SocketConnectionLost;