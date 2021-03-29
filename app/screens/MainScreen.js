import React, { useEffect } from 'react';
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

function MainScreen({handleDelete, array, navigation}) {

  const getLocation = async () => {
    try{
      const { granted } = await LocationApi.requestPermissionsAsync();
      if(!granted) return;
      const result = await LocationApi.getCurrentPositionAsync();
      console.log(result.coords.latitude, result.coords.longitude);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLocation();
  }, [])

    return (
        <Screen style={styles.box}>
        <View style={styles.container}>
            <View>
            <AppText >Nearest tractor is</AppText>
            <AppText style={styles.time}>45 min(s) away</AppText>
            </View>
            <TouchableOpacity style={styles.profile} activeOpacity={0.7} onPress={() => navigation.toggleDrawer}>
            <MaterialCommunityIcons name="account" size={30} color={colors.white} />
            </TouchableOpacity>
        </View>
        <View style={styles.location}>
            <AppText style={styles.time}>Destination address</AppText>
            <AppText style={styles.address}>Model Town, Jalandhar</AppText>
            <View style={styles.currentLocation}>
            <AppText style={styles.time}>Change location</AppText>
            <MaterialIcons name="arrow-right-alt" size={40} color="black" style={{paddingLeft: 5}} />
            </View>
        </View>
        <View style={styles.services}>
        <Separator style={styles.bar} />
        <ScrollView style={styles.scrollView} vertical showsVerticalScrollIndicator={false} alwaysBounceVertical >
            
            {array.length == 0 && <View style={styles.subCat}><CurrentLocation /></View>}

            {array.map(item => (
            <View style={styles.subCat} key={item.id}>
                
                {(array[0].id==item.id) && <CurrentLocation /> }
                {(array[0].id==item.id) && <Separator /> }

                <Location heading={item.place} headingDetail={item.address} renderRightAction={ () => 
                
                <TouchableWithoutFeedback onPress={() => handleDelete(item)} style={styles.rightSwipeable}>
                    <MaterialCommunityIcons name="trash-can" color={colors.danger} size={25} />
                </TouchableWithoutFeedback>

                } />
                { array[array.length-1].id!=item.id && <Separator /> }
            </View>
            ))}
        </ScrollView>
        </View>
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