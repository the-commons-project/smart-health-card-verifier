import React, { useState } from 'react'
import { Text, View, ScrollView, StyleSheet, PixelRatio, Pressable } from 'react-native'
import AppButton from '../components/customButton'
import AppClickableImage from '../components/customImage'
import ResultBanner from '../components/resultBanner'
import ResultRecord from '../components/resultRecord'
import { Props } from '../types'
import FontStyle from '../utils/FontStyleHelper'
import { BaseResponse } from '../types'

const images = {
  qrError: require('../../assets/img/error/qr-error.png'),
  leftCaret: require('../../assets/img/verificationresult/left-caret.png'),
}

const canShowResult = ( result: BaseResponse): Boolean => {
  return( result.isValid == true ) ;
}

const initiallyShowRecord = ( result: BaseResponse )=>{
  const isIssuerRecognized = !!result?.issuerData?.name
  return ( result.isValid && isIssuerRecognized );
}

const VerificationResultPage = ({ route, navigation }: Props) => {
  const data = route.params
  const { validationResult } = data
  const canToggleResult = canShowResult( validationResult );
  const [ showResult, setShowResult ] = useState(initiallyShowRecord( validationResult ) )

  const resultBannerClicked = ()=>{
    if( canToggleResult ) {
      setShowResult( !showResult)
    }
  }  

  return ( 

    <View style={styles.flexContainer}>
      <View style={styles.backButtonContainer}>
        <AppClickableImage
          styles={styles.leftCaretImage}
          source={images.leftCaret}
          onPress={() => navigation.navigate('Welcome')}
        />
        <Text
          style={[styles.backButtonText, FontStyle.Poppins_700Bold]}
          onPress={() => navigation.navigate('Welcome')}
        >
          Verification result
        </Text>
      </View>
      <ScrollView>
        <Pressable onPress={ resultBannerClicked } >
          <ResultBanner validationResult={validationResult} />
        </Pressable>
        {showResult && validationResult.isValid && <ResultRecord data={data} />}
      </ScrollView>
      <AppButton
        title="Scan next vaccination record"
        onPress={() => navigation.navigate('ScanQR')}
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
