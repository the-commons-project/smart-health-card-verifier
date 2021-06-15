import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

type AppClickableImageVariables = {
  onPress?: any
  styles?: any
  source?: any
}

const AppClickableImage = ({ onPress, styles, source } : AppClickableImageVariables) => (
  <TouchableOpacity onPress={onPress}>
    <Image style={styles}
      source={source}
    />
  </TouchableOpacity>
)

export default AppClickableImage
