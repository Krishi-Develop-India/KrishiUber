import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Linking from "expo-linking";

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import AppText from '../components/AppText';
import colors from '../config/colors';
import Screen from './../components/Screen';
import useRide from './../ride/useRide';
import useNotification from '../hooks/useNotification';

function ActiveService(props) {

    let tractorDetail  = true;
    let tractorCancelled = true;
    let workStarted = true;
    let workFinished = true;

    useEffect(() => {
        tractorDetail = false;
        tractorCancelled = false;
        workStarted = false;
        workFinished = false;
    }, []);

    const { socket } = useSocket();

    const { ride, removeTheRide } = useRide();

    const { showNotification } = useNotification();

    const [ tractorDetails, setTractorDetails ] = useState(
        {
            name: 'Loading', 
            rating: 'loading', 
            tractor_number: 'loading'
        }
    );

    const [work, setWork] = useState(null);

    socket.on('tractor-details', data => {
        if(data._id == -1) return removeTheRide();
        setTractorDetails(data);
        if(!tractorDetail) {
            showNotification('Your ride has been confiemd', `${data.name} is on the way to make India better`);
            tractorDetail = true;
        }
    });

    socket.on('request-cancelled-by-tractor', data => {
        if(data._id == ride) {
            if(!tractorCancelled) {
                showNotification('Sorry', `${tractorDetails.name} cancelled the service`);
                tractorCancelled = true;
            }
            removeTheRide();
        }
    });

    socket.on('work-started', data => {
        if(data._id == ride) setWork(data._id);
        if(!workStarted) {
            workStarted = true;
            showNotification('Your service has been started', `${tractorDetails.name} has started your service. Enjoy`);
        }
    });

    socket.on('work-finished', data => {
        if(data._id == ride) {
            if(!workFinished) {
                workFinished = true;
                showNotification('Your service finished successfully', `We hope to see you soon on our platform`);
            }
            removeTheRide();
        }
    });

    useEffect(() => {
        socket.emit('get-tractor-details', {_id: ride});
    }, []);

    const handleCallTractor = () => {
        Linking.openURL(`tel:${tractorDetails.number}`);
        console.log("Handling the on call tractor");
    };

    const handleCancelTractor = async () => {
        socket.emit('request-cancelled-after-confirm', {_id: ride});
        await removeTheRide();
    };

    return (
        <Screen style={styles.container}>
            <MapView
                region={
                    {latitude: 26.872117,
                    longitude: 80.982301,
                    latitudeDelta: 0.006,
                    longitudeDelta: 0.006,}
                }
                style={styles.map}
                showsUserLocation
                followsUserLocation
            >
                <Marker
                    coordinate={{ latitude : 26.872117, longitude : 80.982301 }}
                    title="Your location"
                    description="This is your location which will be seen to the tractor"
                />
            </MapView>
            <View style={styles.guide_info_container}>
                <View style={styles.guide_profile}>
                    <View style={styles.guide_image_container}>
                        <Image source={tractorDetails ? {uri: tractorDetails.image} : require('../assets/tractor.png')} style={styles.guide_image} />
                    </View>
                    <View style={styles.guide_details_container}>
                        <AppText style={styles.guide_name}>{tractorDetails.name}</AppText>
                        <AppText style={styles.guide_vehicle}>Vehicle: {tractorDetails.tractor_number}</AppText>
                        <AppText style={styles.guide_vehicle}>Rating: {tractorDetails.rating}</AppText>
                    </View>
                </View>
                <TouchableOpacity style={[styles.button, styles.callTractor]} activeOpacity={0.6} onPress={handleCallTractor} disabled={tractorDetails.number ? false : true} >
                    <AppText style={styles.buttonText}>Call Tractor</AppText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelTractor]} activeOpacity={0.2} onPress={handleCancelTractor}>
                    <AppText style={[styles.buttonText, styles.buttonText_black]}>{work ? 'Emergency' : 'Cancel Tractor'}</AppText>
                </TouchableOpacity>
            </View>
        </Screen>
    );
}


const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 10,
        marginHorizontal: 20,
        borderWidth: 2,
    },
    buttonText: {
        color: colors.light, 
    },
    buttonText_black: {
        color: colors.black,
    },
    container: {
    },
    cancelTractor: {
        borderColor: colors.black,
    },
    callTractor: {
        backgroundColor: colors.black,
    },
    guide_info_container: {
        minHeight: 250,
    },
    guide_details_container: {
        justifyContent: 'center',
    },
    guide_image: {
        borderRadius: 250,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        borderColor: colors.light,
        borderWidth: 2,
        padding: 10,
        height: 60,
        width: 60,
    },
    guide_name: {
        fontSize: 22,
    },
    guide_profile: {
        marginTop: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    guide_vehicle: {
        fontSize: 16,
    },
    map: {
        flex: 1,
    }
});


export default ActiveService;