/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useContext, useRef } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { getProvider as getLocalProvider } from './src/contexts/LocaleContext'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { getProvider as getRemoteDataSyncProvider } from './src/contexts/RemoteDataSyncContext'
import { getProvider as getPreferenceProvider } from './src/contexts/PreferenceContext'
import { getProvider as getModuleProvider } from './src/contexts/ModuleContext'
import { Buffer } from 'buffer'

import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,

  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from './assets/fonts'

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'

import WelcomePage from './src/container/WelcomePage'
import ScanQRPage from './src/container/ScanQRPage'
import VerificationResultPage from './src/container/VerificationResultPage'
import ErrorPage from './src/container/ErrorPage'

import { RootStackParamList } from './src/types'
global.Buffer = Buffer

const Stack = createStackNavigator<RootStackParamList>()

const App = () => {
  const inputEl = useRef(null)

  const isDarkMode = useColorScheme() === 'dark'
  const [ LocaleProvider ] = getLocalProvider()
  const [ RemoteDataSyncProvider ] = getRemoteDataSyncProvider()
  const [ PreferenceProvider ] = getPreferenceProvider()
  const [ ModuleProvider ] = getModuleProvider()
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }
  return (
    <RemoteDataSyncProvider>
      <LocaleProvider> 
        <PreferenceProvider>
          <ModuleProvider> 
            <SafeAreaProvider>
              <NavigationContainer>
                <Stack.Navigator screenOptions={ { headerShown: false } }>
                  <Stack.Screen name="Welcome" component={ WelcomePage } />
                  <Stack.Screen name="ScanQR" component={ ScanQRPage } />
                  <Stack.Screen name="VerificationResult" component={ VerificationResultPage } />
                  <Stack.Screen name="Error" component={ ErrorPage } />
                </Stack.Navigator>
              </NavigationContainer>
            </SafeAreaProvider>
          </ModuleProvider>
        </PreferenceProvider>
      </LocaleProvider>
    </RemoteDataSyncProvider>
  )
}

export default App
