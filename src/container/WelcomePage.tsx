import React from "react"
import { View, Text, Image, StyleSheet, Linking } from "react-native"
import { Props } from '../../types'
import AppButton from '../components/customButton'

const images = {
  'ellipseLightBlue': require('../../assets/img/main/ellipse-light-blue.png'),
  'circleBlue': require('../../assets/img/main/circle-blue.png'),
  'crossRoad': require('../../assets/img/main/crossroad.png'),
  'smartHealthCardPhone': require('../../assets/img/main/smart-health-card-phone.png'),
  'smartLogo': require('../../assets/img/main/smart-logo.png'),
  'commonLinkLogo': require('../../assets/img/main/common-link-logo.png'),
  'affinidiLogo': require('../../assets/img/main/affinidi-logo.png'),
  'rightCaret': require('../../assets/img/main/right-caret.png'),
}

const WelcomePage = ({ navigation }: Props) => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.screenContainer}>
        <View style={styles.flexContainer}>
          <Image style={styles.ellipseLightBlueImage} source={images.ellipseLightBlue} />
          <Image style={styles.smartLogoImage} source={images.smartLogo} />
          <Image style={styles.circleBlueImage} source={images.circleBlue} />
          <Image style={styles.crossRoadImage} source={images.crossRoad} />
          <Image style={styles.smartHealthCardPhoneImage} source={images.smartHealthCardPhone} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.welcomeTitle}> Welcome to SMART® Health Card Verifier </Text>
          <Text style={styles.subTitle}> Verify SMART® Health Card QR code in a safe and privacy-preserving way </Text>
          <AppButton
            title="Scan vaccination record"
            // onPress={() => navigation.navigate('ScanQR')}
            onPress={() => navigation.navigate('VerificationResult')}
            backgroundColor="#255DCB"
          />
          <Text style={styles.linkText} onPress={() => Linking.openURL('https://docs.google.com/document/d/1wtHEZH8i5pD8zw5M-kHUy1hpKNb_fUSb3pobSNliXX0/edit?ts=60c75c53#')}>
            About {" "}
            <Image source={images.commonLinkLogo} />
            {" "} The Commons Project {" "}
            <Image source={images.rightCaret} />
          </Text>
        </View>
      </View>
      <View style={styles.affinidiTextContainer}>
        <Text style={styles.affinidiText}>
          Powered by {" "}
          <Image source={images.affinidiLogo} />
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  flexContainer: {
    flex: 1,
  },
  textContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 8,
  },
  affinidiTextContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },
  ellipseLightBlueImage: {
    position: 'absolute',
    width: 456,
    height: 456,
    left: 66,
    top: -40,
  },
  smartLogoImage: {
    position: 'absolute',
    width: 99,
    height: 51,
    left: 247,
    top: 24,
  },
  circleBlueImage: {
    position: 'absolute',
    width: 88,
    height: 88,
    left: 21,
    top: 59,
  },
  smartHealthCardPhoneImage: {
    position: 'absolute',
    borderRadius: 20,
    width: 221,
    height: 221,
    left: 127,
    top: 87,
  },
  crossRoadImage: {
    position: 'absolute',
    borderRadius: 20,
    width: 147,
    height: 147,
    left: 36,
    top: 259,
  },
  welcomeTitle: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 36,
    textAlign: 'center',
    color: '#000000',
  },
  subTitle: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    alignItems: 'center',
    color: '#292B52',
    paddingTop: 12,
    paddingBottom: 22,
  },
  linkText: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 27,
    color: '#255DCB',
    paddingTop: 10,
    paddingBottom: 5,
  },
  affinidiText: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 15,
    color: '#363B98',
    paddingTop: 20,
  },
})

export default WelcomePage