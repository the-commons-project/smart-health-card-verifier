import React from 'react';
import { View, StyleSheet, Text, Image, useWindowDimensions, PixelRatio, ScrollView } from 'react-native';
import { useTranslation } from '../services/i18n/i18nUtils' 
import FontStyle from '../utils/FontStyleHelper'

const images = {
  test: require('../../assets/img/testResultIcon.png'),
  vaccine: require('../../assets/img/vaccineIcon.png'),
  
}
const warningColor = '#EA6300'

export default WelcomeDialogInner2 = ({ width }:{width: number})=> {
    const { t } = useTranslation()
    
    return (
        <ScrollView style={ styles.scrollView }>
        <View style={[styles.container, { width }, { flex: 1 } ]}>
            <View >
                    <Text style={styles.title}> { t('WelcomeDialog.HowItWorks', 'How it works') } </Text>
                    <Text style={styles.description}> { t('WelcomeDialog.WelcomeInner2Description1', "Scanning a SMART Health Card will show the type of record and relevant information") } </Text>
                <View style={[styles.titleInner, styles.testRecord ]}>
                <Text style={styles.title}>{ t('WelcomeDialog.TestRecord', "Test Record") } </Text>
                <View style={ [styles.flexColumnContainer, { width }] } >
                <Image style={ styles.recordImage }source={ images.test } />
                    <Text style={ styles.innerTestRecord }> { t('LabResult.title', "Test Result") }</Text>
                    <Text style={ styles.innerTestRecord }> { t('LabResult.tagCovid19', "COVID-19") }</Text>
                </View>
            </View>
            <Text style={ styles.description }> Or </Text>
            </View>
            <View style={[styles.titleInner, styles.testRecord ]}>
                <Text style={styles.title}> { t('ImmunizationResult.Title', "Vaccination Record") }</Text>
                <View style={ [styles.flexColumnContainer, { width }] } >
                <Image style = { styles.recordImage }source={ images.vaccine } />
                <View>
                <Text style={[ styles.innerTestRecord ]}> { t('ImmunizationResult.Title', "Vaccination Record") }</Text>
                <Text style={ styles.innerTestRecord }> { t('WelcomeDialog.DoseNumber', "Dose Number") }</Text>
            </View>
            </View>
            </View>
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

    },
    image: {
        flex: 0.7,
        justifyContent: 'center'
    }, 
    title: {
        fontWeight: '700',
        fontSize: 28,
        marginBottom: 5,
        color: '#052049',
        textAlign: 'center',
        marginTop: 0
    },
    titleInner: {
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: '#052049',
        textAlign: 'center',
        borderColor: '#4D72B5',
        borderWidth: 1,
        borderRadius: 5,
        width: 300,
        justifyContent: 'center',
        maxWidth: 300 
        
    },
    description: {
        fontWeight: '300',
        color: '#62656b',
        textAlign: 'center',
        paddingHorizontal: 0
    },
    innerComponent: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
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
    bannerContainerClosed: {
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4
      },
    bannerImage: {
        marginLeft: 8,
        marginRight: 8,
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
        maxWidth: 200,
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
    subIcon: {
        width: 9 * PixelRatio.getFontScale(),
        height: 7 * PixelRatio.getFontScale(),
      },
    flexColumnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    innerTestRecord: {
        backgroundColor: '#4D72B5',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#4D72B5',
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 5,
        fontSize: 14,
        color: '#FFFFFF',
        lineHeight: 21,
        alignSelf:'center',
        paddingTop: 1,
        justifyContent: 'space-between',
        fontWeight: '800',
        paddingRight: 5,
        paddingLeft: 5,
        marginBottom: 5,
        margin: 5
      },
    testRecord: {
        marginTop: 16
      },
    recordImage: {
        paddingLeft: 30,
        margin: 10
      },
    scrollView: {
        alignSelf: 'center'
    }
});
