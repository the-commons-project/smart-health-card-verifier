import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, PixelRatio} from 'react-native';
import FontStyle from '../utils/FontStyleHelper'
import { useTranslation } from '../services/i18n/i18nUtils' 


const images = {
    warning: require('../../assets/img/verificationresult/warning.png'),
    success: require('../../assets/img/verificationresult/success.png'),
    fail: require('../../assets/img/verificationresult/fail.png'),
    tick: require('../../assets/img/verificationresult/tick.png'),
    cross: require('../../assets/img/verificationresult/cross.png'),
  }


export default ({ style, width, isSmallScreen }:{style: any, width: number, isSmallScreen:boolean})=> {
    const msg1 = 'Issuer Not \n Recognized'
    const { t } = useTranslation()
    const verifiedColor = '#0E6B23'
    const warningColor = '#EA6300'
    const notVerifiedColor = '#C33E38'
    const textStyle = isSmallScreen? styles.descriptionSmlScreen: styles.description
    const bannerTextStyle = isSmallScreen ? styles.bannerTextSmlScreen:  styles.bannerText
    return (
        <ScrollView style={ styles.scrollView }>
            <View style={[styles.container, { ...style, width} ]}>
                <Text style={ [ {marginTop: ( isSmallScreen ? "10%":"20%" )}, isSmallScreen?styles.titleSmlScreen: styles.title] }>{ t('WelcomeDialog.HowItWorks', 'How it works') }</Text>
                <Text style={textStyle}>{ t('WelcomeDialog.WelcomeInner1Description1', "Scan a SMART Health Card and one of three results will appear:" ) }</Text>
                <View style={[ styles.bannerContainer, { backgroundColor: verifiedColor } ] }>
                    <Image style={ styles.bannerImage } source={ images.success } />
                    <Text

                      style={ [
                        bannerTextStyle,
                        { backgroundColor: verifiedColor },
                      ] }
                    >
                    { t('Result.Verified', 'Verified') }
                    </Text>
                </View>
                
                
                <Text style={textStyle}>{ t('WelcomeDialog.WelcomeInner1Verified', "The SMART Health Card is valid and issued by a provider in the CommonTrust Network.") }</Text>
                <View style={[ styles.bannerContainer, { backgroundColor: warningColor } ] }>
                    <Image style={ styles.bannerImage } source={ images.warning } />
                    <Text
                      style={ [
                        bannerTextStyle,
                        { backgroundColor: warningColor }
                      ] }
                    >
                        
                       { t('Result.IssuerNotRecognized', msg1) }
                    </Text>
                </View>
                <Text style={textStyle}>{ t('WelcomeDialog.WelcomeInner1PartiallyVerified', "The SMART Health Card is valid but is not issued by a provider in the CommonTrust Network. Proceed with caution.")} </Text>
                <View style={[ styles.bannerContainer, { backgroundColor: notVerifiedColor } ] }>
                    <Image style={ styles.bannerImage } source={ images.fail } />
                    <Text
                    
                      style={ [
                        bannerTextStyle,
                        { backgroundColor: notVerifiedColor },
                      ] }
                    >

                       { t('Result.NotVerified', 'Not Verified') }
                    </Text>
                </View>
                <Text style={textStyle}> { t('WelcomeDialog.WelcomeInner1NotVerified', "The SMART Health Card could not be verified. It may have been corrupted or tampered with.") }</Text>
            </View>
    </ScrollView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap:'wrap',
        paddingBottom: 20
    },
    title: {
        ...FontStyle.Poppins_700Bold, 
        fontSize: 35,
        lineHeight: 40,
        color: '#052049',
        textAlign: 'center',
        paddingTop: 5
      },
    titleSmlScreen: {
        ...FontStyle.Poppins_700Bold, 
        fontSize: 20,
        lineHeight: 28,
        color: '#052049',
        textAlign: "center",
        alignSelf:"center",
        flexShrink: 1,
        paddingTop: 5
      },
    description: {
        ...FontStyle.OpenSans_400Regular,
        flexShrink: 1,
        flexWrap: 'wrap',
        color: '#616C8D',
        fontSize: 20 / PixelRatio.getFontScale(),
        lineHeight: 28 / PixelRatio.getFontScale(),
        marginBottom: 20,
        marginTop:20

    },
    descriptionSmlScreen: {
        ...FontStyle.OpenSans_400Regular,
        marginTop: 20,
        marginBottom: 20,
        color: '#616C8D',
        fontSize: 16,
        lineHeight: 20,
    },
    verificationResults: {
        alignItems: 'center',
        resizeMode: 'contain',
        justifyContent: 'center',
    },
    bannerContainer: {
        width: '90%',
        backgroundColor: '#67AC5B',
        borderRadius: 4,
        minHeight: 56,
        alignItems: 'center',
        justifyContent:'flex-start',
        flexDirection: 'row',
        marginTop: 4,
        marginBottom: 4,
      },
    bannerImage: {
        marginLeft: 5,
        marginRight: 10,
        height: 40,
        width: 40,
      },
    bannerText: {
        ...FontStyle.Poppins_600SemiBold,
        color: '#FFFFFF',
        fontSize: 20,
        lineHeight: 24,
        alignSelf:'center',
        paddingTop: 3,
      },
    bannerTextSmlScreen: {
        ...FontStyle.Poppins_600SemiBold,
        color: '#FFFFFF',
        fontSize: 16 * PixelRatio.getFontScale(),
        lineHeight: 24 * PixelRatio.getFontScale(),
        alignSelf:'center',
        paddingTop: 3,
      },
    flexColumnContainer: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    scrollView: {
        alignSelf: 'flex-start'
    }
});
