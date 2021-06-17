import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, Linking, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { Props } from '../../types'
import AppButton from '../components/customButton'
import NotificationOverlay from '../components/notificationOverlay'
import { useNetInfo } from '@react-native-community/netinfo'

import appJson from '../../app.json'

const { version } = appJson.expo
const dimension = Dimensions.get('window');

const images = {
  'smartLogo': require('../../assets/img/main/smart-logo.png'),
  'handPhone': require('../../assets/img/main/hand-phone.png'),
}

const WelcomePage = ({ navigation }: Props) => {
  const [showVersion, setShowVersion] = useState(false)
  const { isInternetReachable } = useNetInfo()

  const showAppVersion = () => {
    setShowVersion(true)

    setTimeout(() => { setShowVersion(false) }, 1000)
  }

  return (
    <View style={styles.container}>
      {!isInternetReachable &&
        <NotificationOverlay overlayState={true} type={'noInternetConnection'}/>
      }
      <Image style={styles.smartLogoImage} source={images.smartLogo} />
      <View style={styles.screenContainer}>
        <View>
          <Text style={[styles.welcomeText, {fontFamily: 'Poppins_700Bold'}]}>Welcome!</Text>
          <Text style={[styles.mainTitle, {fontFamily: 'Poppins_700Bold'}]}>SMART® Health Card Verifier</Text>
        </View>

        <TouchableWithoutFeedback onLongPress={showAppVersion}>
          <View>
            { showVersion &&
              <Text style={styles.appVersion}>{version}</Text>
            }
            <Image style={styles.handPhoneImage} source={images.handPhone} />
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.textContainer}>
          <Text style={[styles.subTitle, {fontFamily: 'OpenSans_400Regular'}]}> Verify SMART® Health Card QR code in a safe and privacy-preserving way </Text>
          <AppButton
            title='Scan vaccination record'
            onPress={() => navigation.navigate('ScanQR')}
            backgroundColor='#255DCB'
          />
          <View style={styles.learnMoreContainer}>
            <Text style={[styles.text, {fontFamily: 'Poppins_600SemiBold'}]}>Learn more about us </Text>
            <Text
              style={[styles.text, styles.link, {fontFamily: 'Poppins_600SemiBold'}]}
              onPress={() => Linking.openURL('https://docs.google.com/document/d/1wtHEZH8i5pD8zw5M-kHUy1hpKNb_fUSb3pobSNliXX0/edit?ts=60c75c53#')}>
              here
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#F3F6FF',
  },
  learnMoreContainer: {
    flexDirection: 'row',
    paddingBottom: 30,
    paddingTop: 17,
  },
  textContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  appVersion: {
    fontSize: 10,
    color: '#255DCB',
    left: '29%',
    top: '40%',
    position: 'absolute',
    transform: [{ rotate: '-5deg'}],
    zIndex: 10
  },
  handPhoneImage: {
    width: dimension.width / 240 * 150,
    height: 256,
    resizeMode: 'stretch'
  },
  smartLogoImage: {
    position: 'absolute',
    width: 71,
    height: 37,
    right: 19,
    top: 69,
  },
  welcomeText: {
    fontSize: 24,
    lineHeight: 36,
    color: '#255DCB',
    paddingTop: 88,
  },
  mainTitle: {
    fontSize: 32,
    lineHeight: 48,
    color: '#000000',
    textAlign: 'left',
  },
  subTitle: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    alignItems: 'center',
    color: '#292B52',
    paddingTop: 0,
    paddingBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#000000',
    paddingTop: 10,
    paddingBottom: 5,
  },
  link: {
    color: '#255DCB',
    textDecorationLine: 'underline',
  },
})

export default WelcomePage