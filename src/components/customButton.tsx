import React from 'react'
import FontStyle from '../utils/FontStyleHelper'
import { StyleSheet, TouchableOpacity, Text, Image, PixelRatio } from 'react-native'

interface AppButtonVariables {
  onPress?: any
  title?: string
  backgroundColor?: any
}

const images = {
  barcodeScanner: require('../../assets/img/error/barcode-scanner.png'),
}

export const AppButton = ({ onPress, title, backgroundColor }: AppButtonVariables) => {
  return (
    <TouchableOpacity
      onPress={ onPress }
      style={ [styles.appButtonContainer, backgroundColor && { backgroundColor }] }
    >
      <Text style={ [styles.appButtonText, FontStyle.Poppins_600SemiBold] }>{ title }</Text>
      <Image style={ styles.appButtonImage } source={ images.barcodeScanner } />
    </TouchableOpacity>
  )
}

export const GetStartedButton = ({ onPress, title, backgroundColor }: AppButtonVariables) => {
  return (
    <TouchableOpacity
      onPress={ onPress }
      style={ [styles.appButtonContainer, backgroundColor && { backgroundColor }] }
    >
      <Text style={ [styles.appButtonText, FontStyle.Poppins_600SemiBold] }>{ title }</Text>
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
    flexWrap: 'wrap',
    justifyContent: 'center',
    minWidth: '100%',
  },
  appButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    alignSelf: 'stretch',
    marginRight: 10,
    textAlign: 'center'
  },
  appButtonImage: {
    maxHeight: 26 * PixelRatio.getFontScale(),
    maxWidth: 26 * PixelRatio.getFontScale(),
  },
})

export default AppButton
