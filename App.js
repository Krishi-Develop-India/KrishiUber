import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigation from './app/navigation/AuthNavigation';
import DrawerNavigation from './app/navigation/DrawerNavigation';
import AuthContext from './app/auth/context';
import SplashScreen from './app/screens/SplashScreen';
import authStorage from './app/auth/storage';
import { Root } from 'native-base';
import * as Font from 'expo-font';
import SocketContext from './app/socket/context';

export default function App() {

  const restoreSession = async () => {
    const token = await authStorage.getToken();
    setUser(token);
  }

  const loadFont = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
  };

  const [user, setUser] = useState();
  const [socket, setSocket] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    loadFont();
    restoreSession();
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
        <NavigationContainer>
          {user ? <DrawerNavigation /> : <AuthNavigation />}
        </NavigationContainer>
        </SocketContext.Provider>
      </AuthContext.Provider>
    }
    </Root>
  );
}

