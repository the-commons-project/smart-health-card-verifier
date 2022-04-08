import React from 'react';
import { View, StyleSheet, Text, Image, useWindowDimensions, PixelRatio } from 'react-native';
import AppLogoSVG from '../../assets/img/icon_shc.svg'
const width =300
import FontStyle from '../utils/FontStyleHelper'
import { useTranslation } from '../services/i18n/i18nUtils' 

export default WelcomeDialogInner1 = ({ width }:{width: number})=> {
    //const { width } = useWindowDimensions();
    const { t } = useTranslation()
    return (
        <View style={[styles.container, { width }]}>
        <View>
            <Text style={styles.title}> { t('WelcomeDialog.HowItWorks', 'How it works') }</Text>
            <View>
            <Text style={styles.description}>Scan a SMART Health Card and one of three results will appears:</Text>
            <Image style={ styles.verificationResults } source={require('../../assets/img/issuerVerified.png')}/>
            </View>
            <View>
            <Text style={styles.description}>The SMART Health Card is valid and issued by a provider in the CommonTrust Network.</Text>
            <Image source={require('../../assets/img/issuerNotRecognized.png')}/>
            </View>
            <Text style={styles.description}>The SMART Health Card is valid but is not issued by a provider in the CommonTrust Network. Proceed with caution.</Text>
            <View>
            <Image source={require('../../assets/img/shcNotVerified.png')}/>
            <Text style={styles.description}>The SMART Health Card could be verified. It may have been corrupted or tampered with.</Text>
            
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
        paddingHorizontal: 0
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
      },
    logoSVG: {
        width: 150, height: 150, resizeMode: 'contain'
    },
    verificationResults: {
        
        alignItems: 'center',
        resizeMode: 'contain',
        justifyContent: 'center',
        
        
    }
});
