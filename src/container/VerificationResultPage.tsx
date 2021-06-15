import React, { useState } from "react"
import { Text, View, Image, Button, StyleSheet } from "react-native"
import AppButton from '../components/customButton'
import AppClickableImage from '../components/customImage'
import ResultBanner from '../components/resultBanner'
import ResultRecord from '../components/resultRecord'
import { Props } from '../../types'

const images = {
  'qrError': require('../../assets/img/error/qr-error.png'),
  'leftCaret': require('../../assets/img/verificationresult/left-caret.png'),
}

const VerificationResultPage = ({ navigation }: Props) => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.backButtonContainer}>
        <AppClickableImage
          source={images.leftCaret}
          onPress={() => navigation.navigate('Welcome')}
        />
        <Text style={styles.backButtonText} onPress={() => navigation.navigate('Welcome')}> Verification result </Text>
      </View>
      <ResultBanner />
      <ResultRecord />
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
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: "center",
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

export default VerificationResultPage