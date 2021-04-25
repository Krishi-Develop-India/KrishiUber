import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Screen from './../components/Screen';
import InputText from './../components/InputText';
import AppButton from './../components/AppButton';
import AppText from './../components/AppText';
import colors from '../config/colors';
import OtpBoxes from '../components/OtpBoxes';
import AuthApi from '../api/authentication';
import AuthContext from './../auth/context';
import authStorage from '../auth/storage';
import { Toast } from 'native-base';

function LoginScreen2({route}) {

    const authContext = useContext(AuthContext);

    const { number } = route.params;
    const [pressed, setPressed] = useState(false);
    // const number = "6394233643";

    const [num1, setNum1] = useState();
    const [num2, setNum2] = useState();
    const [num3, setNum3] = useState();
    const [num4, setNum4] = useState();
    const [error, setError] = useState(null);

    const handleOnPress = async navigation => {
        setPressed(true);
        const otp = num1+num2+num3+num4;
        console.log(otp);
        const result = await AuthApi.verifyOtp(number, otp);
        console.log("results came");
        if(!result.ok){
             setPressed(false);
             console.log(result.problem); 
             return Toast.show({
                text: result.data,
                textStyle: { fontFamily: 'Roboto' },
                buttonText: "OK",
                buttonTextStyle: { color: "#000000", fontFamily: 'Roboto_medium' },
                buttonStyle: { backgroundColor: colors.green },
                style: { bottom: 50, marginLeft: 20, marginRight: 20, borderRadius: 10, },
            }); 
        }
        //redirect to drawer navigator
        console.log(result.data);
        authContext.setUser(result.data);
        authStorage.storeToken(result.data);
    }

    return (
        <Screen style={styles.container}>
            <AppText style={styles.krishi}>Krishi</AppText>
            <AppText style={styles.disclaimer}>We have send an OTP on the phone number: {number}</AppText>
            <OtpBoxes 
            onChangeText1={text => setNum1(text)} 
            onChangeText2={text => setNum2(text)}
            onChangeText3={text => setNum3(text)} 
            onChangeText4={text => setNum4(text)} />
            <AppButton 
            style={styles.button} 
            text="Next" 
            onPress={handleOnPress}
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


export default LoginScreen2;