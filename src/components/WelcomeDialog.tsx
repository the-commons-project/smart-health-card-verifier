import React, { useEffect, useState } from 'react'
import {  StyleSheet, View, Text, Modal, useWindowDimensions, PixelRatio, ScrollView } from 'react-native'
import { useTranslation } from '../services/i18n/i18nUtils'
import { GetStartedButton } from './customButton'
import AppLogoSVG from '../../assets/img/icon_shc.svg'
import FontStyle from '../utils/FontStyleHelper'
import commonStyles from '../styles/common'
import { usePreferenceContext } from '../contexts/PreferenceContext'

export default ()=> {
  const { setOnboarded } = usePreferenceContext()
  const { t } = useTranslation()
  const [ modalVisible, setModalVisible ]= useState(true)
  const dimension = useWindowDimensions()

  const processConfirmation = ()=> {
    setOnboarded()
  }
  const deviceHeight = dimension.height
  const maxScrollable = { maxHeight: ( deviceHeight * 0.6 ) }
  const smallScreen = ( deviceHeight < 800 )
  const imageHeight = ( dimension.height * ( smallScreen ? .05 : .08 ) / PixelRatio.getFontScale() )
  const msg1 = 'Use this app to verify the SMART Health Cards of your customers or employees at your business.\n\n'
  const msg2 = 'PLEASE NOTE: This app does not save or store your digital credentials.'
  return ( <View style={ styles.container }>
    <Modal
      animationType="fade"
      transparent={ true }
      visible={ modalVisible }
      onRequestClose={ () => {
        console.log('onRequestClose')
      } }
    >
      <View style={ styles.centeredView }>
        <View style={ styles.modalView }>
          <ScrollView style={ [styles.scrollContainer, maxScrollable ] }>
            <View style={ styles.scrollContents }>
              <AppLogoSVG height={ imageHeight }  width={ imageHeight }/>
              <Text style={ [ smallScreen ? styles.welcomeTextSmlScreen : styles.welcomeText, 
                FontStyle.Poppins_700Bold,
              ] }>{ t('WelcomeDialog.Welcome', 'Welcome to the\nSMART Health Card\nVerifier App!') }</Text>
              <View style={ styles.textContainer }>
                <Text style={ [ smallScreen? styles.textStyleSmlScreen : styles.textStyle, FontStyle.OpenSans_400Regular, ] }>{ t('WelcomeDialog.WelcomeDescription1', msg1) }</Text>
                <Text style={ [ smallScreen? styles.textStyleSmlScreen : styles.textStyle, FontStyle.OpenSans_400Regular, styles.textBold] }>{ t('WelcomeDialog.PleaseNote', 'Please Note: ') }</Text>
                <Text style={ [ smallScreen? styles.textStyleSmlScreen : styles.textStyle, FontStyle.OpenSans_400Regular] }>{ t('WelcomeDialog.WelcomeDescription2', msg2) }</Text>
              </View>
            </View>
          </ScrollView>
          <GetStartedButton
            title={ t('WelcomeDialog.GetStarted', 'Get Started') }
            onPress={ processConfirmation }
            backgroundColor="#255DCB"
          />

        </View>
      </View>
    </Modal>
  </View>

  )
}

const styles = StyleSheet.create({
  container:
    commonStyles.dialogShade,
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // position:"relative"
  },
  scrollContainer: {
    backgroundColor: 'white',
  },
  scrollContents: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 28,
    lineHeight: 32,
    color: '#000000',
    textAlign: 'left',
  },
  welcomeTextSmlScreen: {
    marginTop: 20,
    fontSize: 20,
    lineHeight: 24,
    color: '#000000',
    textAlign: 'left',
  },
  textContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  textStyleSmlScreen: {
    color: '#616C8D',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'left'
  },

  textStyle: {
    color: '#616C8D',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'left'
  },
  textBold: {
    marginTop: 20,
    fontWeight: 'bold'
  }

})
