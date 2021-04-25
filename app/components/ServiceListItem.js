import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';

function ServiceListItem({name, price, img, onPress, id}) {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={() => onPress(id)}>
            <View style={styles.pictureBackground}>
                <Image source={img} style={styles.image} />
            </View>
            <View style={styles.description}>
                <AppText style={styles.dark}>{name}</AppText>
                <AppText>{"Rs "+price+" per unit"}</AppText>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 140,
        alignItems: 'center',
        flexDirection: 'row',
    },
    dark: {
        color: colors.black,
        fontSize: 30,
    },
    description: {
        marginLeft: 20,
        height: '100%',
        justifyContent: 'space-around',
        paddingTop: 20,
        paddingBottom: 20,
    },
    image: {
        height: 60,
        width: 60,
    },
    pictureBackground: {
        backgroundColor: colors.lighter,
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
})


export default ServiceListItem;