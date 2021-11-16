import {  StyleSheet, Platform } from 'react-native'

const isAndroid = Platform.OS === 'android'

const FontStyle = StyleSheet.create({
  Poppins_700Bold: {
    fontFamily: isAndroid ? "Poppins_700Bold": "Poppins",
    fontWeight: isAndroid ? undefined : "700"
  },
  Poppins_600SemiBold: {
    fontFamily: isAndroid ? "Poppins_600SemiBold": "Poppins",
    fontWeight: isAndroid ? undefined : "600"
  },
  OpenSans_400Regular: {
    fontFamily: isAndroid ? "OpenSans_400Regular": "Open Sans",
    fontWeight: isAndroid ? undefined : "400"
  },
  OpenSans_700Bold: {
    fontFamily: isAndroid ? "OpenSans_700Bold": "Open Sans",
    fontWeight: isAndroid ? undefined : "700"
  },
});
export default FontStyle
