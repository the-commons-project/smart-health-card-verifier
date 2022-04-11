import React from 'react';
import { View, StyleSheet, Text, Image, useWindowDimensions } from 'react-native';
import { useTranslation } from '../services/i18n/i18nUtils' 

const images = {
    icon: require('../../assets/img/onboardingIcon.png')
}
export default WelcomeDialogInner3 = ({width}:{width: number})=> {
    const { t } = useTranslation()
    return (
        <View style={[styles.container, { width }]}>
             <View style={{ flex: .5 }}>
                <Text style={styles.title}> { t('WelcomeDialog.WelcomeInner3Title', "Don't forget!")} </Text>
                <Image style={{ alignSelf: 'center' } }source={ images.icon } />
                <Text style={styles.description}> { t('WelcomeDialog.WelcomeInner3Description', "Always verifiy identity of the SMART Health Card holder wih a government-issued I.D.")} </Text>
            </View>
        </View>
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
        flex: 0.7,
        justifyContent: 'center'
    }, 
    title: {
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: '#052049',
        textAlign: 'center',
        justifyContent: 'center'
    },
    description: {
        fontWeight: '300',
        color: '#62656b',
        textAlign: 'center',
        paddingHorizontal: 28,
        paddingTop: 10
    },
    innerComponent: {
        backgroundColor: `#7fff00`,
        flex: 1,
        alignItems: 'center',
        width: '100%'
        
    }
});
