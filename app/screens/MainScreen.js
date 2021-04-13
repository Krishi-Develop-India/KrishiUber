import React, { useEffect, useState } from 'react';
import colors from '../config/colors'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Screen from './../components/Screen';
import AppText from './../components/AppText';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CurrentLocation from '../components/CurrentLocation';
import Separator from './../components/Separator';
import * as LocationApi from 'expo-location';
import Location from './../components/Location';
import services from '../api/services';

function MainScreen({navigation}) {

  const [array, setArray] = useState([]);
  const [distance, setDistance] = useState("We are searching");
  const [currentLocation, setCurrentLocation] = useState("We don't know yet");
  const [selectedLocation, setSelectedLocation] = useState("Choose a location");

  const getLocation = async () => {
    try{
      const { granted } = await LocationApi.requestPermissionsAsync();
      if(!granted) return;
      const result = await LocationApi.getCurrentPositionAsync();
      console.log(result.coords.latitude, result.coords.longitude);
      const {data: label} = await services.getReverGeoCoding(result.coords.latitude, result.coords.longitude);
      let {data: distance} = await services.getNearestTractor(result.coords.latitude, result.coords.longitude);
      distance = parseFloat(distance);
      distance = Math.round(distance);
      console.log(label, distance);
      if(Number.isNaN(distance)) distance = "No tractor service "
      else if(distance < 1000) distance = "Within 1 km";
      else distance = Math.round(distance/1000) + "km away";
      setCurrentLocation(label);
      setDistance(distance);
    } catch(error) {
      console.log(error);
    }
  }

  const getPlaces = async () => {
    try{
      const {data: temp} = await services.getPlaces();
      setArray(temp);
    } catch(err){ console.log("Error in getting places", err); }
  };
  
  const handleDelete = async item => {
    const copyArray = array;
    setArray(array.filter(currentItem => currentItem.id!=item.id));
    const { ok } = await services.deletePlace(item);
    if(ok) {
      //do nothing it's OK
    } else {
      setArray(copyArray);
    }
  };

  useEffect(() => {
    getLocation();
    getPlaces();
  }, [])

  const handleLocationTouch = location => {
    setSelectedLocation(location);
  };

    return (
        <Screen style={styles.box}>
        <View style={styles.container}>
            <View>
            <AppText >Nearest tractor is</AppText>
            <AppText style={styles.time}>{distance}</AppText>
            </View>
            <TouchableOpacity style={styles.profile} activeOpacity={0.7} onPress={() => navigation.toggleDrawer()}>
            <MaterialCommunityIcons name="account" size={30} color={colors.white} />
            </TouchableOpacity>
        </View>
        <View style={styles.location}>
            <AppText style={styles.time}>Destination address</AppText>
            <AppText style={styles.address}>{selectedLocation}</AppText>
            <View style={styles.currentLocation}>
            <AppText style={styles.time}>Change location</AppText>
            <MaterialIcons name="arrow-right-alt" size={40} color="black" style={{paddingLeft: 5}} />
            </View>
        </View>
        <View style={styles.services}>
        <Separator style={styles.bar} />
        <ScrollView style={styles.scrollView} vertical showsVerticalScrollIndicator={false} alwaysBounceVertical >
            
            {array.length == 0 && <View style={styles.subCat}><CurrentLocation handleLocationTouch={handleLocationTouch} headingDetail={currentLocation} /></View>}

            {array.map(item => (
            <View style={styles.subCat} key={item.id}>
                
                {(array[0].id==item.id) && <CurrentLocation headingDetail={currentLocation} handleLocationTouch={handleLocationTouch} /> }
                {(array[0].id==item.id) && <Separator /> }

                <Location heading={item.place} headingDetail={item.address} handleLocationTouch={handleLocationTouch} renderRightAction={ () => 
                
                <TouchableWithoutFeedback onPress={() => handleDelete(item)} style={styles.rightSwipeable}>
                    <MaterialCommunityIcons name="trash-can" color={colors.danger} size={25} />
                </TouchableWithoutFeedback>

                } />
                { array[array.length-1].id!=item.id && <Separator /> }
            </View>
            ))}
        </ScrollView>
        </View>
        <TouchableOpacity style={styles.next} activeOpacity={0.5}>
          <AppText style={styles.book}>Book Service</AppText>
        </TouchableOpacity>
        </Screen>
    );
}


const styles = StyleSheet.create({
    address: {
      fontSize: 30,
      color: colors.black,
      fontWeight: 'bold'
    },
    box: {
      backgroundColor: "rgba(139, 223, 109, 0.70)",
    },
    book: {
      color: colors.white,
      fontWeight: 'bold',
    },
    bar: {
      backgroundColor: colors.dark,
      width: '30%',
      height: 5,
      borderRadius: 4,
      marginTop: 10,
      alignSelf: 'center',
    },
    container: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '20%',
    },
    currentLocation: {
      marginTop: 50,
      flexDirection: 'row',
      alignItems: 'center',
    },
    location: {
      padding: 10,
    },
    time: {
      color: colors.black
    },
    next: {
      position: 'absolute',
      bottom: 50,
      alignSelf: 'center',
      width: 200,
      height: 50,
      backgroundColor: colors.green,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profile: {
      width: 45,
      height: 45,
      backgroundColor: colors.light,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors.white,
      borderWidth: 2,
    },
    rightSwipeable: {
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    services: {
      flex: 1,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderWidth: 2,
      borderLeftColor: colors.light,
      borderRightColor: colors.light,
      borderTopColor: colors.light,
      borderBottomColor: colors.white,
      backgroundColor: colors.white,
    },
    separator: {
      width: '100%',
      height: 3,
      borderRadius: 100,
      backgroundColor: colors.light,
      marginTop: 10,
      marginBottom: 10,
    },
    scrollView: {
      flexDirection: 'column',
    },
    subCat: {
      paddingLeft: 20,
      paddingRight: 20,
    }
  });

export default MainScreen;