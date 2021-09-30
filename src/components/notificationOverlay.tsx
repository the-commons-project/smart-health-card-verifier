import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import AppClickableImage from '../components/customImage'

type NotificationOverlayVariables = {
  navigation?: any
  type?: any
}

const images = {
  leftCaret: require('../../assets/img/verificationresult/left-caret.png'),
}

const NotificationOverlay = ({ type, navigation }: NotificationOverlayVariables) => {
  let title = ''
  let subtitle = ''

  if (type === 'noInternetConnection') {
    title = 'No internet connection'
    subtitle = 'Please check your internet connection and try again.'
  } else if (type === 'noCameraAccess') {
    title = 'No access to camera'
    subtitle = 'To continue, please enable camera access in Settings.'
  } else if (type === 'noLocationAccess') {
    title = 'No access to location'
    subtitle = 'To continue, please enable location access in Settings.'
  }

  return (
    <View style={styles.flexContainer}>
      <View>
        <AppClickableImage
          styles={styles.leftCaretImage}
          source={images.leftCaret}
          onPress={() => navigation.navigate('Welcome')}
        />
      </View>
      <View style={styles.notificationTextContainer}>
        <Text style={[styles.notificationTitle, { fontFamily: 'Poppins_600SemiBold' }]}>
          {title}
        </Text>
        <Text style={[styles.notificationSubtitle, { fontFamily: 'OpenSans_600SemiBold' }]}>
          {subtitle}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    paddingTop: '15%',
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#F3F6FF',
  },
  notificationTextContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationTitle: {
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 22,
    color: '#000000',
    paddingBottom: 8,
  },
  notificationSubtitle: {
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 18,
    color: '#000000',
  },
  leftCaretImage: {
    width: 12,
    height: 19,
  },
})

export default NotificationOverlay
