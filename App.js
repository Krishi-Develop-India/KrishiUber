import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigation from './app/navigation/AuthNavigation';
import DrawerNavigation from './app/navigation/DrawerNavigation';
import AuthContext from './app/auth/context';
import SplashScreen from './app/screens/SplashScreen';
import authStorage from './app/auth/storage';

export default function App() {

  const restoreSession = async () => {
    const token = await authStorage.getToken();
    setUser(token);
  }

  useEffect(() => {
    restoreSession();
  }, []);

  const [user, setUser] = useState();
  const [firstLoad, setFirstLoad] = useState(true);

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

