import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

function FindingLoadingScreen({props}) {

    const { socket } = useSocket();

    socket.on('request-accepted', data => {
        console.log("Ride accepted");
    });

    socket.on('request-cancelled', data => {
        console.log("Ride declined. Please try again.");
    });

    return (
        <View style={styles.container}>
            <LottieView style={styles.animation}
                autoPlay
                source={require('../assets/animations/loading.json')} 
                loop={true}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    animation: {
        flex: 1,
    },
    container: {
        flex: 1,
    }
})


export default FindingLoadingScreen;