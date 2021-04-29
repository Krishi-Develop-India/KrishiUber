import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigation from './app/navigation/AuthNavigation';
import DrawerNavigation from './app/navigation/DrawerNavigation';
import AuthContext from './app/auth/context';
import SplashScreen from './app/screens/SplashScreen';
import authStorage from './app/auth/storage';
import rideStorage from './app/ride/storage';
import { Root } from 'native-base';
import * as Font from 'expo-font';
import SocketContext from './app/socket/context';
import FindingLoadingScreen from './app/screens/FindingLoadingScreen';
import SocketConnectionLost from './app/screens/SocketConnectionLost';
import ActiveService from './app/screens/ActiveService';
import RideContext from './app/ride/context';
import RideAcceptedNavigator from './app/navigation/RideAcceptedNavigator';

export default function App() {

  const restoreSession = async () => {
    const token = await authStorage.getToken();
    setUser(token);
  };

  const restoreRide = async () => {
    const ride = await rideStorage.getRide();
    setRide(ride);
  };

  const loadFont = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
  };

  const [user, setUser] = useState();
  const [socket, setSocket] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [ride, setRide] = useState(null);

  useEffect(() => {
    loadFont();
    restoreSession();
    restoreRide();
  }, [user]);

  return (
    <Root>
    {
      firstLoad 
      ? 
      <SplashScreen setFirstLoad={setFirstLoad} /> 
      : 
      <AuthContext.Provider value={{user, setUser}}>
        <SocketContext.Provider value={{socket, setSocket}}>
          <RideContext.Provider value={{ride, setRide}}>
        <NavigationContainer>
          {user ? (ride ? <RideAcceptedNavigator /> : <DrawerNavigation />) : <AuthNavigation />}
        </NavigationContainer>
          </RideContext.Provider>
        </SocketContext.Provider>
      </AuthContext.Provider>
    }
    </Root>
  );
}

