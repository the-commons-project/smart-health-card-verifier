import React from 'react'
import { View, StyleSheet, Text, Image, useWindowDimensions, PixelRatio, ScrollView } from 'react-native'
import AppLogoSVG from '../../assets/img/icon_shc.svg'
import FontStyle from '../utils/FontStyleHelper'
import { useTranslation } from '../services/i18n/i18nUtils'
const msg1 = 'Use this app to verify the SMART Health Cards of your customers or employees at your business.'
const msg2 = 'This app does not save or store your digital credentials.'
/* eslint react-native/no-inline-styles: "off" */
export default ({ style, width, isSmallScreen }: {style: any, width: number, isSmallScreen: boolean})=> {
  const { t } = useTranslation()
  const dimension = useWindowDimensions()
  const imgSize = Math.abs( width / 4 )
  const imgMarginTop = Math.abs( imgSize  )
  const imgMarginBottom = Math.abs( imgSize  / 2 )

  return (
    <ScrollView style={ [ style, styles.scrollView ] }>
      <View style={ [styles.container, { width, paddingTop: imgMarginTop }] }> 
        <AppLogoSVG height={ imgSize }  width={ imgSize } style={ { marginBottom: imgMarginBottom } }/>
        <Text style={ isSmallScreen ? styles.welcomeTextSmlScreen : styles.welcomeText }>{ t('WelcomeDialog.Welcome', 'Welcome to the\nSMART Health Card\nVerifier App') }</Text>
        <View style={ styles.contents }>
          <Text style={ isSmallScreen ? styles.textStyleSmlScreen : styles.textStyle } >{ t('WelcomeDialog.WelcomeDescription1', msg1) }</Text>
          <Text style={ [ ( isSmallScreen ? styles.textStyleSmlScreen :  styles.textStyle ), FontStyle.OpenSans_700Bold, { marginTop: 20 }] }>{ t('WelcomeDialog.PleaseNote', 'Please Note:') }</Text>
          <Text style={ isSmallScreen ? styles.textStyleSmlScreen : styles.textStyle }>{ t('WelcomeDialog.WelcomeDescription2', msg2) }</Text>
        </View>
      </View>
    </ScrollView>
            
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center'
  },
  contents: {
    flexDirection: 'row',
    flexWrap:'wrap',
    alignItems: 'flex-start'
  },
  welcomeText: {
    ...FontStyle.Poppins_700Bold, 
    marginTop: 35,
    marginBottom: 30,
    fontSize: 30,
    lineHeight: 40,
    color: '#052049',
    textAlign: 'center',
  },
  welcomeTextSmlScreen: {
    ...FontStyle.Poppins_700Bold, 
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    lineHeight: 28,
    color: '#052049',
    textAlign: 'center'
  },
  textStyleSmlScreen: {
    ...FontStyle.OpenSans_400Regular,
    marginTop: 10,
    color: '#616C8D',
    fontSize: 16,
    lineHeight: 20,
  },
  textStyle: {
    ...FontStyle.OpenSans_400Regular,
    flexShrink: 1,
    color: '#616C8D',
    fontSize: 20 / PixelRatio.getFontScale(),
    lineHeight: 28 / PixelRatio.getFontScale()
  },
  textBold: {
    marginTop: 20,
    fontWeight: 'bold'
  },
  scrollView: {
    alignSelf: 'flex-start'
  }
})
