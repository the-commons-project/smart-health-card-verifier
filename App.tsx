import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import WelcomePage from './src/container/WelcomePage'
import ScanQRPage from './src/container/ScanQRPage'
import VerificationResultPage from './src/container/VerificationResultPage'
import ErrorPage from './src/container/ErrorPage'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="ScanQR" component={ScanQRPage} />
        <Stack.Screen name="VerificationResult" component={VerificationResultPage} />
        <Stack.Screen name="Error" component={ErrorPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
