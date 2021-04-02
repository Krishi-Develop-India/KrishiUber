import React, {useState} from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import ServiceScreen from './../screens/ServiceScreen';
import MainScreen from './../screens/MainScreen';
import DrawerContent from './../components/DrawerContent';
import Profile from './../screens/Profile';

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

    const MainScreenDrawable = ({navigation}) => (
      <MainScreen handleDelete={handleDelete} array={array} navigation={navigation} />
    );
  
    const ServiceScreenDrawable = ({navigation}) => (
      <ServiceScreen location={"Kuch improvement batao bwakoof"} navigation={navigation} />
    );
    return (
        <Drawer.Navigator initialRouteName="MainScreen" drawerPosition='right' drawerContent={props => <DrawerContent navigation={props.navigation} />}>
            <Drawer.Screen name="MainScreen" component={MainScreenDrawable} />
            <Drawer.Screen name="ServiceScreen" component={ServiceScreenDrawable} />
            <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;

