import React from 'react'
import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native'

type AppButtonVariables = {
  onPress?: any
  title?: string
  backgroundColor?: any
}

const images = {
  barcodeScanner: require('../../assets/img/error/barcode-scanner.png'),
}

const AppButton = ({ onPress, title, backgroundColor }: AppButtonVariables) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.appButtonContainer, backgroundColor && { backgroundColor }]}
    >
      <Text style={[styles.appButtonText, { fontFamily: 'Poppins', fontWeight:'600'}]}>{title}</Text>
      <Image style={styles.appButtonImage} source={images.barcodeScanner} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    minWidth: '100%',
  },
  appButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    alignSelf: 'stretch',
    marginRight: 10,
  },
  appButtonImage: {
    maxHeight: 26,
    maxWidth: 26,
  },
})

export default AppButton
