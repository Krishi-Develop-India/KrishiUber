import React from 'react';
import {View, StyleSheet} from 'react-native';

import colors from '../config/colors'

import Screen from './../components/Screen';
import AppText from './../components/AppText';
import LottieView from 'lottie-react-native';

function SplashScreen(props) {
    return (
        <Screen style={styles.splash}>
            <AppText style={styles.splashKrishi}>Kr</AppText>
            <View style={styles.animate}>
            <LottieView 
                style={styles.animation}
                autoPlay
                source={require('../assets/animations/green-flower.json')} 
            />
                <AppText style={styles.splashKrishi}>ı</AppText>
            </View>
            <AppText style={styles.splashKrishi}>sh</AppText>
            <View style={styles.animate}>
                <LottieView style={styles.animation}
                autoPlay
                source={require('../assets/animations/green-flower.json')} 
                />
                <AppText style={styles.splashKrishi}>ı</AppText>
            </View>
            <AppText style={styles.initiative}>an agro initiative by Case3 Technologies</AppText>
        </Screen>
    );
}


const styles = StyleSheet.create({
    animate: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    animation: {
      width: 50,
      height: 50,
      position: 'absolute',
      top: -4
    },
    initiative: {
      position: 'absolute',
      bottom: 150,
      color: colors.dark,
    },
    splash: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    splashKrishi: {
      color: colors.green,
      fontSize: 80
    },
});
  


export default SplashScreen;