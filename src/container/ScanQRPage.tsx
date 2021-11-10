import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Animated, Easing, Alert } from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Device from 'expo-device'
import { ErrorCode } from '../services/error'
import AppClickableImage from '../components/customImage'
import NotificationOverlay from '../components/notificationOverlay'
import { validate } from '../services/qr'
import { Props, BaseResponse } from '../types'

const images = {
  leftCaret: require('../../assets/img/verificationresult/left-caret.png'),
  loading: require('../../assets/img/error/loading.png'),
  switchCamera: require('../../assets/img/scanqr/switch-camera.png'),
}

const ScanQRPage = ({ navigation }: Props) => {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false)
  const [scanned, setScanned] = useState<boolean>(false)
  const [spinAnimation, setSpinAnimation] = useState(new Animated.Value(0))
  const [cameraType, setCameraType] = useState(BarCodeScanner.Constants.Type.back)

  const spin = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  useEffect(() => {
    ;(async () => {
      const OS = Device.osName?.toLowerCase()

      if (OS === 'android') {
        const cameraPermission = await BarCodeScanner.getPermissionsAsync()
        if (!cameraPermission.granted) {
          Alert.alert(
            'Camera Permission',
            'This app uses the camera to scan QR codes with COVID-19 vaccine certificates. This allows verifiers to verify the authenticity of COVID-19 vaccine certificates presented to them.',
            [
              {
                text: 'Cancel',
                onPress: () => navigation.navigate('Welcome'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: async () => {
                  const { status } = await BarCodeScanner.requestPermissionsAsync()
                  setHasCameraPermission(status === 'granted')
                },
              },
            ],
            { cancelable: false },
          )
        } else {
          const { status } = await BarCodeScanner.requestPermissionsAsync()
          setHasCameraPermission(status === 'granted')
        }
      } else {
        const { status: cameraPermissionStatus } = await BarCodeScanner.requestPermissionsAsync()
        setHasCameraPermission(cameraPermissionStatus === 'granted')
      }
    })()
  }, [])

  navigation.addListener('focus', () => {
    setScanned(false)
  })

  navigation.addListener('blur', () => {
    setScanned(true)
  })

  if (scanned) {
    Animated.loop(
      Animated.timing(spinAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()
  }

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    let validationResult: BaseResponse = {
      isValid: '',
      issuerData: {
        iss: '',
        logo_uri: '',
        name: '',
        updated_at: 0,
        url: '',
      },
      patientData: {
        dateOfBirth: '',
        name: '',
      },
      vaccinationData: [],
    }

    try {
      setScanned(true)
      validationResult = await validate([data])

      if (!validationResult || validationResult.isValid === 'false') {
        navigation.navigate('Error')
        return
      }

      navigation.navigate({ name: 'VerificationResult', params: { validationResult } })
    } catch (error: any) {
      if (error.toString() === 'Error: Failed to download issuer JWK set') {
        validationResult.isValid = false

        navigation.navigate({ name: 'VerificationResult', params: { validationResult } })
        return
      }

      if (error === ErrorCode.SERVER_ERROR) {
        navigation.navigate('Welcome')
        alert('Server Error. Please try to scan again.')

        return
      }

      navigation.navigate('Error')
    }
  }

  const { isInternetReachable } = useNetInfo()

  const showCamera = hasCameraPermission && isInternetReachable && !scanned

  const renderAccessError = () => {
    if (!hasCameraPermission)
      return <NotificationOverlay type={'noCameraAccess'} navigation={navigation} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.scannerContainer}>
        {renderAccessError()}

        {isInternetReachable === false && (
          <NotificationOverlay type={'noInternetConnection'} navigation={navigation} />
        )}

        {scanned && (
          <Animated.Image
            style={[styles.spinner, { transform: [{ rotate: spin }] }]}
            source={images.loading}
          />
        )}

        {showCamera && (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={[StyleSheet.absoluteFillObject, styles.barCodeScanner]}
            type={cameraType}
          >
            <View style={styles.backButtonContainer}>
              <AppClickableImage
                styles={styles.leftCaretImage}
                source={images.leftCaret}
                onPress={() => navigation.navigate('Welcome')}
              />
            </View>

            <View style={styles.switchCameraContainer}>
              <AppClickableImage
                styles={styles.switchCameraImage}
                source={images.switchCamera}
                onPress={() => {
                  setCameraType(
                    cameraType === BarCodeScanner.Constants.Type.back
                      ? BarCodeScanner.Constants.Type.front
                      : BarCodeScanner.Constants.Type.back,
                  )
                }}
              />
            </View>
          </BarCodeScanner>
        )}
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
    height: '100%'
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
  switchCameraContainer: {
    position: 'absolute',
    right: 50,
    bottom: 60,
  },
  switchCameraImage: {
    width: 48,
    height: 41,
  },
  barCodeScanner: {
    top: 0,
    bottom: 0
  }
})

export default ScanQRPage
