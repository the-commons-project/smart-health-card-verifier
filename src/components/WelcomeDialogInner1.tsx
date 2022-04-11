import React from 'react';
import { View, StyleSheet, Text, Image, useWindowDimensions, PixelRatio } from 'react-native';
import FontStyle from '../utils/FontStyleHelper'
import { useTranslation } from '../services/i18n/i18nUtils' 


const images = {
    warning: require('../../assets/img/verificationresult/warning.png'),
    success: require('../../assets/img/verificationresult/success.png'),
    fail: require('../../assets/img/verificationresult/fail.png'),
    tick: require('../../assets/img/verificationresult/tick.png'),
    cross: require('../../assets/img/verificationresult/cross.png'),
  }

export default WelcomeDialogInner1 = ({ width }:{width: number})=> {
    const { t } = useTranslation()
    let verifiedColor = '#0E6B23'
    let warningColor = '#EA6300'
    let notVerifiedColor = '#C33E38'
    
    return (
        <View style={[styles.container, { width }]}>
        <View>
            <Text style={styles.title}> { t('WelcomeDialog.HowItWorks', 'How it works') }</Text>
            <View>
            <Text style={styles.description}>{ t('WelcomeDialog.WelcomeInner1Description1', "Scan a SMART Health Card and one of three results will appear:" ) }</Text>
            <View style={[ styles.bannerContainer, styles.bannerContainerClosed, { backgroundColor: verifiedColor } ] }>
            <View style={ [styles.flexColumnContainer, ,{ width:width }] } >
            <Image style={ styles.bannerImage } source={ images.success } />
                <Text

                  style={ [
                    styles.bannerText,
                    FontStyle.Poppins_600SemiBold,
                    { backgroundColor: verifiedColor },
                  ] }
                >
                    
                { t('Result.Verified', 'Verified') }
                </Text>
                </View>
            </View>
            <View>
            </View>
            <Text style={styles.description}>{ t('WelcomeDialog.VerifiedWelcomeDialog', "The SMART Health Card is valid and issued by a provider in the CommonTrust Network.") }</Text>
            <View style={[ styles.bannerContainer, styles.bannerContainerClosed, { backgroundColor: warningColor } ] }>
            <View style={ [styles.flexColumnContainer, ,{ width:width }] } >
            <Image style={ styles.bannerImage } source={ images.warning } />
                <Text

                  style={ [
                    styles.bannerText,
                    FontStyle.Poppins_600SemiBold,
                    { backgroundColor: warningColor },
                  ] }
                >
                    
                   { t('Result.IssuerNotRecognized', 'Issuer Not Recognized') }
                </Text>
                </View>
            </View>
            </View>
            <Text style={styles.description}> { t('WelcomeDialog.PartiallyVerifiedWelcomeDialog', "The SMART Health Card is valid but is not issued by a provider in the CommonTrust Network. Proceed with caution.")} </Text>
            <View>
            <View style={[ styles.bannerContainer, styles.bannerContainerClosed, { backgroundColor: notVerifiedColor }, { width:width } ] }>
            <View style={ [styles.flexColumnContainer, { width:width }] } >
            <Image style={ styles.bannerImage } source={ images.fail } />
                <Text

                  style={ [
                    styles.bannerText,
                    FontStyle.Poppins_600SemiBold,
                    { backgroundColor: notVerifiedColor },
                  ] }
                >
                    
                   { t('Result.NotVerified', 'Not Verified') }
                </Text>
                </View>
            </View>
            <Text style={styles.description}> { t('WelcomeDialog.NotVerifiedWelcomeDialog', "The SMART Health Card could not be verified. It may have been corrupted or tampered with.") }</Text>
            
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
    },
    title: {
        fontWeight: '700',
        fontSize: 28,
        marginBottom: 10,
        color: '#052049',
        textAlign: 'center'
    },
    description: {
        fontWeight: '300',
        color: '#62656b',
        textAlign: 'center',
        paddingHorizontal: 12,
        paddingTop: 10
    },
    innerComponent: {
        backgroundColor: `#7fffd4`,
        flex: 1,
        alignItems: 'center',
    },
    textContainer: {
        marginTop: 20,
        marginBottom: 20,
      },
    logoSVG: {
        width: 150, height: 150, resizeMode: 'contain'
    },
    verificationResults: {
        alignItems: 'center',
        resizeMode: 'contain',
        justifyContent: 'center',
    },
    bannerContainer: {
        backgroundColor: '#67AC5B',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        minHeight: 56,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 16,
      },
      bannerContainerClosed: {
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        marginLeft: 10,
        marginRight: 10
      },
      bannerImage: {
        marginLeft: 16,
        marginRight: 16,
        height: 40,
        width: 40,
      },
      bannerText: {
        fontSize: 20,
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
        color: '#FFFFFF',
        lineHeight: 21,
        alignSelf:'center',
        paddingLeft: 10,
        paddingTop: 3,
      },
      flexColumnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }
});
