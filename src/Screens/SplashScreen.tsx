import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

export const SplashScreen = ({navigation}:any) => {
  useEffect(() => {
    setTimeout(() => {
      const isLoggedIn = true; 
      navigation.replace(isLoggedIn ? "App" : "Auth");
    }, 2000); 
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
  );
};