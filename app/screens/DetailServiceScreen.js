import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';
import Screen from '../components/Screen';
import LottieView from 'lottie-react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from './../components/AppText';
import AppButton from './../components/AppButton';
import services from '../api/services';
import { Toast } from 'native-base';
import InputText from './../components/InputText';

function DetailServiceScreen({route, navigation}) {

    const { latitude, longitude, price } = route.params;

    const [amount, setAmount] = useState(0);
    const [bigha, setBigha] = useState(0);

    const handleBighaChange = text => {
        text = parseInt(text);
        if(Number.isNaN(text)) text = 0;
        setBigha(text);
        setAmount(text*price);
    };

    const handleBookMyTractor = async () => {
        const { data, status, ok } = await services.bookTractor(latitude, longitude, bigha, amount);
        if(!ok) return (
            Toast.show({
                text: status == 404 ? 'No tractor found' : 'Please try again later',
                textStyle: { fontFamily: 'Roboto_medium' },
                buttonText: "OK",
                buttonTextStyle: { color: "#008000", fontFamily: 'Roboto_medium' },
                buttonStyle: { backgroundColor: "#5cb85c" },
                style: { bottom: 50, marginLeft: 20, marginRight: 20, borderRadius: 10, },
            })
        );
        navigation.navigate('FindingLoadingScreen', {_id: data._id});
    };

    return (
        <Screen style={styles.container}>
            <View style={styles.details}>
                <AppText style={styles.detailsService}>Tractor Service</AppText>
                <AppText style={styles.detailsAtTheRate}>@</AppText>
                <AppText style={styles.detailsPlace}>Indira Nagar, Lucknow</AppText>
            </View>
            <View style={styles.areaContainer}>
                <AppText style={styles.areaHint}>Enter total working area</AppText>
                <InputText 
                keyboardType="number-pad"
                textAlign="center" 
                placeholder="Value in bigha"
                onChangeText={text => handleBighaChange(text)} />
                <View style={styles.amount}>
                    <AppText>Amount Payable: Rs </AppText>
                    <AppText>{amount}</AppText>
                </View>
            </View>
            <AppButton style={styles.button} text="Book my Tractor" onPress={handleBookMyTractor} />
        </Screen>
    );
}


const styles = StyleSheet.create({
    amount: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    areaContainer: {
        marginTop: 70,
        paddingHorizontal: 30,
    },
    areaHint: {
        marginLeft: 10,
    },
    container: {},
    button: {
        marginTop: 80,
        marginLeft: 20,
        marginRight: 20,
    },
    details: {
        alignItems: 'center',
    },
    detailsPlace: {
        fontSize: 20,
    },
    detailsAtTheRate: {
        fontSize: 25,
    },
    detailsService: {
        fontSize: 40,
    },
})


export default DetailServiceScreen;