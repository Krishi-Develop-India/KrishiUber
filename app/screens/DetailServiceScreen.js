import React from 'react';
import {View, StyleSheet} from 'react-native';
import Screen from '../components/Screen';
import LottieView from 'lottie-react-native';

function DetailServiceScreen(props) {
    return (
        <Screen style={styles.container}>
            <LottieView 
                style={styles.animation}
                autoPlay
                source={require('../assets/animations/loading.json')} 
            />
        </Screen>
    );
}


const styles = StyleSheet.create({
    container: {}
})


export default DetailServiceScreen;