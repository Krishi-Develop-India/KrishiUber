import * as SecureStore from 'expo-secure-store';

const key = 'authToken';

const storeToken = async authToken => {
    try{
        await SecureStore.setItemAsync(key, authToken);
    } catch(error) {
        console.log('Error storing the authToken',error);
    }
}

const getToken = async () => {
    try{
        return await SecureStore.getItemAsync(key);
    } catch(error) {
        console.log('Error getting the authToken',error);
    }
}

const removeToken = async() => {
    try{
        await SecureStore.deleteItemAsync(key);
    } catch(error) {
        console.log('Error removing the authToken', error);
    }
}

export default {
    getToken,
    storeToken,
    removeToken,
};