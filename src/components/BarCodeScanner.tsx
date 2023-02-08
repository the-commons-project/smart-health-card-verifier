import React, { ReactChildren, useState, useEffect } from 'react'
import QRCodeScanner, { OnScannedEvent } from 'react-native-raw-qrcode-scanner'
import { View, StyleSheet } from 'react-native'

export type CameraType = 'back' | 'front' | undefined

export interface BarcodeProps {
  children: JSX.Element[]
  onBarCodeScanned?: any
  type: CameraType
  styles?: any
}

const BarCodeScanner = ({ onBarCodeScanned, type, styles }: BarcodeProps) => {

  const handleScanner = ( data: OnScannedEvent ) => {
    if( data.results.length > 0 ){
      onBarCodeScanned( { data: data.results[0].text } )
    } 
  }

  return <View style={ styles }>
    <QRCodeScanner
      cameraType={ type }
      flashEnabled={false}
      scanEnabled={true}
      onScanned={handleScanner}
      isVibrateOnScan={true}
      style={ cameraStyles.camerPreview }
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
