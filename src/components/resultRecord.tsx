import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, PixelRatio, useWindowDimensions } from 'react-native'
import { Table, Row } from 'react-native-table-component'
import AppClickableImage from './customImage'
import { Data } from '../types'
import FontStyle from '../utils/FontStyleHelper'
import { useTranslation } from '../services/i18n/i18nUtils'
import ImmunizationRecordRow, { GetResultTitle as GetImmunizationResultTitle } from './ImmunizationRecordRow'
import LabResultRecordRow, { GetResultTitle  as GetLabResultTitle } from './LabResultRecordRow'
import { RecordType } from '../services/fhir/fhirTypes'

const images = {
  commonTrustVerified: require('../../assets/img/verificationresult/common-trust-verified.png'),
  smartLogo: require('../../assets/img/verificationresult/smart-logo.png'),
  eyes: require('../../assets/img/verificationresult/eyes.png'),
  warningCross: require('../../assets/img/verificationresult/warning-cross.png'),
}

/* eslint  react-native/no-inline-styles: "off" */
const ResultRecord = ({ data }: Data) => {
  const windowWidth = useWindowDimensions().width

  const { t } = useTranslation()
  const [boolBirthDate, setBoolBirthDate] = useState(false)
  const { validationResult } = data
  const { issuerData, patientData, recordType, recordEntries } = validationResult
  const { names, dateOfBirth } = patientData
  const userFieldTitle = [t('Result.Name', 'Name')]
  const userDobTitle = [t('Result.DOB', 'Date of Birth')]
  const userDobValue = [insertImageToTable()]
  const resultTitle  = ( recordType === RecordType.covid19Immunization )?
    GetImmunizationResultTitle( windowWidth, validationResult) : (recordType === RecordType.covid19LabResult) ? 
      GetLabResultTitle( windowWidth, validationResult ) : null
  
  function insertImageToTable () {
    const date = boolBirthDate ? dateOfBirth : '**/**/****'
    return (
      <View style={ { flexDirection: 'row', alignItems: 'center' } }>
        <Text
          style={ [
            styles.fieldValue,
            styles.increaseFont,
            FontStyle.OpenSans_700Bold, 
            { marginRight: 20 },
          ] }
        >
          { date }
        </Text>
        <AppClickableImage
          styles={ styles.eyesImage }
          source={ images.eyes }
          onPress={ () => {
            setBoolBirthDate(!boolBirthDate)
          } }
        />
      </View>
    )
  }

  return (
    <View style={ styles.recordContainer }>
      <View>
        { resultTitle != null && resultTitle }
        <View style={ styles.divider } />

        <Table borderStyle={ styles.tableStyle }>
          <Row
            data={ userFieldTitle }
            textStyle={ [styles.fieldTitle, FontStyle.OpenSans_400Regular] }
          />
          {
            names.map( ( name: string, key  )=>{
              return (  <Row key={ key }
                data={ [name] }
                textStyle={ [styles.fieldValue, styles.increaseFont, FontStyle.OpenSans_700Bold] }
              /> )

            })
          }
          <Row
            data={ userDobTitle }
            textStyle={ [styles.fieldTitle, FontStyle.OpenSans_400Regular] }
          />
          <Row
            data={ userDobValue }
            textStyle={ [styles.fieldValue, styles.increaseFont, FontStyle.OpenSans_700Bold] }
          />
        </Table>
        <Text style={ [styles.subFieldValue, FontStyle.OpenSans_400Regular] }>
          { t('Result.AlwaysVerify', 'Always verify identity with a government-issued I.D.') }
        </Text>
      </View>
      { recordType === RecordType.covid19Immunization && 
        <ImmunizationRecordRow recordEntries={ recordEntries } />
      }
      { recordType === RecordType.covid19LabResult && 
        <LabResultRecordRow recordEntries={ recordEntries } />
      }
      <View style={ styles.dividerContainerWithLine }>
        <Text style={ [styles.containerWithLineTitle, FontStyle.OpenSans_700Bold] }>
          { t('Result.Issuer', 'Issuer') }
        </Text>
        <View style={ styles.containerWithLineDivider } />
      </View>

      <View style={ styles.issuerContainer }>
        <View style={ { flex:1 } } >
          { issuerData.name ? (
            <View style={ styles.verifierContainer }>
              <Text style={ [ { width:'100%' }, styles.fieldValue, FontStyle.OpenSans_700Bold] }>
                { issuerData?.name || issuerData?.url }
              </Text>
              <Image style={ styles.verifierImage } source={ images.commonTrustVerified } />
              <Text style={ [styles.verifiedByText, FontStyle.OpenSans_700Bold] }>
                { t('Result.Verified', 'Verified') }
              </Text>
            </View>
          ) : (
            <View style={ styles.verifierContainer }>
              <Image style={ styles.warningCrossImage } source={ images.warningCross } />
              <Text
                style={ [styles.verifiedByText, FontStyle.OpenSans_700Bold] }
              >
                { t('Result.IssuerNotRecognized', 'Issuer not recognized') }
              </Text>
              <View>
                <Text style={ [ { flex: 1 }, styles.fieldValue, FontStyle.OpenSans_700Bold] }>
                  { issuerData?.name || issuerData?.url }
                </Text>
              </View>
            </View>
          ) }
        </View>
        <Image style={ styles.smartLogoImage } source={ images.smartLogo } />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  recordContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 8,
    padding: 16,
  },
  titleText: {
    fontSize: 14,
    lineHeight: 19,
    color: '#255DCB',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexRowContainer: {
    flexDirection: 'row',
    paddingTop: 14,
  },
  flexColumnContainer: {
    flexDirection: 'column',
  },
  widthSpacer: {
    marginLeft: 42,
  },
  fieldTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: '#6A6A6C',
  },
  fieldValue: {
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 12,
    lineHeight: 17,
    color: '#484848',
  },
  increaseFont: {
    fontSize: 16,
  },
  subFieldValue: {
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 10,
    lineHeight: 17,
    color: '#484848',
  },
  divider: {
    borderBottomColor: '#C6C6C6',
    borderBottomWidth: 1,
    width: '100%',
    marginTop: 14,
    marginBottom: 14,
  },
  verifierContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  verifiedByText: {
    fontSize: 12,
    lineHeight: 17,
    color: '#484848',
  },
  verifierImage: {
    width: 104 * PixelRatio.getFontScale(),
    height: 18.52 * PixelRatio.getFontScale(),
    marginRight: 10,
  },
  warningCrossImage: {
    width: 19,
    height: 19,
    marginRight: 10,
  },
  eyesImage: {
    width: 18 * PixelRatio.getFontScale(),
    height: 18  * PixelRatio.getFontScale(),
    marginBottom: 10,
  },
  smartLogoImage: {
    width: 50.91,
    height: 26.48,
  },
  tableStyle: {
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dividerContainerWithLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    marginBottom: 7
  },
  containerWithLineTitle:{
    paddingTop: 4,
    fontSize: 12,
    lineHeight: 17,
    color: '#255DCB',
    marginRight: 10,
  },
  containerWithLineDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#C6C6C6',
    marginTop: 5,
  },
  issuerContainer:{
    flex:1,
    justifyContent:'space-between',
    flexDirection: 'row'
  }
})

export default ResultRecord
