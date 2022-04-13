import React from 'react';
import { View, StyleSheet, Text, Image, useWindowDimensions, ScrollView, PixelRatio } from 'react-native';
import { useTranslation } from '../services/i18n/i18nUtils' 
import FontStyle from '../utils/FontStyleHelper'
import OnboardingSVG from '../../assets/img/welcomeDialog/onboardingIcon.svg'

export default ({ style, width, isSmallScreen }:{style: any, width: number, isSmallScreen:boolean})=> {
    const { t } = useTranslation()
    const onboardingIconWidth = Math.floor( width * 0.3 ) 

    return (
        <ScrollView  style={ styles.scrollView }>
        <View style={[styles.container, { width }]}>
            <Text style={isSmallScreen? styles.titleSmlScreen :  styles.title}> { t('WelcomeDialog.WelcomeInner3Title', "Don't forget!")} </Text>
            <OnboardingSVG style={{ alignSelf: 'center' } } width={onboardingIconWidth} height={onboardingIconWidth} />
            <Text style={isSmallScreen? styles.descriptionSmlScreen : styles.description }> { t('WelcomeDialog.WelcomeInner3Description', "Always verifiy identity of the SMART Health Card holder wih a government-issued I.D.")} </Text>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
        marginTop: 100
    },
    image: {
        justifyContent: 'center'
    }, 
    title: {
        ...FontStyle.Poppins_700Bold, 
        fontSize: 36,
        lineHeight: 40,
        color: '#052049',
        textAlign: 'center',
        marginBottom: 25,
        paddingTop: 5
      },
    titleSmlScreen: {
        ...FontStyle.Poppins_700Bold, 
        fontSize: 20,
        lineHeight: 28,
        color: '#052049',
        textAlign: "center",
        alignSelf:"center",
        marginBottom: 20,
        paddingTop: 5
    },

    description: {
        ...FontStyle.OpenSans_400Regular,
        flexShrink: 1,
        flexWrap: 'wrap',
        color: '#616C8D',
        fontSize: 20 / PixelRatio.getFontScale(),
        lineHeight: 28 / PixelRatio.getFontScale(),
        marginTop: 25,
        padding: 5
    },

    descriptionSmlScreen: {
        ...FontStyle.OpenSans_400Regular,
        marginTop: 20,
        marginBottom: 20,
        color: '#616C8D',
        fontSize: 16,
        lineHeight: 20,
    },
    scrollView: {
        alignSelf: 'center'
    }
});
