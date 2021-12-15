import React from 'react'
import { View, Image, StyleSheet, Text, PixelRatio } from 'react-native'
import { JwsValidationOptions } from '../services/jws/jws-compact'
import { ValidationResult } from '../types'
import FontStyle from '../utils/FontStyleHelper'

const images = {
  warning: require('../../assets/img/verificationresult/warning.png'),
  success: require('../../assets/img/verificationresult/success.png'),
  fail: require('../../assets/img/verificationresult/fail.png'),
  tick: require('../../assets/img/verificationresult/tick.png'),
  cross: require('../../assets/img/verificationresult/cross.png'),
}

const ResultBanner = ({ validationResult }: ValidationResult) => {
  let icon = images.success
  let text = 'Verified'
  let color = '#158E00' // green
  let validityText = 'Valid SMART® Health Card'
  let validityIcon = images.tick
  let validityColor = '#0E6B23' // green
  let verifiedIssuerText = 'Issuer verified'
  let verifiedIssuerIcon = images.tick
  let verifiedColor = '#0E6B23' // green

  const isDocumentValid = validationResult.isValid === true

  if (!isDocumentValid) {
    icon = images.fail
    text = 'Not Verified'
    color = '#C33E38' //red
    validityText = 'This SMART Health Card cannot be verified. It may have been corrupted.'
    validityColor = '#C33E38' // red
  }

  const isIssuerRecognized = !!validationResult?.issuerData?.name

  if (isDocumentValid && !isIssuerRecognized) {
    icon = images.warning
    text = 'Partially Verified'
    color = '#EA6300' // orange
    verifiedIssuerText = 'Issuer not recognized'
    verifiedIssuerIcon = images.cross
    verifiedColor = '#CE471C' // orange
  }

  const isKeyValid = !!validationResult?.isValid === false 

  if (isKeyValid && !isDocumentValid) {
    icon = images.fail
    text = 'Not Verified'
    color = '#C33E38' //red
    validityText = 'This SMART Health Card cannot be verified. It may have been corrupted. (0001)'
    validityColor = '#C33E38' // red
  }

  return (
    <View>
      <View style={[styles.bannerContainer, { backgroundColor: color }]}>
        <Image style={styles.bannerImage} source={icon} />
        <Text style={[styles.bannerText, FontStyle.Poppins_600SemiBold]}>{text}</Text>
      </View>
      <View style={[styles.subBannerContainer, { borderColor: color }]}>
        {!isDocumentValid ? (
          <View style={styles.flexRowContainer}>
            <Text
              style={[
                styles.subBannerText,
                FontStyle.Poppins_600SemiBold,
                {color: validityColor },
              ]}
            >
              {validityText}
            </Text>
          </View>
        ) : (
          <View>
            <View style={styles.flexRowContainer}>
              <Image style={styles.subIcon} source={validityIcon} />
              <Text
                style={[
                  styles.subBannerText,
                  FontStyle.Poppins_600SemiBold,
                  { color: validityColor },
                ]}
              >
                {validityText}
              </Text>
            </View>
            <View style={styles.flexRowContainer}>
              <Image style={styles.subIcon} source={verifiedIssuerIcon} />
              <Text
                style={[
                  styles.subBannerText,
                  FontStyle.Poppins_600SemiBold,
                  { color: verifiedColor },
                ]}
              >
                {verifiedIssuerText}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#67AC5B',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    width: '100%',
    height: 56,
    flexDirection: 'row',
    marginTop: 16,
  },
  bannerImage: {
    marginTop: 7,
    marginLeft: 16,
    marginRight: 16,
    height: 40,
    width: 40,
  },
  bannerText: {
    fontSize: 22,
    color: '#FFFFFF',
    lineHeight: 33,
    alignSelf: 'center',
  },
  subBannerContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    width: '100%',
    height: 74,
    flexDirection: 'column',
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  subBannerText: {
    fontSize: 14,
    color: '#67AC5B',
    lineHeight: 21,
    alignSelf: 'center',
    paddingLeft: 10,
    paddingTop: 3,
  },
  subIcon: {
    width: 9,
    height: 7,
  },
  flexRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default ResultBanner
