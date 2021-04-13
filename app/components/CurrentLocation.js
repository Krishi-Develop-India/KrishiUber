import React from 'react';
import {View, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import { MaterialIcons } from '@expo/vector-icons'; 
import AppText from './AppText';
import { color } from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/Swipeable';

function CurrentLocation({heading='Your Current Location', headingDetail='I have no idea about it', renderRightAction, handleLocationTouch}) {
    return (
        <Swipeable>
            <TouchableOpacity onPress={() => handleLocationTouch(heading)} activeOpacity={0.5}>
                <View style={ styles.container }>
                    <View style={styles.imageContainer}>
                    <MaterialIcons name="location-pin" size={30} color="white" />
                    </View>
                    <View style={styles.descriptionContainer}>
                        <AppText style={[styles.darkName]}>{heading}</AppText>
                        <AppText style={styles.smallSize}>{headingDetail}</AppText>
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingTop: 20,
    },
    darkName: {
        color: colors.green,
        fontWeight: 'bold',
    },
    descriptionContainer: {
        marginLeft: 10,
    },
    imageContainer: {
        width: 45,
        height: 45,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.green,
    },
    smallSize: {
        fontSize: 15,
        paddingRight: 28,
    },
})


export default CurrentLocation;