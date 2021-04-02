import authClient from './authClient';
import * as Random from 'expo-random';
import storage from '../auth/storage';
import useAuth from './../auth/useAuth';

const endpointUpdatePicture = '/changeProfileImage';
const endpointUpdateName = '/changeName';

const updateUser = async (token, setUser) => {
    try {
        await storage.removeToken();
        await storage.storeToken(token);
        setUser(token);
    } catch(error) {
        console.log("Error in update user", error);
    }
}

const updateProfilePicture = async (image, token) => {
    try {
        const data = new FormData();
        
        let fileName = image.split("/");
        fileName = fileName[fileName.length-1]
        let extensionName = fileName.split(".");
        extensionName = extensionName[extensionName.length-1];

        data.append('token', token);

        data.append('pimage', {
            name: Random.getRandomBytes(8).toString('hex')+"."+extensionName,
            type: 'image/'+extensionName,
            uri: image
        });

        return await authClient.post(endpointUpdatePicture, data);
    } catch(error) {
        console.log("Error in update profile picture", error);
    }
};

const updateProfileName = name => (
    authClient.post(endpointUpdateName, { name })
);

export default {
    updateProfilePicture,
    updateProfileName,
    updateUser,
}