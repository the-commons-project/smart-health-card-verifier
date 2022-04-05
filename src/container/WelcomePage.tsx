import React, { useState, useContext, useEffect } from 'react'
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
import WelcomeDialog from '../components/WelcomeDialog'
import { AppButton } from '../components/customButton'
import FontStyle from '../utils/FontStyleHelper'
import { version }  from '../../package.json'
import CompanyLogoSVG from '../../assets/img/main/companylogo.svg'
import { useTranslation } from '../services/i18n/i18nUtils'
import { usePreferenceContext } from '../contexts/PreferenceContext'

const dimension = Dimensions.get('window')
const images = {
  smartLogo: require('../../assets/img/main/smart-logo.png'),
  handPhone: require('../../assets/img/main/hand-phone.png'),
}

const imageHeight = ( dimension.height * .30 / PixelRatio.getFontScale() )

const WelcomePage = ({ navigation }: Props) => {
  const [showVersion, setShowVersion] = useState(false)
  const prefState = usePreferenceContext()
  const [ dialogVisible, setDialogVisible ] = useState(false)

  const { t, i18n } = useTranslation()
  const deviceHeight = useWindowDimensions().height
  const minHeight = 800
  const showAppVersion = () => {
    setShowVersion(true)

    setTimeout(() => {
      setShowVersion(false)
    }, 1000)
  }
  return (
    <View style={ styles.container }>
      <ScrollView style={ styles.scrollContainer }>
        <View style={ styles.scrollerContents }>
          <Image style={ styles.smartLogoImage } source={ images.smartLogo } />
          <View style={ styles.screenContainer }>
            <View>
              <Text
                style={ [
                  deviceHeight < minHeight ? styles.welcomeTextMobile : styles.welcomeText,
                  FontStyle.Poppins_700Bold,
                ] }
              >
                { t('Welcome.Title', 'Welcome!') }
              </Text>
              <Text style={ [styles.mainTitle, FontStyle.Poppins_700Bold] }>
                { t('Welcome.SHCV', 'SMART® Health Card Verifier') }
              </Text>
            </View>

            <TouchableWithoutFeedback onLongPress={ showAppVersion }>
              <View style={ ( deviceHeight > minHeight && PixelRatio.getFontScale() <= 1 ) ? { paddingTop: (40/PixelRatio.getFontScale()), paddingBottom:(40/PixelRatio.getFontScale()) }:{} }>
                { showVersion && <Text style={ styles.appVersion }>{ version }</Text> }
                <Image
                  style={ deviceHeight < minHeight ? styles.handPhoneImageMobile : styles.handPhoneImage }
                  source={ images.handPhone }
                />
              </View>
            </TouchableWithoutFeedback>

            <View style={ styles.textContainer }>
              <Text style={ [styles.subTitle, FontStyle.OpenSans_400Regular] }>
                { t('Welcome.VerifySmartHealthCard', 'Verify SMART® Health Card QR codes in a safe and privacy-preserving way') }
              </Text>
              <AppButton
                title={ t('Welcome.ScanVaccinationRecord', 'Scan vaccination record') }
                onPress={ () => navigation.navigate('ScanQR') }
                backgroundColor="#255DCB"
              />
              <View style={ styles.learnMoreContainer }>
                <Text
                  style={ [
                    deviceHeight < minHeight ? styles.textMobile : styles.text,
                    styles.link,
                    styles.colorBlue,
                    FontStyle.Poppins_600SemiBold
                  ] }
                  onPress={ async () =>
                    await Linking.openURL(`https://thecommonsproject.org/smart-health-card-verifier?lang=${i18n.language}`)
                  }
                >
                  { t('Welcome.HowTo', 'How to verify SMART® Health Cards') }
                </Text>
              </View>
              <View
                style={ styles.aboutUsFlex }
              >
                <Text
                  style={ [
                    styles.text,
                    styles.link,
                    styles.colorBlue,
                    styles.aboutUsFlexSpacing,
                    FontStyle.Poppins_600SemiBold,
                  ] }
                  onPress={ async () =>
                    await Linking.openURL(`https://thecommonsproject.org/smart-health-card-verifier#shcv-1?lang=${i18n.language}` )
                  }
                >
                  { t('Welcome.AboutUs', 'About us' ) }
                </Text>
                <Text
                  style={ [
                    styles.text,
                    styles.link,
                    styles.colorBlue,
                    FontStyle.Poppins_600SemiBold,
                  ] }
                  onPress={ async () => await Linking.openURL(`https://thecommonsproject.org/verifier-privacy/?lang=${i18n.language}`) }
                >
                  { t('Welcome.PrivacyPolicy', 'Privacy policy') }
                </Text>
              </View>
            </View>
            <View style={ styles.logoContainer }>
              <CompanyLogoSVG style={ styles.logo } height={ 60 } />
            </View>

          </View>
        </View>
      </ScrollView>
      { !prefState.isOnboarded && <WelcomeDialog /> }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height:'100%',
    backgroundColor: '#FF0000',
    padding: 0
  },
  scrollContainer: {
    position:'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height:'100%',
    backgroundColor: '#F3F6FF',
    paddingTop: 0,
    paddingStart: 12,
    paddingEnd: 12,
    paddingBottom: 12
  },
  logoContainer: {
    margin: 0,
    width: '100%',
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
    top: 40,
  },
  welcomeText: {
    fontSize: 24,
    lineHeight: 36,
    color: '#255DCB',
    paddingTop: 50,
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
