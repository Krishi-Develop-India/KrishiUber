import React, {useRef, useEffect, createRef} from 'react';
import { View, StyleSheet, TextInput, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';

function InputText({ icon, style, textStyle, ...otherProps }) {

    return (
        <View style={[styles.container, style]}>
            {icon && <MaterialCommunityIcons name={icon} size={20} color={colors.light} style={styles.icon} /> }
            <TextInput style={[styles.textInput, textStyle]} {...otherProps} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lighter,
        borderRadius: 25,
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    textInput: {
        width: '100%',
        fontSize: 18,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    },
})


export default InputText;