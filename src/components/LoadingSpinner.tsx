import React, { useState, useEffect } from 'react'

import { Animated, Easing, StyleSheet, View } from 'react-native'
import { Props } from '../types'

const images = {
  loading: require('../../assets/img/error/loading.png'),
}

interface LoadingProps {
  enabled: boolean | any,
}

export default ( { enabled = true }: LoadingProps )=> {
  const [spinAnimation, setSpinAnimation] = useState(new Animated.Value(0))
  const spin = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })
  useEffect(()=>{
    if( enabled ) {
        Animated.loop(
        Animated.timing(spinAnimation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start()
    }
  }, [] )

  return ( <View style={styles.container}>
        <Animated.Image style={[styles.spinner, { transform: [{ rotate: spin }] }]}
          source={images.loading}
            />
      </View>
       )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#FFFFFF",
      justifyContent: 'center', 
      alignItems: 'center'
    },
    spinner: {     
      maxHeight: 55,
      maxWidth: 55,
    }
})