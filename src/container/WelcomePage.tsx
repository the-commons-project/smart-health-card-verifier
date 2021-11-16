import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableWithoutFeedback,
  Dimensions,
  useWindowDimensions,
} from 'react-native'
import { Props } from '../types'
import AppButton from '../components/customButton'

import { version }  from '../../package.json';

const dimension = Dimensions.get('window')

const images = {
  smartLogo: require('../../assets/img/main/smart-logo.png'),
  handPhone: require('../../assets/img/main/hand-phone.png'),
}

const WelcomePage = ({ navigation }: Props) => {
  const [showVersion, setShowVersion] = useState(false)
  const deviceHeight = useWindowDimensions().height
  const minHeight = 800

  const showAppVersion = () => {
    setShowVersion(true)

    setTimeout(() => {
      setShowVersion(false)
    }, 1000)
  }

  return (
    <View style={styles.container}>
      <Image style={styles.smartLogoImage} source={images.smartLogo} />
      <View style={styles.screenContainer}>
        <View>
          <Text
            style={[
              deviceHeight < minHeight ? styles.welcomeTextMobile : styles.welcomeText,
              { fontFamily: 'Poppins', fontWeight:'bold' },
            ]}
          >
            Welcome!
          </Text>
          <Text style={[styles.mainTitle, { fontFamily: 'Poppins', fontWeight:'bold'}]}>
            SMART® Health Card Verifier
          </Text>
        </View>

        <TouchableWithoutFeedback onLongPress={showAppVersion}>
          <View>
            {showVersion && <Text style={styles.appVersion}>{version}</Text>}
            <Image
              style={deviceHeight < minHeight ? styles.handPhoneImageMobile : styles.handPhoneImage}
              source={images.handPhone}
            />
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.textContainer}>
          <Text style={[styles.subTitle, { fontFamily: 'Open Sans' }]}>
            {' '}
            Verify SMART® Health Card QR code in a safe and privacy-preserving way{' '}
          </Text>
          <AppButton
            title="Scan vaccination record"
            onPress={() => navigation.navigate('ScanQR')}
            backgroundColor="#255DCB"
          />
          <View style={styles.learnMoreContainer}>
            <Text
              style={[
                deviceHeight < minHeight ? styles.textMobile : styles.text,
                styles.link,
                styles.colorBlue,
                { fontFamily: 'Poppins' },
              ]}
              onPress={() =>
                Linking.openURL('https://thecommonsproject.org/smart-health-card-verifier')
              }
            >
              How to verify SMART® Health Cards
            </Text>
          </View>
          <View
            style={[
              deviceHeight < minHeight ? styles.aboutUsContainerMobile : styles.aboutUsContainer,
              styles.aboutUsFlex,
            ]}
          >
            <Text
              style={[
                styles.text,
                styles.link,
                styles.colorBlue,
                styles.aboutUsFlexSpacing,
                { fontFamily: 'Poppins', fontWeight:'600'}
              ]}
              onPress={() =>
                Linking.openURL('https://thecommonsproject.org/smart-health-card-verifier#shcv-1')
              }
            >
              About us
            </Text>
            <Text
              style={[
                styles.text,
                styles.link,
                styles.colorBlue,
                { fontFamily: 'Poppins', fontWeight:'600'}
              ]}
              onPress={() => Linking.openURL('https://thecommonsproject.org/verifier-privacy/')}
            >
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
    paddingTop: 10,
  },
  aboutUsContainer: {
    paddingBottom: 16,
  },
  aboutUsContainerMobile: {
    paddingBottom: 6,
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
    transform: [{ rotate: '-5deg' }],
    zIndex: 10,
  },
  handPhoneImage: {
    width: (dimension.width / 240) * 150,
    height: 250,
    resizeMode: 'contain',
  },
  handPhoneImageMobile: {
    width: (dimension.width / 240) * 100,
    height: 180,
    resizeMode: 'contain',
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
  welcomeTextMobile: {
    fontSize: 24,
    lineHeight: 36,
    color: '#255DCB',
    paddingTop: 70,
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
  textMobile: {
    fontSize: 16,
    paddingTop: 0,
    paddingBottom: 2,
  },
  privacyText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#000000',
  },
  colorBlue: {
    color: '#255DCB',
  },
  link: {
    textDecorationLine: 'underline',
  },
  aboutUsFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aboutUsFlexSpacing: {
    marginRight: 60,
    marginBottom: 50,
  },
})

export default WelcomePage
