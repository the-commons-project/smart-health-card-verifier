import React, { ReactChildren, useState } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { View, StyleSheet } from "react-native";


export type BarcodeProps = {
  children: ReactChildren
  onBarCodeScanned?: any
  type: string,
  styles?: any
}

const BarCodeScanner = ({ children, onBarCodeScanned, type, styles}: BarcodeProps) => {

	return <View style={styles}>
          <QRCodeScanner
            style={[{height: '100%'}]} 
            reactivate={true}
            showMarker={true}
            cameraStyle={cameraStyles.camerPreview}
            containerStyle={cameraStyles.cameraContainer}
            onRead={onBarCodeScanned}
          >
          </QRCodeScanner>
          {children}
        </View>

}

const Type = 
  {
    back: "back",
    front: "front"
  };

const Constants = {
  Type
}

BarCodeScanner.Constants = Constants
    
const cameraStyles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
  camerPreview: {
    flex: 1,
    alignItems: 'center',
    minHeight:"100%"
  }
})



export default BarCodeScanner