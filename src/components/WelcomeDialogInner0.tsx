import React from 'react';
import { View, StyleSheet, Text, Image, useWindowDimensions, PixelRatio } from 'react-native';
import AppLogoSVG from '../../assets/img/icon_shc.svg'
import FontStyle from '../utils/FontStyleHelper'
import { useTranslation } from '../services/i18n/i18nUtils'

const msg1 = 'Use this app to verify the SMART Health Cards of your customers or employees at your business.\n\n'
const msg2 = 'PLEASE NOTE: This app does not save or store your digital credentials.'
const width = 300

export default WelcomeDialogInner0 = ({ width }:{width: number})=> {
    const { t } = useTranslation()
    return (
        <View style={[styles.container, { width }]}> 
        <View style={styles.container }>
        <AppLogoSVG height={ 75 }  width={ 75 }  />
        <View >
              <Text style={ [ styles.welcomeTextSmlScreen, styles.welcomeText,
                FontStyle.Poppins_700Bold,
              ] }>{ t('WelcomeDialog.Welcome', 'Welcome to the\nSMART Health Card\nVerifier App!') }</Text>
              
                <Text style={ [ styles.textStyleSmlScreen, styles.textStyle, FontStyle.OpenSans_400Regular, ] } >{ t('WelcomeDialog.WelcomeDescription1', msg1) }</Text>
                <Text style={ [ styles.textStyleSmlScreen, styles.textStyle, FontStyle.OpenSans_400Regular, ] }>{ t('WelcomeDialog.PleaseNote', 'Please Note: ') }</Text>
                <Text style={ [ styles.textStyleSmlScreen, styles.textStyle, FontStyle.OpenSans_400Regular, ] }>{ t('WelcomeDialog.WelcomeDescription2', msg2) }</Text>
              </View>
              </View>
        </View>
    
    
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300
    },
    image: {
        flex: 0.7,
        justifyContent: 'center'
    },
    title: {
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: '#493d8a',
        textAlign: 'center'
    },
    description: {
        fontWeight: '300',
        color: '#62656b',
        textAlign: 'center',
        paddingHorizontal: 64
    },
    innerComponent: {
        backgroundColor: `#7fffd4`,
        flex: 1,
        alignItems: 'center',
        width: '100%'
    },
    textContainer: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
      },
    logoSVG: {
        width: 150, height: 150, resizeMode: 'contain'
    },
    verificationResults: {
        
        alignItems: 'center',
        resizeMode: 'contain',
        justifyContent: 'center',    
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
        textAlign: 'center',
      },
    welcomeTextSmlScreen: {
        marginTop: 20,
        fontSize: 20,
        lineHeight: 24,
        color: '#000000',
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
        textAlign: 'center'
      },
    textBold: {
        marginTop: 20,
        fontWeight: 'bold'
      },
});