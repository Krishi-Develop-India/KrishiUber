import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import useSocket from '../socket/useSocket';
import SocketConnectionLost from '../screens/SocketConnectionLost';
import ActiveService from './../screens/ActiveService';

const Stack = createStackNavigator();

function RideAcceptedNavigator(){

    const { connectSocket, socket } = useSocket();
    const [connected, setConnected] = useState(socket ? socket.connected : false);

    useEffect(() => {
        connectSocket(setConnected);
    }, []);

    const render = () => {
        if(connected) {
            return(
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="ActiveService" component={ActiveService} />
                </Stack.Navigator>
            );
        } else{
            return <SocketConnectionLost />;
        }
    }

    return(
        render() 
    );
}

export default RideAcceptedNavigator;