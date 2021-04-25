import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';

function AppButton({text, style, pressed, onPress, disabled}) {
    return (
        <TouchableOpacity 
        style={pressed ? [styles.container, styles.pressed, style] : [styles.container, style]} 
        activeOpacity={0.6} 
        onPress={onPress}
        disabled={disabled}>
            <AppText style={styles.text}>{text}</AppText>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 25,
    },
    pressed: {
        opacity: 0.2
    },
    text: {
        color: colors.white,
        fontWeight: 'bold',
    },
})


export default AppButton;