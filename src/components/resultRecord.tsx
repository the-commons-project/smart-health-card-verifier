import React, { useState } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { Table, Row } from 'react-native-table-component'
import AppClickableImage from './customImage'
import { Data } from '../types'
import FontStyle from '../utils/FontStyleHelper'

const images = {
  commonTrustVerified: require('../../assets/img/verificationresult/common-trust-verified.png'),
  smartLogo: require('../../assets/img/verificationresult/smart-logo.png'),
  eyes: require('../../assets/img/verificationresult/eyes.png'),
  warningCross: require('../../assets/img/verificationresult/warning-cross.png'),
}

const ResultRecord = ({ data }: Data) => {
  const [boolBirthDate, setBoolBirthDate] = useState(false)
  const { validationResult } = data
  const { issuerData, patientData, vaccinationData } = validationResult
  const { name, dateOfBirth } = patientData

  const userFieldTitle = ['Name']
  const userFieldValue = [name]

  const userDobTitle = ['Date of Birth']
  const userDobValue = [insertImageToTable()]

  function insertImageToTable() {
    const date = boolBirthDate ? dateOfBirth : '**/**/****'
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={[
            styles.fieldValue,
            styles.increaseFont,
            FontStyle.OpenSans_700Bold, 
            {marginRight: 20 },
          ]}
        >
          {date}
        </Text>
        <AppClickableImage
          styles={styles.eyesImage}
          source={images.eyes}
          onPress={() => {
            setBoolBirthDate(!boolBirthDate)
          }}
        />
      </View>
    )
  }

  function insertTextToTable(vaccineName: string, lotNumber: string) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={[
            styles.fieldValue,
            styles.increaseFont,
            FontStyle.OpenSans_700Bold, 
            {marginRight: 7 },
          ]}
        >
          {vaccineName}
        </Text>
        <Text style={[styles.subFieldValue, FontStyle.OpenSans_400Regular]}>
          Lot {lotNumber}
        </Text>
      </View>
    )
  }

  function vaccinatorParser(vaccinator: string) {
    let newText = '-'
    if (vaccinator) {
      newText = vaccinator.split(' | ').join(', ')
    }

    return (
      <Text style={[styles.subFieldValue, FontStyle.OpenSans_400Regular]}>{newText}</Text>
    )
  }

  function dateParser(date: string) {
    return (
      <Text
        style={[
          styles.fieldTitle,
          styles.increaseFont,
          styles.dosageTextAlign,
          FontStyle.OpenSans_700Bold,
        ]}
      >
        {date}
      </Text>
    )
  }

  return (
    <View style={styles.recordContainer}>
      <View style={styles.titleContainer}>
        <Text style={[styles.titleText, FontStyle.OpenSans_700Bold]}>
          COVID-19 Vaccination Record
        </Text>
        <Image style={styles.smartLogoImage} source={images.smartLogo} />
      </View>
      <View>
        <Table borderStyle={styles.tableStyle}>
          <Row
            data={userFieldTitle}
            textStyle={[styles.fieldTitle, FontStyle.OpenSans_400Regular]}
          />
          <Row
            data={userFieldValue}
            textStyle={[styles.fieldValue, styles.increaseFont, FontStyle.OpenSans_700Bold]}
          />
          <Row
            data={userDobTitle}
            textStyle={[styles.fieldTitle, FontStyle.OpenSans_400Regular]}
          />
          <Row
            data={userDobValue}
            textStyle={[styles.fieldValue, styles.increaseFont, FontStyle.OpenSans_700Bold]}
          />
        </Table>
        <Text style={[styles.subFieldValue, FontStyle.OpenSans_400Regular]}>
          Always verify identity with a government-issued I.D.
        </Text>
      </View>
      {vaccinationData.map((doseObject, key) => {
        const { dose, lotNumber, vaccineName, vaccinationDate, vaccinator } = doseObject
        const dosageFieldTitleRowOne = [
          insertTextToTable(vaccineName, lotNumber),
          dateParser(vaccinationDate),
        ]
        const dosageFieldValueRowOne = [vaccinatorParser(vaccinator), '']
        return (
          <View key={key}>
            <View style={styles.doseDividerContainer}>
              <Text style={[styles.dosageText, FontStyle.OpenSans_700Bold]}>
                Dose {dose}
              </Text>
              <View style={styles.doseDivider} />
            </View>
            <Table borderStyle={styles.tableStyle}>
              <Row
                data={dosageFieldTitleRowOne}
                textStyle={[styles.fieldTitle, FontStyle.OpenSans_400Regular]}
              />
              <Row
                data={dosageFieldValueRowOne}
                textStyle={[
                  styles.fieldValue,
                  styles.increaseFont,
                  FontStyle.OpenSans_700Bold,
                ]}
              />
            </Table>
          </View>
        )
      })}
      <View style={styles.divider} />
      <View>
        <Text style={[styles.fieldTitle,  FontStyle.OpenSans_400Regular]}>Issuer</Text>
        <Text style={[styles.fieldValue, FontStyle.OpenSans_700Bold]}>
          {issuerData?.name || issuerData?.url}
        </Text>
        {issuerData.name ? (
          <View style={styles.verifierContainer}>
            <Image style={styles.verifierImage} source={images.commonTrustVerified} />
            <Text style={[styles.verifiedByText, FontStyle.OpenSans_700Bold]}>
              Verified
            </Text>
          </View>
        ) : (
          <View style={styles.verifierContainer}>
            <Image style={styles.warningCrossImage} source={images.warningCross} />
            <Text
              style={[styles.verifiedByText, FontStyle.OpenSans_700Bold]}
            >
              Issuer not recognized
            </Text>
          </View>
        )}
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
  doseDividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    marginBottom: 7,
  },
  doseDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#C6C6C6',
    marginTop: 5,
  },
  dosageText: {
    paddingTop: 4,
    fontSize: 12,
    lineHeight: 17,
    color: '#255DCB',
    marginRight: 10,
  },
  dosageTextAlign: {
    textAlign: 'right',
  },
  verifierContainer: {
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
    width: 104,
    height: 18.52,
    marginRight: 10,
  },
  warningCrossImage: {
    width: 19,
    height: 19,
    marginRight: 10,
  },
  eyesImage: {
    width: 18,
    height: 18,
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
})

export default ResultRecord
