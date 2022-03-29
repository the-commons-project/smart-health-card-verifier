import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, StyleSheet, PixelRatio, useWindowDimensions } from 'react-native'
import { RecordEntry, BaseResponse } from '../types'
import { useTranslation } from '../services/i18n/i18nUtils'
import { Table, TableWrapper, Cell, Row } from 'react-native-table-component'
import FontStyle from '../utils/FontStyleHelper'
import { toCamel } from '../utils/utils'
import LabTestSVG from '../../assets/img/verificationresult/labResultIcon.svg'

const imagePadding = 10

export const GetResultTitle = ( windowWidth: number, responseData: BaseResponse ): any => {
  const { t } = useTranslation()
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

  const imageWidth = windowWidth / 4 - ( imagePadding * 2 )
  const fieldTitle = (<View key="1" style={ styles.titleRow }> 
    <Text style={ styles.testTitle } >{ getTitle( responseData) }</Text>
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
    <View key="1" style={ styles.typeIconWrapper }>
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
  const smallScreenThreshold = 400
  const { width } = useWindowDimensions()
  const fontScale = PixelRatio.getFontScale()
  const [ isSmallScreen, setIsSmallScreen ] = useState( getIsSmallScreen() )
  const { t } = useTranslation()
  
  const displayField = 
    [
      {
        'propName': 'status',
        'isFullBigScreen': false
      },
      { 
        'propName':'securityCode',
        'isFullBigScreen': false
      },
      {
        'propName': 'performer',
        'isFullBigScreen': false
      },
      {
        'propName': 'observationDate',
        'isFullBigScreen': false
      },
      {
        'propName': 'systemName',
        'isFullBigScreen': true
      }
    ]

  useEffect(()=> setIsSmallScreen( getIsSmallScreen()), [])

  function cellAdapter ( field: any, data: any ): any[]{

    return [
      <View key="1">
        <Text
          style={ [
            styles.fieldTitle,
            FontStyle.OpenSans_400Regular
          ] }>
          {  t(`LabResult.Field_${field.propName}`, field.propName ) }
        </Text>
      </View>,
      <View key="2" >
        <Text
          style={ styles.fieldValue }
        >{  data[field.propName] }
        </Text>
      </View>
    ]
  }

  function getIsSmallScreen (){
    return ( ( width / fontScale) <= smallScreenThreshold )
  }

  function recordAdapter ( data: any ) {
    const { securityCode, performer, observationDate, systemName, index } = data

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
    paddingLeft:imagePadding,
    paddingRight:imagePadding
  },
  tagContainer: {
    paddingTop:10,
    width:'100%',
    alignContent:'flex-start',
    flexDirection: 'row'
  },
  testTitle: {
    ...FontStyle.OpenSans_700Bold,
    width: '100%',
    fontSize: 24,
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
    flexShrink:1,
    justifyContent: 'flex-start',
    width: '100%',
    alignItems:'center',
  },
  tag: {
    marginRight:10,
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
  tagContent: {
    ...FontStyle.Poppins_700Bold,
    fontSize: 14,
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
