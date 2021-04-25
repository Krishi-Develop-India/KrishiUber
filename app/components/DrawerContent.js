import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import colors from '../config/colors';
import Profiler from './Profiler';
import { Ionicons, FontAwesome, Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import AppText from './AppText';
import Separator from './Separator';
import useAuth from './../auth/useAuth';

function DrawerContent({navigation}) {
    const { logout, name, rating, uri: source } = useAuth();
    return (
        <View style={styles.container}>
            <DrawerContentScrollView style={styles.scrollView}>
                <View style={styles.upperDrawer}>
                    <Profiler name={name} source={source} rating={rating} key={source} />
                </View>
                <Separator style={styles.separator} />
                <DrawerItem
                 icon={({color, size}) => (
                    <Entypo name="home" size={size} color={color} />
                )}
                label="Home"
                onPress={() => {}} 
                />
                <DrawerItem
                 icon={({color, size}) => (
                    <FontAwesome name="user" size={size} color={color} />
                )}
                label="Profile"
                onPress={() => {navigation.navigate('Profile')}} 
                />
                <DrawerItem
                 icon={({color, size}) => (
                    <FontAwesome5 name="clipboard-list" size={size} color={color} />
                )}
                label="Previous services"
                onPress={() => {}} 
                />
                <DrawerItem
                 icon={({color, size}) => (
                    <MaterialIcons name="menu-book" size={size} color={color} />
                )}
                label="About"
                onPress={() => {}} 
                />
            </DrawerContentScrollView>
            <Separator style={styles.separator} />
            <DrawerItem
            icon={({color, size}) => (
                <Ionicons name="ios-exit" size={size} color={color} />
            )}
            label="Logout"
            onPress={() => logout()} 
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logout: {
        marginLeft: 10,
    },
    separator: {
        height: 1,
    },
    scrollView: {  
    },
    upperDrawer: {
        flexDirection: 'row',
        height: 120,
        width: '100%',
        alignItems: 'center',
    },
})


export default DrawerContent;