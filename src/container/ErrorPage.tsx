import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import AppButton from '../components/customButton'
import AppClickableImage from '../components/customImage'
import { Props } from '../types'
import FontStyle from '../utils/FontStyleHelper'
import { useTranslation } from '../services/i18n/i18nUtils'

const images = {
  qrError: require('../../assets/img/error/qr-error.png'),
  leftCaret: require('../../assets/img/verificationresult/left-caret.png'),
}

const ErrorPage = ({ navigation }: Props) => {
  const {t} = useTranslation()
  return (
    <View style={styles.flexContainer}>
      <View style={styles.backButtonContainer}>
        <AppClickableImage
          styles={styles.leftCaretImage}
          source={images.leftCaret}
          onPress={() => navigation.navigate('ScanQR')}
        />
        <Text
          style={[styles.backButtonText, FontStyle.Poppins_700Bold]}
          onPress={() => navigation.navigate('ScanQR')}
        >
          {t("ErrorPage.UnsupportedQR","Unsupported QR")}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.imageStyle} source={images.qrError} />
        <Text style={[styles.message,  FontStyle.Poppins_600SemiBold]}>
          {t('ErrorPage.OnlyValidText','Only valid vaccine SMART® Health Cards are currently supported')}
        </Text>
      </View>
      <AppButton
        title={t("Common.ScanNext")}
        onPress={() => navigation.navigate('ScanQR')}
        backgroundColor="#255DCB"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    paddingTop: '15%',
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    backgroundColor: '#F3F6FF',
  },
  imageContainer: {
    padding: 20,
    alignItems: 'center',
  },
  imageStyle: {
    height: 105,
    width: 107,
    resizeMode: 'contain',
  },
  leftCaretImage: {
    width: 12,
    height: 19,
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    paddingTop: 65,
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 25,
    color: '#000000',
  },
  backButtonText: {
    paddingLeft: 10,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 30,
    color: '#255DCB',
  },
})

export default ErrorPage
