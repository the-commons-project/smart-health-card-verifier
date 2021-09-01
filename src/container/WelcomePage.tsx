import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, Linking, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { Props } from '../../types'
import AppButton from '../components/customButton'
import NotificationOverlay from '../components/notificationOverlay'

import appJson from '../../app.json'

const { version } = appJson.expo
const dimension = Dimensions.get('window');

const images = {
  'smartLogo': require('../../assets/img/main/smart-logo.png'),
  'handPhone': require('../../assets/img/main/hand-phone.png'),
}

const WelcomePage = ({ navigation }: Props) => {
  const [showVersion, setShowVersion] = useState(false)

  const showAppVersion = () => {
    setShowVersion(true)

    setTimeout(() => { setShowVersion(false) }, 1000)
  }

  return (
    <View style={styles.container}>
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
            <Text
              style={[styles.text, styles.link, styles.colorBlue, {fontFamily: 'Poppins_600SemiBold'}]}
              onPress={() => Linking.openURL('https://thecommonsproject.org/smart-health-card-verifier')}>
              How to verify SMART® Health Cards
            </Text>
          </View>
          <View style={[styles.aboutUsContainer, styles.aboutUsFlex]}>
            <Text
              style={[styles.text, styles.link, styles.colorBlue, styles.aboutUsFlexSpacing, {fontFamily: 'Poppins_600SemiBold'}]}
              onPress={() => Linking.openURL('https://thecommonsproject.org/smart-health-card-verifier#shcv-1')}>
              About us
            </Text>
            <Text
              style={[styles.text, styles.link, styles.colorBlue, {fontFamily: 'Poppins_600SemiBold'}]}
              onPress={() => Linking.openURL('https://thecommonsproject.org/verifier-privacy/')}>
              Privacy policy
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
    paddingTop: 17,
  },
  aboutUsContainer: {
    paddingBottom: 16,
  },
  textContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  appVersion: {
    fontSize: 10,
    color: '#255DCB',
    left: '28%',
    top: '40%',
    position: 'absolute',
    transform: [{ rotate: '-5deg'}],
    zIndex: 10
  },
  handPhoneImage: {
    width: dimension.width / 240 * 150,
    height: 250,
    resizeMode: 'contain'
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
    paddingBottom: 15,
  },
  text: {
    fontSize: 13,
    paddingTop: 5,
    paddingBottom: 5,
  },
  colorBlue: {
    color: '#255DCB',
  },
  link: {
    textDecorationLine: 'underline',
  },
  aboutUsFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  aboutUsFlexSpacing: {
    marginRight: 60,
    marginBottom: 50
  }
})

export default WelcomePage