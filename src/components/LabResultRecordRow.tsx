import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, StyleSheet, PixelRatio, useWindowDimensions, Alert, TouchableOpacity } from 'react-native'
import { RecordEntry, BaseResponse } from 'verifier-sdk'
import { useTranslation } from '../services/i18n/i18nUtils'
import { Table, TableWrapper, Cell, Row } from 'react-native-table-component'
import FontStyle from '../utils/FontStyleHelper'
import { toCamel, toUpper, getIsSmallScreen, isEmpty } from '../utils/utils'
import { getLocalDateTimeStringData } from '../utils/timeUtils'
import LabTestSVG from '../../assets/img/verificationresult/labResultIcon.svg'
import { useLocaleContext } from '../contexts/LocaleContext' 

const getLocalString = ( language: string, region: string | null ): string => {
  return [language, region].join('-')
}

export const GetResultTitle = ( windowWidth: number, responseData: BaseResponse ): any => {
  const { t } = useTranslation()
  const isSmallScreen = getIsSmallScreen( windowWidth )
  const getResultCode = ( responseData: BaseResponse ): string => {
    let resultStr = 'UNKNOWN'
    let resultKey     = 'UNKNOWN'
    const entry = responseData.recordEntries ?? []
    if ( entry.length > 0  ) {
      resultStr =  entry[0].codeableShortDefault ?? entry[0].codableConseptLabel ?? resultStr
      resultKey =  [entry[0].codableConseptKey, entry[0].codableConseptCode].join('_')
    }
    return t( `LabResult.${resultKey}`, resultStr )
  }

  const getTitle = ( responseData: BaseResponse ): string => {
    let resultStr = 'UNDEFINED'
    let resultKey = 'UNKNOWN'
    const entry = responseData.recordEntries ?? []
    if ( entry.length > 0 && entry[0].systemName  ) {
      resultStr =  entry[0].systemShortDefault ?? entry[0].systemName
      resultKey = [entry[0].systemKey, entry[0].systemCode].join('_')
    }
    return t( `LabResult.Title_${resultKey}`, resultStr )
  }

  const imageWidth = isSmallScreen ? ( windowWidth / 6 ) : ( windowWidth / 5 )
  const fieldTitle = (<View key="1" style={ styles.titleRow }> 
    <Text style={ isSmallScreen ? styles.testTitleSmlScreen : styles.testTitle } >{ getTitle( responseData) }</Text>
  </View>)
  const fieldResult = ( <View key="2" style={ [styles.titleRow, styles.tagContainer] }>
    <View key="1"  style={ styles.tag }>
      <Text style={ styles.tagContent }>{ getResultCode(responseData) }</Text>
    </View>
    <View key="2"  style={ styles.tag }>
      <Text  style={ styles.tagContent }>{ t('LabResult.tagCovid19', 'COVID-19') }</Text>
    </View>
  </View>)
  return ( <View style={ styles.topTitleContainer }>
    <View key="1" style={ isSmallScreen? styles.typeIconWrapperSmlScreen: styles.typeIconWrapper }>
      <LabTestSVG width={ imageWidth } height={ imageWidth }/>
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
  const dimension  = useWindowDimensions()
  const { timeZone } = useLocaleContext()

  const isSmallScreen = getIsSmallScreen( dimension.width )

  const { width } = useWindowDimensions()
  const fontScale = PixelRatio.getFontScale()
  
  const displayField = 
    [
      {
        'propName': 'status',
        'isFullBigScreen': false,
        'toUpper': true, 
        'defaultValue': '-',
        'type':'string'
      },
      { 
        'propName':'securityCode',
        'isFullBigScreen': false,
        'toUpper': false, 
        'defaultValue': '-',
        'type':'string'
      },
      {
        'propName': 'performer',
        'isFullBigScreen': false,
        'toUpper': false,
        'defaultValue': '-',
        'type':'string'
      },
      {
        'propName': 'effectiveDateTimeData',
        'isFullBigScreen': false,
        'toUpper': false, 
        'defaultValue': null,
        'type':'date'
      },
      {
        'propName': 'systemName',
        'isFullBigScreen': true,
        'toUpper': false, 
        'defaultValue': '-',
        'type':'string'
      }
    ]

  const alertNoTimeInfo = ()=> {
    const msg = 'The QR code only provided a date of collection, not a time. In this case, we assume the time to be 00:00 GMT.'
    Alert.alert(
      t('LabResult.CollectedTimeNotFoundTitle', 'Time of collection not found'),
      t('LabResult.CollectedTimeNotFound', msg ),
      [
        {
          text: t('Common.OK'),
        },
      ],
      { cancelable: true },
    )
  }

  function cellAdapter ( field: any, data: any ): any[]{
    const upper = ( data[field.propName] !== null && field.toUpper === true ) 
    let  val =  ( ( field.type === 'string' && isEmpty( data[field.propName]) ) ?  field.defaultValue : data[field.propName] )
    if ( field.type ==='date' ) {
      let res = [
        <Text key="1"
          style={ [styles.fieldValue, styles.fieldValueInline ] }
        >{ val.formattedDate }
        </Text>]

      if ( val.hasTime ) {
        res.push( <Text key="2"
          style={ styles.fieldValue }
        >{ val.time }
        </Text> )
      } else {
        res.push(
          <View key="2" style={ styles.noTimeZone } >
            {[
            <Text key="1" style={[styles.fieldValue, styles.fieldValueInline ] } >
            { val.time }
            </Text>,
            <TouchableOpacity key="2" onPress={ alertNoTimeInfo } >
                <Text  key="2" style={ styles.fieldExclamation }>
                !
              </Text>
            </TouchableOpacity>
            ]}
          </View>)
      }
      val = res

    } else {
      if ( upper ) {
        val = toUpper( val )
      }
      val = (  <Text
        style={ styles.fieldValue }
      >{ val }
      </Text> )
    }
    return [
      <View key="1">
        <Text
          style={ [
            styles.fieldTitle,
            FontStyle.OpenSans_400Regular
          ] }>
          {  t(`LabResult.Field_${String(field.propName)}`, field.propName ) }
        </Text>
      </View>,
      <View key="2" >
        { val }
      </View>
    ]
  }

  function recordAdapter ( data: any ) {
    const { securityCode, performer, effectiveDateTime, systemName, index } = data
    if ( effectiveDateTime ) {
      data.effectiveDateTimeData = getLocalDateTimeStringData( effectiveDateTime, timeZone, t )
    }
    return (
      displayField.map(( field: any, key: any ) => {
        const cellStyle = (( !field.isFullBigScreen && !isSmallScreen ) ? 
          styles.cellHalf : styles.cellFull )
    
        return (  
          <View style={ cellStyle } key={ key }>
            { cellAdapter(field, data ) }
          </View> )
      })
    )
  }

  return  ( 
    <View style={ styles.cellWrapper } >
      <View style={ styles.dividerContainerWithLine }>
        <Text style={ [styles.containerWithLineTitle, FontStyle.OpenSans_700Bold] }>
          { t('LabResult.Title', 'Test Result') }
        </Text>
        <View style={ styles.containerWithLineDivider } />
      </View>
      { recordEntries.map((entry: any, key: any )=>{
        return recordAdapter( entry)
      }) }
    </View>
  )
}

const styles = StyleSheet.create({
  typeIconWrapper: {
    paddingLeft:2,
    paddingRight:2
  },
  typeIconWrapperSmlScreen: {
    paddingLeft:5,
    paddingRight:5
  },
  tagContainer: {
    width:'100%',
    alignContent:'flex-start',
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  testTitle: {
    ...FontStyle.OpenSans_700Bold,
    width: '100%',
    fontSize: 24,
    color: '#1F2025'
  },
  testTitleSmlScreen: {
    ...FontStyle.OpenSans_700Bold,
    width: '100%',
    fontSize: 16,
    color: '#1F2025'
  },
  titleTable: {
    width: '100%',
    height:'100%',
    flex:1,
    paddingLeft: 10,
    flexDirection:'column',
    alignItems:'center',
    justifyContent: 'space-evenly',
    alignContent:'space-around',
  },
  titleRow: {
    justifyContent: 'flex-start',
    width: '100%',
    alignItems:'center',
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
  tagContent: {
    ...FontStyle.Poppins_700Bold,
    fontSize: 14,
    flexShrink:1,
    color: '#FFFFFF',
  },
  topTitleContent: {
    flex:1,
  },
  topTitleContainer: {
    flexDirection: 'row',
    flex:1
  },
  cellWrapper: {
    paddingTop: 15,
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'flex-start'
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
  cellHalf: {
    paddingRight: 4,
    width: '50%'
  },
  cellFull: {
    width: '100%'
  },
  fieldValue: {
    ...FontStyle.Poppins_600SemiBold,
    paddingTop: 3,
    paddingBottom: 4,
    fontSize: 12,
    lineHeight: 17,
    color: '#484848',
  },
  fieldValueInline: {
    flexShrink:1
  },
  fieldExclamation: {
    backgroundColor:'#C33E38',
    borderRadius:10,
    width:20,
    height:20,
    alignItems:'center',
    textAlign:'center',
    justifyContent:'center',
    color:'#FFFFFF',
    marginLeft:5
  },
  noTimeZone: {
    flexDirection: 'row', 
    alignItems:'flex-start',
    justifyContent: 'flex-start',
    marginTop:-5
  },
  fieldTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: '#6A6A6C',
  },
  itemContainer: {
    width: ''
  },
  itemHalf: {
    width: '100%'
  },
  itemFull: {
    width: '50%'
  },
  increaseFont: {
    fontSize: 16,
  },
  divider: {
    borderBottomColor: '#C6C6C6',
    borderBottomWidth: 1,
    width: '100%',
    marginTop: 14,
    marginBottom: 14,
  },

})
