import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';


import Screen from './../components/Screen';
import * as ImageSelector from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../config/colors';

import { TextInput, Button } from 'react-native-paper';
import AppButton from './../components/AppButton';
import useAuth from './../auth/useAuth';
import personalApi from '../api/personal';
import { Toast } from 'native-base';

function Profile(props) {


    let {name, number: phoneNumber, rating, uri: profileImage, user: token, setUser} = useAuth();
    let setName, setProfileImage;
    [profileImage, setProfileImage] = useState(profileImage);
    [name, setName] = useState(name);
    const [changes, onChanges] = useState(false);
    let [previousName, setPreviousName] = useState(name);
    let [previousImage, setPreviousImage] = useState(profileImage);
    const [disabled, setDisabled] = useState(false);


    const updateData = async (token, setUser) => {
        console.log(`Token inside updateData: ${token}`);
        if(!token) return;
        console.log(`Name: ${name}`);
        console.log(`Previous Name: ${previousName}`);
        console.log(`Previous Uri: ${previousImage}`);
        console.log(`Current Uri: ${profileImage}`);
        if(previousName !== name){ 
            const { data: newToken, status, ok } = await personalApi.updateProfileName(name);
            if(!ok) {
                Toast.show({
                    text: newToken,
                    textStyle: { fontFamily: 'Roboto' },
                    buttonText: "OK",
                    buttonTextStyle: { color: colors.white, fontFamily: 'Roboto_medium' },
                    buttonStyle: { backgroundColor: colors.green },
                    style: { bottom: 50, marginLeft: 20, marginRight: 20, borderRadius: 10, },
                });
                return setPreviousName(previousName);
            }
            await personalApi.updateUser(newToken, setUser);
            setPreviousName(name);
            Toast.show({
                text: 'Name updated',
                textStyle: { fontFamily: 'Roboto' },
                buttonText: "OK",
                buttonTextStyle: { color: colors.white, fontFamily: 'Roboto_medium' },
                buttonStyle: { backgroundColor: colors.green },
                style: { bottom: 50, marginLeft: 20, marginRight: 20, borderRadius: 10, },
            });
        }
        if(previousImage !== profileImage){
            const { data: newToken, ok } = await personalApi.updateProfilePicture(profileImage, token);
            if(!ok) {
                Toast.show({
                    text: newToken,
                    textStyle: { fontFamily: 'Roboto' },
                    buttonText: "OK",
                    buttonTextStyle: { color: colors.white, fontFamily: 'Roboto_medium' },
                    buttonStyle: { backgroundColor: colors.green },
                    style: { bottom: 50, marginLeft: 20, marginRight: 20, borderRadius: 10, },
                });
                return setPreviousImage(previousImage);
            }
            await personalApi.updateUser(newToken, setUser);
            setPreviousImage(profileImage);
            Toast.show({
                text: 'Profile image updated',
                textStyle: { fontFamily: 'Roboto' },
                buttonText: "OK",
                buttonTextStyle: { color: colors.white, fontFamily: 'Roboto_medium' },
                buttonStyle: { backgroundColor: colors.green },
                style: { bottom: 50, marginLeft: 20, marginRight: 20, borderRadius: 10, },
            });
        }
        onChanges(false);
        setDisabled(true);
    }

    const nameChange = text => {
        if(text !== previousName){ onChanges(true); setDisabled(false); }
        else onChanges(false);
        setName(text);
    }

    const selectImage = async () => {
        try{
            const {cancelled, uri} = await ImageSelector.launchImageLibraryAsync();
            if(!cancelled){ onChanges(true); setProfileImage(uri); setDisabled(false); }

        } catch(error) {
            console.log("An error selecting the image.", error);
        }
    }    

    const requestImagePermission = async () => {
        const { granted } = await ImageSelector.requestMediaLibraryPermissionsAsync();
        if(!granted) alert('You need to enable image permission');
    }

    useEffect(() => {
        requestImagePermission();
    }, [])

    return (
        <Screen styles={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity activeOpacity={0.6} onPress={selectImage} style={styles.profileImageContainer}>
                    <Image style={styles.profileImage} source = {{ uri: profileImage}} />
                </TouchableOpacity> 
                <TextInput
                    label="Name"
                    value={name}
                    onChangeText={text => nameChange(text)}
                    style={[styles.textInputs, {marginTop: 80}]}
                />
                <TextInput
                    label="Rating"
                    value={rating}
                    style={styles.textInputs}
                    editable={false}
                />
                <TextInput
                    label="Phone Number"
                    value={phoneNumber}
                    style={styles.textInputs}
                    editable={false}
                />
                 <AppButton 
                 text="Save changes"
                 style={changes ? [styles.button, styles.buttonActive] : [styles.button, styles.buttonInactive]}
                 onPress={() => {updateData(token, setUser)}} />
            </ScrollView>
        </Screen>
    );
}


const styles = StyleSheet.create({
    button: {
        marginTop: 100,
        justifyContent: 'center',
        marginHorizontal: 30,
        height: 60,
    },
    buttonActive: {
        backgroundColor: colors.green,
    },
    buttonInactive: {
        backgroundColor: colors.lighter,
    },
    container: {},
    profileImage: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 80,
    },
    profileImageContainer: {
        width: 150,
        height: 150,
        borderRadius: 80,
        backgroundColor: colors.lighter,
        alignSelf: 'center',
        marginTop: 40,
    },
    textInputs: {
        backgroundColor: colors.lighter,
        marginHorizontal: 30,
        height: 60,
        marginTop: 20,
    },
})


export default Profile;