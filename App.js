import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigation from './app/navigation/AuthNavigation';
import DrawerNavigation from './app/navigation/DrawerNavigation';
import AuthContext from './app/auth/context';
import SplashScreen from './app/screens/SplashScreen';
import authStorage from './app/auth/storage';
import Profiler from './app/components/Profiler';
import Screen from './app/components/Screen';
import Profile from './app/screens/Profile';

export default function App() {

  const restoreSession = async () => {
    const token = await authStorage.getToken();
    setUser(token);
  }

  const [user, setUser] = useState();
  const [firstLoad, setFirstLoad] = useState(false);

  useEffect(() => {
    restoreSession();
  }, [user]);

  return (
    <>
    {
      firstLoad 
      ? 
      <SplashScreen setFirstLoad={setFirstLoad} /> 
      : 
      <AuthContext.Provider value={{user, setUser}}>
      <NavigationContainer>
        {user ? <DrawerNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    </AuthContext.Provider>
    }
    </>
  );
}

