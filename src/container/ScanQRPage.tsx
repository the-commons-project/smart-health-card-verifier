import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Props } from '../../types'
import AppClickableImage from '../components/customImage'

const images = {
  'leftCaret': require('../../assets/img/verificationresult/left-caret.png'),
}

const ScanQRPage = ({ navigation }: Props) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    alert(`Bar code with type ${type} and data ${data} has been scanned!`)
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <AppClickableImage
          styles={styles.imageStyling}
          source={images.leftCaret}
          onPress={() => navigation.navigate('Welcome')}
        />
      </View>
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyling: {
    // backgroundColor: '#000',
  },
  backButtonContainer: {
    height: 40,
    width: '100%',
    paddingLeft: 10,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
})

export default ScanQRPage