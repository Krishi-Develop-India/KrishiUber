import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import Screen from './../components/Screen';

function SocketConnectionLost(props) {

    return (
        <Screen>
            <LottieView 
                loop
                autoPlay
                style={styles.animation}
                source={require('../assets/animations/loading.json')} 
            />
        </Screen>
    );
}


const styles = StyleSheet.create({
    container: {}
})


export default SocketConnectionLost;