import React, {useState} from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import ServiceScreen from './../screens/ServiceScreen';
import MainScreen from './../screens/MainScreen';

const Drawer = createDrawerNavigator();

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

function DrawerNavigation() {
    [array, setArray] = useState(dummyData);
    return (
        <Drawer.Navigator initialRouteName="MainScreen" drawerPosition='right'>
            <Drawer.Screen name="MainScreen" component={
            () => <MainScreen handleDelete={handleDelete} array={array} />
            } />
            <Drawer.Screen name="ServiceScreen" component={
            () => <ServiceScreen location={"Kuch improvement batao bwakoof"} />
            } />
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;

