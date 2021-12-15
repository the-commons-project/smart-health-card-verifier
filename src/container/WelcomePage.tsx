import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  useWindowDimensions,
  PixelRatio
} from 'react-native'
import { Props } from '../types'
import AppButton from '../components/customButton'
import FontStyle from '../utils/FontStyleHelper'
import { version }  from '../../package.json';
import CompanyLogoSVG from '../../assets/img/main/companylogo.svg';

const dimension = Dimensions.get('window')
const images = {
  smartLogo: require('../../assets/img/main/smart-logo.png'),
  handPhone: require('../../assets/img/main/hand-phone.png'),
}

const imageHeight = ( dimension.height * .30 / PixelRatio.getFontScale() );

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
      <ScrollView style={styles.container}>
        <View style={styles.scrollerContents}>
          <Image style={styles.smartLogoImage} source={images.smartLogo} />
          <View style={styles.screenContainer}>
            <View>
              <Text
                style={[
                  deviceHeight < minHeight ? styles.welcomeTextMobile : styles.welcomeText,
                  FontStyle.Poppins_700Bold,
                ]}
              >
                Welcome! 
              </Text>
              <Text style={[styles.mainTitle, FontStyle.Poppins_700Bold]}>
                SMART® Health Card Verifier
              </Text>
            </View>

            <TouchableWithoutFeedback onLongPress={showAppVersion}>
              <View style={( deviceHeight > minHeight && PixelRatio.getFontScale() <= 1 ) ? { paddingTop: (40/PixelRatio.getFontScale()), paddingBottom:(40/PixelRatio.getFontScale()) }:{}}>
                {showVersion && <Text style={styles.appVersion}>{version}</Text>}
                <Image
                  style={deviceHeight < minHeight ? styles.handPhoneImageMobile : styles.handPhoneImage}
                  source={images.handPhone}
                />
              </View>
            </TouchableWithoutFeedback>

            <View style={styles.textContainer}>
              <Text style={[styles.subTitle, FontStyle.OpenSans_400Regular]}>
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
                    FontStyle.Poppins_600SemiBold
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
                  styles.aboutUsFlex,
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    styles.link,
                    styles.colorBlue,
                    styles.aboutUsFlexSpacing,
                    FontStyle.Poppins_600SemiBold,
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
                    FontStyle.Poppins_600SemiBold,
                  ]}
                  onPress={() => Linking.openURL('https://thecommonsproject.org/verifier-privacy/')}
                >
                  Privacy policy
                </Text>
              </View>
            </View>
            <View style={styles.logoContainer}>
              <CompanyLogoSVG style={styles.logo} height={60} />
            </View>

          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F3F6FF',
    paddingTop: 12,
    paddingStart: 12,
    paddingEnd: 12,
    paddingBottom: 12
  },
  logoContainer: {
    margin: 0,
    width: "100%",
  },
  logo: {
    justifyContent: 'center', 
    alignSelf: 'center'
  },
  screenContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  scrollerContents: {
    flex: 1,
    paddingTop: 0,
    paddingStart: 0,
    paddingEnd: 0,
    paddingBottom: 0
  },

  learnMoreContainer: {
    flexDirection: 'row',
    paddingTop: 10,
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
    height: imageHeight,
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
    top: 50,
  },
  welcomeText: {
    fontSize: 24,
    lineHeight: 36,
    color: '#255DCB',
    paddingTop: 60,
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
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  aboutUsFlexSpacing: {
    marginRight: 60
  },
})

export default WelcomePage
