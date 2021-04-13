import React from 'react';
import {View, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import { MaterialIcons } from '@expo/vector-icons'; 
import AppText from './AppText';
import { color } from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/Swipeable';

function Location({heading='Red Fort', headingDetail='Patparganj, Lodhi Colony, Delhi', handleLocationTouch, renderRightAction}) {
    return (
        <Swipeable renderRightActions={renderRightAction}>
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
        color: colors.black,
    },
    descriptionContainer: {
        marginLeft: 10,
    },
    imageContainer: {
        width: 45,
        height: 45,
        backgroundColor: colors.light,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallSize: {
        fontSize: 15,
    },
})


export default Location;