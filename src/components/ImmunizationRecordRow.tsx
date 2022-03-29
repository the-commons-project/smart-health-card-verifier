import React from 'react'
import { RecordEntry, BaseResponse } from '../types'
import { View, Image, StyleSheet, Text, PixelRatio } from 'react-native'
import { Table, Row } from 'react-native-table-component'
import FontStyle from '../utils/FontStyleHelper'
import { useTranslation } from '../services/i18n/i18nUtils'
import ImmunizationSVG from '../../assets/img/verificationresult/immunizationIcon.svg'

const imagePadding = 10

export const GetResultTitle = ( windowWidth: number, responseData: BaseResponse ): any => {
  const { t } = useTranslation()
  const getResultCode = ( responseData: BaseResponse ): string | null => {
    let res = null
    const entry = responseData.recordEntries ?? []
    if ( entry.length >= 2  ) {
      res =  t( 'ImmunizationResult.Doses', { num: entry.length } )
    } else if ( entry.length == 1 ) {
      res =  t( 'ImmunizationResult.Dose', { num: 1 } )
    }
    return res
  }

  const imageWidth = windowWidth / 4 - ( imagePadding * 2 )
  const fieldTitle = (<View style={ styles.titleRow }> 
    <Text style={ styles.labTitle } >{ t( 'ImmunizationResult.Title', 'Vaccination Record' ) }</Text>
  </View>)
  const resultCode = getResultCode(responseData)

  const fieldResult = ( <View style={ [styles.titleRow, styles.tagContainer] }>
    { ( resultCode !== null ) && ( <View key="1"  style={ styles.tag }>
      <Text style={ styles.tagContent }>{ getResultCode(responseData) }</Text>
    </View> ) }
    <View key="2"  style={ styles.tag }>
      <Text  style={ styles.tagContent }>{ t('ImmunizationResult.tagCovid19', 'COVID-19') }</Text>
    </View>
  </View>)
  return ( <View style={ styles.topTitleContainer }>
    <View key="1" style={ styles.typeIconWrapper }>
      <ImmunizationSVG width={ imageWidth } height={ imageWidth }/>
    </View>
    <View  key="2" style={ styles.topTitleContent }>
      <View style={ styles.titleTable }>
        { fieldTitle }
        { fieldResult }
      </View>
    </View>
  </View> )
}

export default ( { recordEntries }: RecordEntry[] | any) => {
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

  function rowAdapter (dosageFieldTitleRowOne: any) {
    return (
      <View style={ { flexWrap: 'wrap', alignItems: 'flex-end', justifyContent:'space-between', flexDirection: 'row' } }>
        <View key="1" style={ [styles.fieldTitle, FontStyle.OpenSans_400Regular] }>
          { dosageFieldTitleRowOne[0] }
        </View>
        <View  key="2"  style={ [
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
    { recordEntries.map((doseObject: any, key) => {
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
  </View>)
}

const styles = StyleSheet.create({
  titleRow: {
    flexShrink:1,
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems:'center',
  },
  labTitle: {
    fontSize: 24,
    color: '#1F2025'
  },
  tag: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 5,
    flexShrink:1,
    alignContent: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    backgroundColor: '#4D72B5'
  },
  tagContainer: {
    paddingTop:10,
    width:'100%',
    alignContent:'space-around',
    flexDirection: 'row'
  },
  tagContent: {
    ...FontStyle.Poppins_700Bold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  topTitleContainer: {
    flexDirection: 'row',
    flex:1
  },
  topTitleContent: {
    flex:1,
  },
  titleTable: {
    width: '100%',
    height:'100%',
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent: 'space-evenly',
    alignContent:'space-around',
  },
  typeIconWrapper: {
    paddingLeft:imagePadding,
    paddingRight:imagePadding
  },
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

})
