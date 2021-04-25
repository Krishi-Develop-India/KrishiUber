import React, { useState, useEffect } from 'react';
import {StyleSheet} from 'react-native';
import Screen from './../components/Screen';
import AppText from './../components/AppText';
import colors from '../config/colors';
import InputText from '../components/InputText';
import AppButton from '../components/AppButton';
import AuthApi from '../api/authentication';
import { Toast } from 'native-base';
import { stringify } from 'uuid';

function LoginScreen1({navigation}) {

    const [number, setNumber] = useState('');
    const [error, setError] = useState(null);
    const [pressed, setPressed] = useState(false);

    const handlePress = async navigation => {
        // setPressed(true);
        if(number == '') {
            return Toast.show({
                text: 'Enter your number',
                textStyle: { fontFamily: 'Roboto' },
                buttonText: "OK",
                buttonTextStyle: { color: colors.white, fontFamily: 'Roboto' },
                buttonStyle: { backgroundColor: colors.green },
                style: { bottom: 50, marginLeft: 20, marginRight: 20, borderRadius: 10, },
            });
        }
        if(number.length != 10) {
            return Toast.show({
                text: 'Number not valid',
                textStyle: { fontFamily: 'Roboto' },
                buttonText: "OK",
                buttonTextStyle: { color: "#008000", fontFamily: 'Roboto' },
                buttonStyle: { backgroundColor: "#5cb85c" },
                style: { bottom: 50, marginLeft: 20, marginRight: 20, borderRadius: 10, },
            });
        }
        const result = await AuthApi.requestOtp(number);
        if(!result.ok){ 
            Toast.show({
                text: result.status == 401 ? result.data : result.problem,
                textStyle: { fontFamily: 'Roboto' },
                buttonText: "OK",
                buttonTextStyle: { color: "#008000", fontFamily: 'Roboto' },
                buttonStyle: { backgroundColor: "#5cb85c" },
                style: { bottom: 50, marginLeft: 20, marginRight: 20, borderRadius: 10, },
            });
            return setPressed(false);
        }
        navigation.navigate("LoginScreen2", {number});
    }

    return (
        <Screen style={styles.container}>
            <AppText style={styles.krishi}>Krishi</AppText>
            <AppText style={styles.disclaimer}>Enter mobile number</AppText>
            <InputText 
            style={styles.input} 
            placeholder="Number" 
            icon="phone" 
            keyboardType="number-pad" 
            onChangeText={ text => setNumber(text) }
            maxLength={10} />
            <AppButton 
            style={styles.button} 
            text="Next"
            onPress={() => handlePress(navigation)} 
            pressed={pressed} />
        </Screen>
    );
}


const styles = StyleSheet.create({
    button: {
        marginTop: 5,
    },
    container: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    disclaimer: {
        marginTop: 100,
        marginLeft: 10,
    },
    input: {
        marginTop: 15,
    },
    krishi: {
        color: colors.green,
        fontSize: 50,
        alignSelf: 'center',
        paddingTop: 50,
    },
})


export default LoginScreen1; 