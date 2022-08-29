import React, { useState } from 'react'
import { Text, View, ScrollView, StyleSheet, PixelRatio, Pressable } from 'react-native'
import { AppButton } from '../components/customButton'
import AppClickableImage from '../components/customImage'
import ResultBanner from '../components/resultBanner'
import ResultRecord from '../components/resultRecord'
import { BaseResponse } from 'verifier-sdk'
import { Props } from '../types'
import FontStyle from '../utils/FontStyleHelper'
import { useTranslation } from '../services/i18n/i18nUtils'

const images = {
  qrError: require('../../assets/img/error/qr-error.png'),
  leftCaret: require('../../assets/img/verificationresult/left-caret.png'),
}

const canShowResult = ( result: BaseResponse): boolean => {
  return ( result.isValid ) 
}

const issuerRecognized = ( result: BaseResponse): boolean => {
  return !!result?.issuerData?.name
}

const canToggleBannerDetail = ( result: BaseResponse ): boolean => {
  return ( !issuerRecognized( result ) )
}

const initiallyShowRecord = ( result: BaseResponse ): boolean=>{
  return ( canShowResult( result ) && issuerRecognized( result ) )
}

const initiallyShowBannerDetail = ( result: BaseResponse ): boolean=>{
  return canShowResult(result) ? ( !issuerRecognized( result ) ) : true
}

const VerificationResultPage = ({ route, navigation }: Props) => {
  const data = route.params
  const { validationResult } = data
  const isIssuerRecognized = issuerRecognized( validationResult)
  const isCanToggleResult       = canShowResult( validationResult ) && !isIssuerRecognized 
  const isCanToggleBannerDetail = canToggleBannerDetail( validationResult )

  const [ showResult, setShowResult ] = useState(initiallyShowRecord( validationResult ) )
  const [ showBannerDetail, setShowBannerDetail ] = useState(initiallyShowBannerDetail(validationResult))
  const resultBannerClicked = ()=>{
    if ( isCanToggleResult ) {
      setShowResult( !showResult )
    }
    if ( isCanToggleBannerDetail ) {
      setShowBannerDetail( !showBannerDetail )
    }
  }  
  const { t } = useTranslation()

  return ( 
    <View style={ styles.flexContainer }>
      <View style={ styles.backButtonContainer }>
        <AppClickableImage
          styles={ styles.leftCaretImage }
          source={ images.leftCaret }
          onPress={ () => navigation.navigate('Welcome') }
        />
        <Text
          style={ [styles.backButtonText, FontStyle.Poppins_700Bold] }
          onPress={ () => navigation.navigate('Welcome') }
        >
          { t('Result.ResultTitle', 'Verification Result') }
        </Text>
      </View>
      <ScrollView>
        <Pressable onPress={ resultBannerClicked } >
          <ResultBanner validationResult={ validationResult } showDetail={ showBannerDetail } />
        </Pressable>
        { showResult && validationResult.isValid && <ResultRecord data={ data } /> }
      </ScrollView>
      <AppButton
        title={ t('Common.ScanNext', 'Scan next vaccination record') }
        onPress={ () => navigation.navigate('ScanQR') }
        backgroundColor="#255DCB"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    backgroundColor: '#F3F6FF',
  },
  backButtonContainer: {
    paddingTop: '15%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    paddingLeft: 10,
    fontSize: 20,
    lineHeight: 30,
    color: '#255DCB',
  },
  leftCaretImage: {
    width: 12 * PixelRatio.getFontScale(),
    height: 19 * PixelRatio.getFontScale(),
  },
})

export default VerificationResultPage
