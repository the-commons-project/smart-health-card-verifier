import React from 'react'
import { Text, View, ScrollView, StyleSheet, PixelRatio } from 'react-native'
import AppButton from '../components/customButton'
import AppClickableImage from '../components/customImage'
import ResultBanner from '../components/resultBanner'
import ResultRecord from '../components/resultRecord'
import { Props } from '../types'

const images = {
  qrError: require('../../assets/img/error/qr-error.png'),
  leftCaret: require('../../assets/img/verificationresult/left-caret.png'),
}

const VerificationResultPage = ({ route, navigation }: Props) => {
  const data = route.params
  const { validationResult } = data

  return (
    <View style={styles.flexContainer}>
      <View style={styles.backButtonContainer}>
        <AppClickableImage
          styles={styles.leftCaretImage}
          source={images.leftCaret}
          onPress={() => navigation.navigate('Welcome')}
        />
        <Text
          style={[styles.backButtonText, { fontFamily: 'Poppins_700Bold' }]}
          onPress={() => navigation.navigate('Welcome')}
        >
          Verification result
        </Text>
      </View>
      <ScrollView>
        <ResultBanner validationResult={validationResult} />
        {validationResult.isValid && <ResultRecord data={data} />}
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
