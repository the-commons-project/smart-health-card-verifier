import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

type AppButtonVariables = {
  onPress?: any
  title?: string
  backgroundColor?: any
}

const AppButton = ({ onPress, title, backgroundColor } : AppButtonVariables) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.appButtonContainer,
      backgroundColor && { backgroundColor }
    ]}
  >
    <Text style={styles.appButtonText}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 60
  },
  appButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    lineHeight: 27,
    fontWeight: '600',
    alignSelf: 'center',
    textTransform: 'uppercase'
  }
})

export default AppButton