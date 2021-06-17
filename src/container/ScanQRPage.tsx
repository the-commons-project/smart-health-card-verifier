import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Animated, Easing, Platform } from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Props } from '../../types'
import AppClickableImage from '../components/customImage'
import NotificationOverlay from '../components/notificationOverlay'

import { validate } from '../qr'

const images = {
  'leftCaret': require('../../assets/img/verificationresult/left-caret.png'),
  'loading': require('../../assets/img/error/loading.png'),
}

const ScanQRPage = ({ navigation }: Props) => {
  const [hasPermission, setHasPermission] = useState(true)
  const [scanned, setScanned] = useState(false)
  const [spinAnimation, setSpinAnimation] = useState(new Animated.Value(0))

  const spin = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  if(scanned) {
    Animated.loop(
      Animated.timing(spinAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    let validationResult = {}
    try {
      setScanned(true)

      validationResult = await validate([data])

      if (!validationResult || validationResult.isValid === 'false') {
        setScanned(false)
        navigation.navigate('Error')
        return
      }

      setScanned(false)
      navigation.navigate({ name: 'VerificationResult', params: { validationResult } })
    } catch (error) {
      setScanned(false)

      if (error.toString() === 'Error: Failed to download issuer JWK set') {
        validationResult.isValid = false

        navigation.navigate({ name: 'VerificationResult', params: { validationResult } })
        return
      }

      navigation.navigate('Error')
    }
  }

  const { isInternetReachable } = useNetInfo()

  const showCamera = hasPermission && isInternetReachable && !scanned

  return (
    <View style={styles.container}>
      <View style={styles.scannerContainer}>
        {!hasPermission &&
          <NotificationOverlay overlayState={true} type={'noCameraAccess'}/>
        }

        {!isInternetReachable &&
          <NotificationOverlay overlayState={true} type={'noInternetConnection'}/>
        }

        {scanned &&
          <Animated.Image style={[styles.spinner, {transform: [{rotate: spin}]}]} source={images.loading} />
        }

        {showCamera &&
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          >
            <View style={styles.backButtonContainer}>
              <AppClickableImage
                styles={styles.leftCaretImage}
                source={images.leftCaret}
                onPress={() => navigation.navigate('Welcome')}
              />
            </View>
          </BarCodeScanner>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: '#F3F6FF',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '100%',
  },
  backButtonContainer: {
    marginTop: '15%',
    height: 40,
    paddingLeft: 20,
    paddingTop: 20,
  },
  spinner: {
    maxHeight: 55,
    maxWidth: 55,
  },
  leftCaretImage: {
    width: 12,
    height: 19,
  },
})

export default ScanQRPage