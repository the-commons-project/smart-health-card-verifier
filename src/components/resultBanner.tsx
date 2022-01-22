import React from 'react'
import { View, Image, StyleSheet, Text, PixelRatio} from 'react-native'
import { JwsValidationOptions } from '../services/jws/jws-compact'
import { ValidationResult } from '../types'
import FontStyle from '../utils/FontStyleHelper'
import { useTranslation } from '../services/i18nUtils'

const images = {
  warning: require('../../assets/img/verificationresult/warning.png'),
  success: require('../../assets/img/verificationresult/success.png'),
  fail: require('../../assets/img/verificationresult/fail.png'),
  tick: require('../../assets/img/verificationresult/tick.png'),
  cross: require('../../assets/img/verificationresult/cross.png'),
}

const ResultBanner = ({ validationResult}: ValidationResult ) => {
  const {t} = useTranslation()
  let icon = images.success
  let text = 'Verified'
  let color = '#158E00' // green
  let validityText = t('Result.ValidSmartHealthCard', 'Valid SMART® Health Card')
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
    verifiedIssuerText = 'The SMART® Health Card is valid, but the issuer is not in the CommonTrust Network\'s registry of trusted issuers.\n Tap for Details'
    verifiedIssuerIcon = images.cross
    verifiedColor = '#CE471C' // orange
  }

  return (
    <View >
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
          ) : ( !isIssuerRecognized ) ?
                (
                  <View 
                    style={[{ flexDirection: 'column', flexWrap: 'wrap' }]}>
                    <View style={styles.flexRowContainer}>
                      <Text style={[
                          styles.subBannerText,
                          FontStyle.Poppins_600SemiBold,
                          { color: verifiedColor, textAlign: "center"}
                        ]}
                      >
                        {verifiedIssuerText}
                      </Text>
                    </View>
                  </View>
                ):(
                  <View 
                    style={[{ flexDirection: 'column', flexWrap: 'wrap' }]}>
                    <View style={styles.flexRowContainer} >
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
                          { color: verifiedColor, textAlign: "left"},
                        ]}
                      >
                        {verifiedIssuerText}
                      </Text>
                    </View>
                  </View>
                )
           }
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
    minHeight: 56,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  bannerImage: {
    marginLeft: 16,
    marginRight: 16,
    height: 40,
    width: 40,
    alignSelf: 'center',
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
    minHeight: 74,
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
    width: 9 * PixelRatio.getFontScale(),
    height: 7 * PixelRatio.getFontScale(),
  },
  flexRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})

export default ResultBanner
