import React, { useState } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'

type ResultBannerVariables = {
  content?: any
}

const images = {
  'warning': require('../../assets/img/verificationresult/warning.png'),
  'success': require('../../assets/img/verificationresult/success.png'),
  'fail': require('../../assets/img/verificationresult/fail.png'),
  'tick': require('../../assets/img/verificationresult/tick.png'),
  'cross': require('../../assets/img/verificationresult/cross.png'),
}

const ResultBanner = ({ content } : ResultBannerVariables) => {
  const [bannerState, setBannerState] = useState({
    icon: images.success,
    text: 'Verified',
    color: 'green',
    validityText: 'Valid SMART® Health Card',
    validityIcon: images.tick,
    verifiedIssuerText: 'Issuer verified',
    verifiedIssuerIcon: images.tick,
    subBorderColor: '',
  })

  const conditionParser = ({content}: any) => {
    switch(content) {
      case 'notVerified':
        setBannerState({
          icon: images.fail,
          text: 'Not Verified',
          color: 'red',
          validityText: 'This SMART Health Card cannot be verified. It may have been corrupted.',
          validityIcon: '',
          verifiedIssuerText: '',
          verifiedIssuerIcon: '',
          subBorderColor: 'red',
        })
        break
      case 'partlyVerified':
        setBannerState({
          icon: images.warning,
          text: 'Partially Verified',
          color: 'orange',
          validityText: 'Valid SMART® Health Card',
          validityIcon: images.tick,
          verifiedIssuerText: 'Issuer not verified',
          verifiedIssuerIcon: images.cross,
          subBorderColor: '',
        })
        break
      default:
        setBannerState({
          icon: images.success,
          text: 'Verified',
          color: 'green',
          validityText: 'Valid SMART® Health Card',
          validityIcon: images.tick,
          verifiedIssuerText: 'Issuer verified',
          verifiedIssuerIcon: images.tick,
          subBorderColor: '',
        })
    }
  }

  return (
    <View>
      <View style={styles.bannerContainer}>
        <Image style={styles.bannerImage} source={bannerState.icon} />
        <Text style={styles.bannerText}>{bannerState.text}</Text>
      </View>
      <View style={styles.subBannerContainer}>
        <View style={styles.flexRowContainer}>
          <Image source={bannerState.validityIcon} />
          <Text style={styles.subBannerText}>{bannerState.validityText}</Text>
        </View>
        <View style={styles.flexRowContainer}>
          <Image source={bannerState.verifiedIssuerIcon} />
          <Text style={styles.subBannerText}>{bannerState.verifiedIssuerText}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#67AC5B',
    borderRadius: 4,
    width: '100%',
    height: 56,
    flexDirection: 'row',
    marginTop: 8,
  },
  bannerImage: {
    paddingTop: 14,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
  },
  bannerText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    lineHeight: 33,
    fontWeight: '600',
    alignSelf: 'center',
  },
  subBannerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    width: '100%',
    height: 74,
    flexDirection: 'column',
    paddingTop: 8,
    paddingLeft: 16,
  },
  subBannerText: {
    fontSize: 14,
    color: '#67AC5B',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    lineHeight: 21,
    fontWeight: '600',
    alignSelf: 'center',
    paddingLeft: 10,
  },
  flexRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default ResultBanner