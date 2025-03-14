
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent/index.components';
import Wallet from '../screens/DrawerScreens/Wallet';
import Earnings from '../screens/DrawerScreens/Earnings';
import ReferEarn from '../screens/DrawerScreens/ReferEarn';
import Support from '../screens/DrawerScreens/Support';
import TermsConditions from '../screens/DrawerScreens/TermsConditions';
import RewardIncentives from '../screens/DrawerScreens/RewardIncentives';
import DashBoardScreen from '../screens/DashBoardScreen';
import ProfileEditScreen from '../screens/DrawerScreens/ProfileEditScreen';




const Drawer = createDrawerNavigator();
console.log('drawerscreen');



const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right'
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
      detachInactiveScreens

    >
      <Drawer.Screen name="DashBoard" component={DashBoardScreen} />
      <Drawer.Screen name="Earnings" component={Earnings} />
      <Drawer.Screen name="Wallet" component={Wallet} />
      <Drawer.Screen name="RewardIncentives" component={RewardIncentives} />
      <Drawer.Screen name="ReferEarn" component={ReferEarn} />
      <Drawer.Screen name="Support" component={Support} />
      <Drawer.Screen name="TermsConditions" component={TermsConditions} />
       <Drawer.Screen name="ProfileEdit" component={ProfileEditScreen} />

    </Drawer.Navigator>
   
  )
}

export default DrawerNavigation