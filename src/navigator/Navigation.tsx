import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/auth/Login';
import DrawerNavigation from './DrawerNavigation';
import RewardIncentives from '../screens/DrawerScreens/RewardIncentives';
import ItemsCheck from '../screens/ArrivedScreens/ItemsCheck';
import OrderHelp from '../screens/ArrivedScreens/OrderHelp';
import { ProfileContext } from '../context/ProfileContext';
import VerificationScreen from '../components/RegistrationComp/VerificationScreen';
const Stack = createStackNavigator();

const Navigation = () => {

  const { profile }: any = useContext(ProfileContext);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!!profile?.profileStatus ? (
          <>
            <Stack.Screen name="Drawer" component={DrawerNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="ItemsCheck" component={ItemsCheck} options={{ headerShown: false }} />
            <Stack.Screen name="OrderHelp" component={OrderHelp} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Verification" component={VerificationScreen} options={{ headerShown: false }} />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})