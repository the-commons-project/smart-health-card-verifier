import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Overlay } from 'react-native-elements'

type NotificationOverlayVariables = {
  overlayState?: any
  type?: any
}

const NotificationOverlay = ({ overlayState, type } : NotificationOverlayVariables) => {
  const [displayOverlay, setDisplayOverlay] = useState(overlayState)
  let title = ''
  let subtitle = ''

  if(type === 'noInternetConnection') {
    title = 'No internet connection'
    subtitle = 'Please check your internet connection and try again.'
  } else {
    title = 'No access to camera'
    subtitle = 'To continue, please enable camera access in Settings.'
  }

  return (
    <View>
      {displayOverlay &&
        <Overlay overlayStyle={ styles.overlayContainer } isVisible>
          <View style={ styles.modalContent }>
            <Text style={[styles.title, styles.text, { fontFamily: 'Poppins_600SemiBold' }]}>
              {title}
            </Text>
            <Text style={[styles.subtitle, styles.text, { fontFamily: 'OpenSans_600SemiBold' }]}>
              {subtitle}
            </Text>
            <TouchableOpacity onPress={() => {setDisplayOverlay(false)}}>
              <Text style={[styles.buttonText, { fontFamily: 'Poppins_600SemiBold' }]}>OK</Text>
            </TouchableOpacity>
          </View>
        </Overlay>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  overlayContainer: {
    height:'auto',
    justifyContent:'center',
  },
  modalContent: {
    maxWidth: 270,
    height: 154,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    paddingTop: 24,
    paddingBottom: 8,
    fontSize: 17,
    lineHeight: 22,
  },
  subtitle: {
    paddingBottom: 24,
    fontSize: 13,
    lineHeight: 18,
  },
  text: {
    color: '#000000',
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#255DCB',
  },
})

export default NotificationOverlay
