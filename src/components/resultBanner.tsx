import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, Text, PixelRatio, useWindowDimensions } from 'react-native'
import { JwsValidationOptions } from '../../libs/shc-verifier-plugin/src/services/jws/jws-compact'
import { ValidationResult } from '../types'
import FontStyle from '../utils/FontStyleHelper'
import { useTranslation } from '../services/i18n/i18nUtils'
import { getIsSmallScreen } from '../utils/utils'

const warningColor = '#EA6300'
const images = {
  warning: require('../../assets/img/verificationresult/warning.png'),
  success: require('../../assets/img/verificationresult/success.png'),
  fail: require('../../assets/img/verificationresult/fail.png'),
  tick: require('../../assets/img/verificationresult/tick.png'),
  cross: require('../../assets/img/verificationresult/cross.png'),
}
/* eslint  react-native/no-inline-styles: "off" */
const ResultBanner = ({ validationResult, showDetail }: ValidationResult ) => {
  const isDocumentValid = validationResult.isValid
  const isIssuerRecognized = !!validationResult?.issuerData?.name
  const { t } = useTranslation()
  let icon = images.success
  let text = t('Result.Verified', 'Verified')
  let color = '#158E00' // green
  let validityText = t('Result.ValidSmartHealthCard', 'Valid SMART® Health Card')
  const validityIcon = images.tick
  let validityColor = '#0E6B23' // green
  let verifiedIssuerText = t('Result.IssuerVerified', 'Issuer Not Recognized')
  let verifiedIssuerIcon = images.tick
  let verifiedColor = '#0E6B23' 
  const dimension     = useWindowDimensions()
  const isSmallScreen = getIsSmallScreen( dimension.width )
  if (!isDocumentValid) {
    icon = images.fail
    text = t('Result.NotVerified', 'Not Verified')
    color = '#C33E38' // red
    validityText = t('Result.NotVerifiedText', 'This SMART Health Card cannot be verified. It may have been corrupted.')
    if ( validationResult.errorCode > 0 ) {
      validityText += ` (${validationResult.errorCode})`
    }
    validityColor = '#C33E38' // red
  }

  if (isDocumentValid && !isIssuerRecognized) {
    icon = images.warning
    text = t('Result.IssureNotRecognized', 'Partially Verified')
    color = '#EA6300' // orange
    verifiedIssuerText = t('Result.PartialVerifiedText', 'The SMART® Health Card is valid, but the issuer is not in the CommonTrust Network\'s registry of trusted issuers.')
    verifiedIssuerIcon = images.cross
    verifiedColor = '#CE471C' // orange
  }

  return (
    <View >
      <View key="1" style={ [styles.bannerContainer, { backgroundColor: color }, !showDetail && styles.bannerContainerClosed ] }>
        <Image style={ isSmallScreen ? styles.bannerImageSmlScreen : styles.bannerImage } source={ icon } />
        <Text style={ [isSmallScreen ? styles.bannerTextSmlScreen : styles.bannerText, FontStyle.Poppins_600SemiBold] }>{ text }</Text>
      </View>
      { showDetail && 
      <View  key="2"  style={ [styles.subBannerContainer, { borderColor: color }] }>
        { !isDocumentValid ? (
          <View style={ styles.flexRowContainer }>
            <Text
              style={ [
                styles.subBannerText,
                FontStyle.Poppins_600SemiBold,
                { color: validityColor },
              ] }
            >
              { validityText }
            </Text>
          </View>
        ) : ( !isIssuerRecognized ) ?
          (
            <View 
              style={ styles.bannerDetail }>
              <View style={ styles.flexRowContainer }>
                <Text style={ [
                  styles.subBannerText,
                  FontStyle.Poppins_600SemiBold,
                  { color: verifiedColor, textAlign: 'center' }
                ] }
                >
                  { verifiedIssuerText }
                </Text>
                <Text
                  style={ [
                    styles.subBannerText,
                    styles.clickHere,
                    FontStyle.Poppins_600SemiBold,
                    { color: verifiedColor },
                  ] }>{ t('Result.TapHere', 'Tap to expand details') }
                </Text>
              </View>
            </View>
          ):(
            <View 
              style={ styles.flexRowContainer }>
              <View style={ styles.flexColumnContainer } >
                <Image style={ styles.subIcon } source={ validityIcon } />
                <Text

                  style={ [
                    styles.subBannerText,
                    FontStyle.Poppins_600SemiBold,
                    { color: validityColor },
                  ] }
                >
                  { validityText }
                </Text>
              </View>
              <View  style={ styles.flexColumnContainer } >
                <Image style={ styles.subIcon } source={ verifiedIssuerIcon } />
                <Text
                  style={ [
                    styles.subBannerText,
                    FontStyle.Poppins_600SemiBold,
                    { color: verifiedColor, textAlign: 'center' },
                  ] }
                >
                  { verifiedIssuerText }
                </Text>
              </View>
            </View>
          )
        }
      </View>
      }
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
    marginBottom:0,
    justifyContent: 'flex-start'
  },
  bannerDetail: {
    flexDirection: 'column', 
    flexWrap: 'wrap'
  },
  bannerContainerClosed: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  bannerImage: {
    marginLeft: 5,
    marginRight: 5,
    height: 40,
    width: 40,
    alignSelf: 'center',
  },
  bannerImageSmlScreen: {
    marginLeft: 5,
    marginRight: 5,
    height: 35,
    width: 35,
    alignSelf: 'center',
  },
  bannerText: {
    flex:1,
    fontSize: 23,
    color: '#FFFFFF',
    lineHeight: 30,
    flexWrap: 'wrap',
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    alignSelf: 'center'
  },
  bannerTextSmlScreen: {
    flex:1,
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 20,
    flexWrap: 'wrap',
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
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
    marginTop:-1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  subBannerText: {
    fontSize: 14,
    color: '#67AC5B',
    lineHeight: 21,
    alignSelf:'center',
    paddingLeft: 10,
    paddingTop: 3,
  },
  subIcon: {
    width: 9 * PixelRatio.getFontScale(),
    height: 7 * PixelRatio.getFontScale(),
  },
  flexRowContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  flexColumnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%',
    justifyContent: 'flex-start',
  },
  clickHere:{
    marginTop: 5,
    marginBottom:5,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    color:'#CE471C'
  }            

})

export default ResultBanner
