import React from 'react'
import { RecordEntry } from '../types'
import { View, Image, StyleSheet, Text, PixelRatio } from 'react-native'
import { Table, Row } from 'react-native-table-component'
import FontStyle from '../utils/FontStyleHelper'
import { useTranslation } from '../services/i18n/i18nUtils'


export default ( { recordEntries } : RecordEntry[] | any) => {
  const { t } = useTranslation()

  function insertTextToTable (vaccineName: string, lotNumber: string) {
    return (
      <View style={ { flexDirection: 'row', alignItems: 'center' } }>
        <Text
          style={ [
            styles.fieldValue,
            styles.increaseFont,
            FontStyle.OpenSans_700Bold, 
            { marginRight: 7 },
          ] }
        >
          { vaccineName }
        </Text>
        <Text style={ [styles.subFieldValue, FontStyle.OpenSans_400Regular] }>
          Lot { lotNumber }
        </Text>
      </View>
    )
  }

  function dateParser (date: string) {
    return (
      <Text
        style={ [
          styles.fieldTitle,
          styles.increaseFont,
          styles.dosageTextAlign,
          FontStyle.OpenSans_700Bold,
        ] }
      >
        { date }
      </Text>
    )
  }


  function vaccinatorParser (vaccinator: string) {
    let newText = '-'
    if (vaccinator) {
      newText = vaccinator.split(' | ').join(', ')
    }

    return (
      <Text style={ [styles.subFieldValue, FontStyle.OpenSans_400Regular] }>{ newText }</Text>
    )
  }



  function rowAdapter (dosageFieldTitleRowOne:any) {
    return (
      <View style={ { flexWrap: 'wrap', alignItems: 'flex-end', justifyContent:'space-between', flexDirection: 'row' } }>
        <View style={ [styles.fieldTitle, FontStyle.OpenSans_400Regular] }>
          { dosageFieldTitleRowOne[0] }
        </View>
        <View style={ [
          styles.fieldValue,
          styles.increaseFont,
          FontStyle.OpenSans_700Bold
        ] }>
          { dosageFieldTitleRowOne[1] }
        </View>
      </View>
    )
  }

  return ( <View>
  { recordEntries.map((doseObject:any, key) => {
        const { index, lotNumber, vaccineName, vaccinationDate, vaccinator } = doseObject
        const dosageFieldTitleRowOne = [
          insertTextToTable(vaccineName, lotNumber),
          dateParser(vaccinationDate),
        ]
        const dosageFieldValueRowOne = [vaccinatorParser(vaccinator), '']
        return (
          <View key={ key }>
            <View style={ styles.doseDividerContainer }>
              <Text style={ [styles.dosageText, FontStyle.OpenSans_700Bold] }>
                { t('Result.Dose', `Dose ${index}`, { num:index }) }
              </Text>
              <View style={ styles.doseDivider } />
            </View>
            <Table borderStyle={ styles.tableStyle }>
              <Row
                data={ [rowAdapter(dosageFieldTitleRowOne)] }
                textStyle={ [styles.fieldTitle, FontStyle.OpenSans_400Regular] }
              />
              <Row
                data={ dosageFieldValueRowOne }
                textStyle={ [
                  styles.fieldValue,
                  styles.increaseFont,
                  FontStyle.OpenSans_700Bold,
                ] }
              />
            </Table>
          </View>
        )
      }) }
  </View>);
};

const styles = StyleSheet.create({
  fieldValue: {
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 12,
    lineHeight: 17,
    color: '#484848',
  },
  doseDividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    marginBottom: 7,
  },
  fieldTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: '#6A6A6C',
  },
  increaseFont: {
    fontSize: 16,
  },
  dosageTextAlign: {
    textAlign: 'right',
  },
  subFieldValue: {
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 10,
    lineHeight: 17,
    color: '#484848',
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
  tableStyle: {
    borderWidth: 1,
    borderColor: 'transparent',
  }

});