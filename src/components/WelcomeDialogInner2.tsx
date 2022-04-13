import React from 'react';
import { View, StyleSheet, Text, Image, useWindowDimensions, PixelRatio, ScrollView } from 'react-native';
import { useTranslation } from '../services/i18n/i18nUtils' 
import FontStyle from '../utils/FontStyleHelper'
import ImmunizationSVG from '../../assets/img/verificationresult/immunizationIcon.svg'
import LabResultIconSVG from '../../assets/img/verificationresult/labResultIcon.svg'

const warningColor = '#EA6300'

export default ({ style, width, isSmallScreen }:{style: any, width: number, isSmallScreen:boolean})=> {
    const { t } = useTranslation()
    const titleInner = isSmallScreen ? styles.titleInnerSmlScreen:  styles.titleInner
    const description = isSmallScreen ? styles.descriptionSmlScreen : styles.description
    const titleStryle = isSmallScreen ? styles.titleSmlScreen : styles.title
    const tagStyle = isSmallScreen? styles.tagRecordSmlScreen : styles.tagRecord
    const tagTitleStyle = isSmallScreen? styles.tagTitleSmlScreen : styles.tagTitle
    const tagContainerStyle = isSmallScreen? styles.tagContainerSmlScreen : styles.tagContainer
    const iconSize = Math.floor( width * 0.20 )
    return (
        <ScrollView style={ styles.scrollView }>
            <View style={[styles.container, {  ...style, width } ]}>
                <Text style={ [ {marginTop: ( isSmallScreen ? "10%":"20%" )},titleStryle ] }>{ t('WelcomeDialog.HowItWorks', 'How it works') } </Text>
                <Text style={description}> { t('WelcomeDialog.WelcomeInner2Description1', "Scanning a SMART Health Card will show the type of record and relevant information") } </Text>
                <View style={[titleInner, styles.testRecord ]}>
                    <View style={ [styles.flexColumnContainer] } >
                        <LabResultIconSVG width={iconSize} height={iconSize}/>
                        <View style={tagContainerStyle}>
                            <Text style={ tagTitleStyle}>{ t('WelcomeDialog.TestRecord', "Test Record") }</Text>
                            <Text style={ [styles.tag, tagStyle] }>{ t('LabResult.title', "Test Result") }</Text>
                            <Text style={ [styles.tag, tagStyle] }>{ t('LabResult.tagCovid19', "COVID-19") }</Text>
                        </View>
                    </View>
                </View>
                <Text style={description }> Or </Text>
                <View style={[titleInner, styles.testRecord ]}>
                    <View style={ [styles.flexColumnContainer] } >
                        <ImmunizationSVG width={iconSize} height={iconSize}/>
                        <View style={tagContainerStyle}>
                            <Text style={tagTitleStyle}>{ t('ImmunizationResult.Title', "Vaccination Record") }</Text>
                            <Text style={ [styles.tag, tagStyle] }>{ t('ImmunizationResult.Title', "Vaccination Record") }</Text>
                            <Text style={ [styles.tag, tagStyle]}>{ t('WelcomeDialog.DoseNumber', "Dose Number") }</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection:"column",
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 20
    },
    image: {
        flex: 0.7,
        justifyContent: 'center'
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
        paddingTop: 5
      },
    titleInner: {
        width: "90%",
        padding: 10,
        color: '#052049',
        borderColor: '#4D72B5',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
    },
    titleInnerSmlScreen: {
        width: "90%",
        padding: 10,
        color: '#052049',
        borderColor: '#4D72B5',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
    },
    description: {
        ...FontStyle.OpenSans_400Regular,
        flexWrap: 'wrap',
        color: '#616C8D',
        fontSize: 20 / PixelRatio.getFontScale(),
        lineHeight: 28 / PixelRatio.getFontScale(),
        marginBottom: 20,
        marginTop: 20


    },
    descriptionSmlScreen: {
        ...FontStyle.OpenSans_400Regular,
        marginTop: 10,
        marginBottom: 10,
        color: '#616C8D',
        fontSize: 16,
        lineHeight: 20
    },
    innerComponent: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    flexColumnContainer: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    tagContainer: {
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-start',
        flex:1,
        paddingLeft:10,
    },
    tagContainerSmlScreen: {
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-start',
        flex:1,
        paddingLeft:5,
    },
    tag: {
        marginRight:10,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 5,
        flexShrink:1,
        alignContent: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        backgroundColor: '#4D72B5'
    },
    tagRecordSmlScreen: {
        ...FontStyle.Poppins_700Bold,
        fontSize: 10,
        color: '#FFFFFF',
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 2
    },
    tagRecord: {
        ...FontStyle.Poppins_700Bold,
        fontSize: 14,
        color: '#FFFFFF',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 2
    },
    tagTitle: {
        ...FontStyle.Poppins_700Bold, 
        width: "100%",
        fontSize: 24,
        lineHeight: 30,
        color: '#052049',
    },
    tagTitleSmlScreen: {
        ...FontStyle.Poppins_700Bold, 
        fontSize: 20,
        lineHeight: 22,
        color: '#052049',

    },
    testRecord: {
        marginTop: 16
    },
    scrollView: {
        alignSelf: 'flex-start'
    }
});
