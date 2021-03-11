import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LottieView from 'lottie-react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from './app/config/colors'

import Screen from './app/components/Screen'
import AppText from './app/components/AppText';
import SplashScreen from './app/screens/SplashScreen';

export default function App() {
  return (
    <Screen>
      <View style={styles.container}>
        <View>
          <AppText style={styles.nearest}>Nearest tractor is</AppText>
          <AppText>45 min(s) away</AppText>
        </View>
        <View style={styles.profile}>
          <MaterialCommunityIcons name="account" size={25} color={colors.white} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nearest: {
    color: colors.light,
  },
  profile: {
    width: 40,
    height: 40,
    backgroundColor: colors.light,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});