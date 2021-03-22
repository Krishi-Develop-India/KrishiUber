
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, Platform } from 'react-native';

import LottieView from 'lottie-react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';

import colors from './app/config/colors'

import Screen from './app/components/Screen'
import AppText from './app/components/AppText';
import SplashScreen from './app/screens/SplashScreen';
import Location from './app/components/Location';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MainScreen from './app/screens/MainScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const dummyData = [
  {
    id: 1,
    place: 'Red Fort',
    address: 'Patparganj, Lodhi Colony, Delhi'
  },
  {
    id: 2,
    place: 'Kashmere Gate',
    address: 'Patparganj, Lodhi Colony, Delhi'
  },
  {
    id: 3,
    place: 'Lajpat Nagar',
    address: 'Patparganj, Lodhi Colony, Delhi'
  },
  {
    id: 4,
    place: 'Lajpat Nagar',
    address: 'Patparganj, Lodhi Colony, Delhi'
  },
  
]

let array, setArray;

function handleDelete(item) {
  setArray(array.filter(currItem => currItem.id!=item.id));
}

export default function App() {

  const Drawer = createDrawerNavigator();

  [array, setArray] = useState(dummyData);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="MainScreen" drawerPosition='right'>
        <Drawer.Screen name="MainScreen" component={
          () => <MainScreen handleDelete={handleDelete} array={array} />
        } />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

