import React, { ReactChildren, useState, useEffect } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { RNCamera } from 'react-native-camera'
import { View, StyleSheet } from 'react-native'

export type CameraType = 'back' | 'front' | undefined

export interface BarcodeProps {
  children: JSX.Element[]
  onBarCodeScanned?: any
  type: CameraType
  styles?: any
}

const BarCodeScanner = ({ onBarCodeScanned, type, styles }: BarcodeProps) => {
  return <View style={ styles }>
    <QRCodeScanner
      reactivate={ true }
      showMarker={ false }
      cameraType={ type }
      cameraStyle={ cameraStyles.camerPreview }
      cameraContainerStyle={ cameraStyles.cameraContainerStyle}
      cameraProps={ {
        style: cameraStyles.camerPreview,
        autoFocus: RNCamera.Constants.AutoFocus.on, 
        barCodeTypes:[RNCamera.Constants.BarCodeType.qr]
      } }
      containerStyle={ cameraStyles.cameraContainer }
      onRead={ onBarCodeScanned }
    />
  </View>

}

const Type = 
  {
    back: 'back',
    front: 'front'
  }

const Constants = {
  Type
}

BarCodeScanner.Constants = Constants
    
const cameraStyles = StyleSheet.create({
  cameraContainer: {
    position:"absolute",
    top: 0,
    left: 0,
    width:"100%",
    height:"100%",
  },
  cameraContainerStyle: {
    position:"absolute",
    top: 0,
    left: 0,
    width:"100%",
    height:"100%",
  },
  camerPreview: {
    flex: 1,
    alignItems: 'center',
    minHeight:'100%',
    width:'100%'
  }
})

export default BarCodeScanner
