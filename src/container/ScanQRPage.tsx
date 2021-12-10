import React, { useState, useEffect } from 'react'
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import { Platform, View, StyleSheet, Animated, Easing, Alert } from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo'
import BarCodeScanner from '../components/BarCodeScanner'
import { ErrorCode } from '../services/error'
import AppClickableImage from '../components/customImage'
import NotificationOverlay from '../components/notificationOverlay'
import { validate } from '../services/qr'
import { Props, BaseResponse } from '../types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const images = {
  leftCaret: require('../../assets/img/verificationresult/left-caret.png'),
  loading: require('../../assets/img/error/loading.png'),
  switchCamera: require('../../assets/img/scanqr/switch-camera.png'),
}

const isAndroid = Platform.OS?.toLowerCase() == 'android'
const cameraPermissionType = (isAndroid)? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;

const ScanQRPage = ({ navigation }: Props) => {

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false)
  const [scanned, setScanned] = useState<boolean>(false)
  const [spinAnimation, setSpinAnimation] = useState(new Animated.Value(0))
  const [cameraType, setCameraType] = useState(BarCodeScanner.Constants.Type.back)
  const insets = useSafeAreaInsets()
  const spin = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  useEffect(() => {
    (async () => {
      if ( isAndroid ) {
        var result = await check(cameraPermissionType) 
        if ( result != RESULTS.GRANTED) {
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
                  result = await request( cameraPermissionType )
                  setHasCameraPermission(result === RESULTS.GRANTED)
                },
              },
            ],
            { cancelable: false },
          )
        } else {
          result = await request( cameraPermissionType )
          setHasCameraPermission(result === RESULTS.GRANTED )
        }
      } else {
        result = await request( cameraPermissionType )
        setHasCameraPermission(result === RESULTS.GRANTED)
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
          <View >
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              type={cameraType}
              styles={styles.scannerContainer}
            >
            </BarCodeScanner>
              <View style={[styles.backButtonContainer, { top : ( insets.top +  styles.backButtonContainer.top)}]}>
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
          </View>

        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    position:"absolute",
    top: 20,
    left: 20,
    height: 40,
    paddingLeft: 20,
  },
  switchCameraContainer: {
    position: 'absolute',
    right: 50,
    bottom: 60,
  },
  spinner: {
    maxHeight: 55,
    maxWidth: 55,
  },
  leftCaretImage: {
    width: 12,
    height: 19,
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
