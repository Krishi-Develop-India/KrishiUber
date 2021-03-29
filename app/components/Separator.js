import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../config/colors';

function Separator({style}) {
    return (
        <View style={[styles.separator, style]}></View>
    );
}


const styles = StyleSheet.create({
    separator: {
        width: '100%',
        height: 3,
        borderRadius: 100,
        backgroundColor: colors.light,
        marginTop: 10,
        marginBottom: 10,
    },
})


export default Separator;