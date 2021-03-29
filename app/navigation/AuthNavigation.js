import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen1 from './../screens/LoginScreen1';
import LoginScreen2 from './../screens/LoginScreen2';

const Stack = createStackNavigator();

function AuthNavigation(){
    return(
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name="LoginScreen1" component={LoginScreen1} />
        <Stack.Screen name="LoginScreen2" component={LoginScreen2} />
    </Stack.Navigator>
    );
}

export default AuthNavigation;