import React from 'react'
import { RecordEntry, BaseResponse } from 'verifier-sdk'
import { View, Image, StyleSheet, Text, PixelRatio, useWindowDimensions } from 'react-native'
import { Table, Row } from 'react-native-table-component'
import FontStyle from '../utils/FontStyleHelper'
import { useTranslation } from '../services/i18n/i18nUtils'
import ImmunizationSVG from '../../assets/img/verificationresult/immunizationIcon.svg'
import { getIsSmallScreen, formatFHIRRecordDate } from '~/utils/utils'
const imagePadding = 10

export const GetResultTitle = ( windowWidth: number, responseData: BaseResponse ): any => {
  const { t } = useTranslation()
  const isSmallScreen = getIsSmallScreen( windowWidth )
  const getResultCode = ( data: BaseResponse ): string | null => {
    let res = null
    const entry = data.recordEntries ?? []
    if ( entry.length >= 2  ) {
      res =  t( 'ImmunizationResult.DosesComplete',  `${String(entry.length)}Doses`, { num: entry.length })
    } else if ( entry.length === 1 ) {
      res =  t( 'ImmunizationResult.DoseComplete',  '1 Dose', { num: 1 } )
    }
    return res
  }
  const getGroup = ( data: BaseResponse ): string | null => {
    let res = data.recordEntries.map((item) => item.groupName )
    return res.length > 0 ? res[0] : null
  }
  const getSubTag = ( data: BaseResponse ): string | null => {
    let res = null
    const group = getGroup( data );
    const tags = data.tagKeys ?? []
    if( group != null ) {
      res = t(`ImmunizationResult.tag${group}`, group );
    } else if( tags.length > 0 ) {
      res = t(`ImmunizationResult.tag${tags[0]}`, tags[0]);
    }
    return res;
  }

  const imageWidth = isSmallScreen ? ( windowWidth / 6 ) : ( windowWidth / 5 )
  const fieldTitle = (<View style={ styles.titleRow }> 
    <Text style={ styles.labTitle } >{ t( 'ImmunizationResult.Title', 'Vaccination Record' ) }</Text>
  </View>)
  const resultCode = getResultCode(responseData)
  const subTag = getSubTag( responseData )
  const fieldResult = ( <View style={ [styles.titleRow, styles.tagContainer] }>
    { ( resultCode !== null ) && ( <View key="1"  style={ styles.tag }>
      <Text style={ styles.tagContent }>{ resultCode }</Text>
    </View> ) }
    { ( subTag != null ) && ( <View key="2"  style={ styles.tag }>
      <Text  style={ styles.tagContent }>{ subTag }</Text>
    </View>)}
  </View>)
  return ( <View style={ styles.topTitleContainer }>
    <View key="1" style={ isSmallScreen? styles.typeIconWrapperSmlScreen : styles.typeIconWrapper }>
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

interface ResultParam {
  recordEntries: RecordEntry[] | any;
  issuedDate: Date | null;
} 
export default ( { recordEntries, issuedDate }: ResultParam ) => {
  const { t } = useTranslation()

  function insertTextToTable (
    vaccineName: string, lotNumber: string, vaccinationDate: string,  manufacturerName: string|null = null, groupName: string| null = null) {
    return ( <View style={ styles.recordEntries }>
        { ( manufacturerName != null ) && 
            <Text
              style={ [
                styles.fieldValue,
                styles.increaseFont,
                FontStyle.OpenSans_700Bold, 
                styles.recordEntriesTextField
              ] }
            >
              { manufacturerName }
            </Text>
        }
        <Text
          style={ [ 
            styles.fieldValue,
            styles.increaseFont,
            FontStyle.OpenSans_400Regular, 
            styles.recordEntriesTextField
          ] }
        >
          { vaccineName }
        </Text>
        <View style={[{ width:'100%', display:'flex', flexDirection:"row"}]} >
          <Text style={ [ {
            width: '50%',
            textAlignVertical:'top' }, styles.lotFieldValue, FontStyle.OpenSans_400Regular] }>
            Lot { lotNumber }
          </Text>
          <Text
            style={ [ {
              flex: 1,
              textAlign: 'right',
              textAlignVertical:'top',
              },

              styles.fieldTitle,
              styles.increaseFont,
              FontStyle.OpenSans_700Bold,
            ] }
          >
            { formatFHIRRecordDate( vaccinationDate ) }
          </Text>
        </View>
      </View>
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
      <View style={ styles.rowItem }>
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
      const { index, lotNumber, vaccineName, vaccinationDate, vaccinator, manufacturerName, groupName  } = doseObject
      const dosageFieldTitleRowOne = [
        insertTextToTable(vaccineName, lotNumber, vaccinationDate, manufacturerName, groupName  ),
      ]
      const dosageFieldValueRowOne = [vaccinatorParser(vaccinator), '']
      return (
        <View key={ key }>
          <View style={ styles.doseDividerContainer }>
            <Text style={ [styles.dosageText, FontStyle.OpenSans_700Bold] }>
              { t('ImmunizationResult.Dose', `Dose ${String( index )}`, { num:index }) }
            </Text>
            <View style={ styles.doseDivider } />
          </View>
          <Table borderStyle={ styles.tableStyle }>
            <Row
              data={ [rowAdapter(dosageFieldTitleRowOne)] }
              textStyle={ {...styles.fieldTitle, ...FontStyle.OpenSans_400Regular} }
            />
            <Row
              data={ dosageFieldValueRowOne }
              textStyle={ {
                ...styles.fieldValue,
                ...styles.increaseFont,
                ...FontStyle.OpenSans_700Bold,
              } }
            />
          </Table>
        </View>
      )
    }) }
  </View>)
}

const styles = StyleSheet.create({
  titleRow: {
    justifyContent: 'flex-start',
    width: '100%',
    alignItems:'center',
  },
  labTitle: {
    ...FontStyle.OpenSans_700Bold,
    width: '100%',
    fontSize: 24,
    color: '#1F2025'
  },
  tag: {
    marginTop:5,
    marginRight:10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 5,
    flexWrap:'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    backgroundColor: '#4D72B5'
  },
  tagContainer: {
    width:'100%',
    alignContent:'flex-start',
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  tagContent: {
    ...FontStyle.Poppins_700Bold,
    fontSize: 14,
    flexDirection:'row',
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
  recordEntries:{
    flexDirection: 'row', 
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  recordEntriesTextField: {
    marginRight: 7 
  },
  typeIconWrapper: {
    paddingLeft:5,
    paddingRight:10
  },
  typeIconWrapperSmlScreen: {
    paddingLeft:5,
    paddingRight:5
  },
  rowItem: {
    flexWrap: 'wrap', 
    alignItems: 'flex-end', 
    justifyContent:'space-between', 
    flexDirection: 'row'
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
  lotFieldValue: {
    fontSize: 10,
    color: '#484848',
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
