import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import LottieView from 'lottie-react-native';

import Screen from './../components/Screen';
import AppText from './../components/AppText';
import colors from '../config/colors';
import useRide from './../ride/useRide';

function FindingLoadingScreen({props, route, navigation}) {

    const { _id } = route.params;

    console.log(_id);

    const { socket } = useSocket();

    const { storeTheRide } = useRide();

    socket.on('request-accepted', data => {
        console.log("Ride accepted");
        console.log("The id of the accepted ride is: "+data._id);
        storeTheRide(data._id);
    });

    socket.on('no-tractor-found', data => {
        console.log("No tractor found. Please try again.");
    });

    const handleCancelPress = () => {
        socket.emit('request-cancelled-before-confirm', {_id});
        console.log("Request Cancelled");
        navigation.goBack();
    };

    return (
        <Screen style={styles.container}>
            <LottieView style={styles.animation}
                autoPlay
                source={require('../assets/animations/loading.json')} 
                loop={true}
            />
            <AppText style={styles.slogon}>Finding your companion</AppText>
            <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={handleCancelPress}>
                <AppText style={styles.buttonText}>Cancel</AppText>
            </TouchableOpacity>
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
        backgroundColor: colors.danger,
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    buttonText: {
      color: colors.white,  
      fontWeight: 'bold',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slogon: {

    },
})


export default FindingLoadingScreen;