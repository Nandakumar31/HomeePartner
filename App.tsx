import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navigation from './src/navigator/Navigation'
import { ThemeProvider } from './src/context/ThemeContext'
import { Provider } from 'react-redux';
import store from './src/store/store'
import GetProfileProvider from './src/context/ProfileContext';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
      ...DefaultTheme.colors,
      primary: '#03894E', // Customize your primary color
      accent: '#f1c40f', // Customize your accent color
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <ThemeProvider>
          <GetProfileProvider>
            <Navigation />
          </GetProfileProvider>
        </ThemeProvider>
      </Provider>
    </PaperProvider>
  )
}

export default App

const styles = StyleSheet.create({})