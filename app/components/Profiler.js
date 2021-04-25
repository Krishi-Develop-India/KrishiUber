import React, { useS } from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AppText from './AppText';
import Pictures from '../config/servicePictures';
import colors from '../config/colors';
import { AntDesign } from '@expo/vector-icons';

let count = 0;

function Profiler({source, name="Pikachu", rating="5.0"}) {
    
    if(!source) {
        source = Pictures.profile;
    } else {
        source = {uri: source, headers: {
            Pragma: 'no-cache',
          }, cache: 'reload'};
    }
    return (
        <View style={styles.container}>
            <Image source={source} style={styles.image} />
            <View style={styles.description}>
                <AppText style={{fontSize: 22}}>{name}</AppText>
                <View style={styles.rating}>
                    <AppText style={[styles.ratingNumber, styles.bigText]}>{rating}</AppText>
                    <AntDesign name="star" color="black" size={25} />
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    bigText: {
        fontSize: 20,
    },
    container: {
        flexDirection: 'row',
        width: '100%',
        marginLeft: 20,
    },
    description: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderColor: colors.lighter,
        borderWidth: 2,
    },
    rating: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ratingNumber: {
        marginRight: 5,
    },
})


export default Profiler;