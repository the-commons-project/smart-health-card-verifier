import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import WelcomePage from './src/container/WelcomePage'
import ScanQRPage from './src/container/ScanQRPage'
import VerificationResultPage from './src/container/VerificationResultPage'
import ErrorPage from './src/container/ErrorPage'

import AppLoading from 'expo-app-loading'

import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'

import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans'

//TODO: CSS values convert to relative values(!px, em or something)
//TODO: Consolidated and clean up duplicated css
//TODO: Clean up fontFamily

const Stack = createStackNavigator()

const App = () => {
  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_700Bold,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="ScanQR" component={ScanQRPage} />
        <Stack.Screen name="VerificationResult" component={VerificationResultPage} />
        <Stack.Screen name="Error" component={ErrorPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
