import * as SecureStore from 'expo-secure-store';

const key = 'ride';

const storeRide = async authToken => {
    try{
        await SecureStore.setItemAsync(key, authToken);
    } catch(error) {
        console.log('Error storing the ride',error);
    }
}

const getRide = async () => {
    try{
        return await SecureStore.getItemAsync(key);
    } catch(error) {
        console.log('Error getting the ride',error);
    }
}

const removeRide = async() => {
    try{
        await SecureStore.deleteItemAsync(key);
    } catch(error) {
        console.log('Error removing the ride', error);
    }
}

export default {
    getRide,
    storeRide,
    removeRide,
};