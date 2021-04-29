import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AppText from '../components/AppText';
import Screen from './../components/Screen';
import Separator from './../components/Separator';
import colors from '../config/colors';
import ServiceListItem from '../components/ServiceListItem';
import ServicesApi from '../api/services';
import servicePictures from '../config/servicePictures';

function ServiceScreen({route, navigation}) {

    const { location, longitude, latitude } = route.params;

    const [services, setServices] = useState();

    useEffect(() => {getServices()}, []);

    const handleServiceSelect = id => {
        let price = NaN;
        services.forEach(element => {
            if(element.id == id) {
                price = element.price;
            }
        });
        return navigation.navigate('DetailServiceScreen',  {location: location, longitude: longitude, latitude: latitude, price: price});
    };

    async function getServices(){
        const response = await ServicesApi.getServices();
        setServices(response.data);
    }

    if(!services) {
        return(
            <Screen style={{justifyContent: 'center', alignItems: 'center'}}>
                <AppText>No services found!</AppText>
            </Screen>
        );
    }
    return (
        <Screen style={styles.container}>
            <View style={styles.location}>
                <AppText>{location}</AppText>
            </View>
                <Separator style={styles.separator} />
                <Separator style={styles.bar} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {services.map(service => (
                    <View style={styles.subcat} key={service.id}>
                    <ServiceListItem 
                    name={service.name} 
                    img={servicePictures[service.img]} 
                    price={service.price}
                    onPress={handleServiceSelect} 
                    id={service.id} />
                    { service.id!=services[services.length-1].id && <Separator /> }
                    </View>
                ))}
            </ScrollView>  
        </Screen>
    );
}


const styles = StyleSheet.create({
    bar: {
        backgroundColor: colors.dark,
        width: '30%',
        height: 5,
        borderRadius: 4,
        marginTop: 30,
        alignSelf: 'center',
    },
    container: {},
    location: {
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        marginTop: 0,
        marginBottom: 0,
    },
    subcat: {
        paddingLeft: 20,
        paddingRight: 20,
    },
})


export default ServiceScreen;