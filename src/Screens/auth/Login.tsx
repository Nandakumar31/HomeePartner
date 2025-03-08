import { View, Text } from 'react-native'
import React from 'react'

export default function Login({navigation}:any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Login Screen</Text>
    {/* <Button title="Login" onPress={() => navigation.replace("App")} /> */}
  </View>
  )
}