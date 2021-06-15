import React, { useState } from "react"
import { Text, View, Image, Button, StyleSheet } from "react-native"
import AppButton from '../components/customButton'
import AppClickableImage from '../components/customImage'
import { Props } from '../../types'

const images = {
  'qrError': require('../../assets/img/error/qr-error.png'),
  'leftCaret': require('../../assets/img/verificationresult/left-caret.png'),
}

const ErrorPage = ({ navigation }: Props) => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.backButtonContainer}>
        <AppClickableImage
          source={images.leftCaret}
          onPress={() => navigation.navigate('Welcome')}
        />
        <Text style={styles.backButtonText} onPress={() => navigation.navigate('Welcome')}> Unsupported QR </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={images.qrError} />
        <Text style={styles.message}> Unfortunately we currently only support SMART Health Card QR codes </Text>
      </View>
      <AppButton
        title="Scan next health card"
        // onPress={() => navigation.navigate('ScanQR')}
        onPress={() => navigation.navigate('Welcome')}
        backgroundColor="#255DCB"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between",
  },
  imageContainer: {
    padding: 20,
    alignItems: "center",
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: "center",
  },
  message: {
    paddingTop: 65,
    textAlign: 'center',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 25,
    color: '#000000',
  },
  backButtonText: {
    paddingLeft: 10,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 30,
    color: '#255DCB',
  },
})

export default ErrorPage