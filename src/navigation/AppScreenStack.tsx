import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreens from './MainScreens';
const Drawer = createDrawerNavigator();
const AppScreenStack = () => {
  return (
    <Drawer.Navigator initialRouteName="MainScreens">
    <Drawer.Screen name="MainScreens" component={MainScreens} />
    {/* <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
  </Drawer.Navigator>
  )
}

export default AppScreenStack