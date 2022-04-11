import React, { useEffect, useState, useCallback, useRef, ReactComponentElement } from 'react'
import {  StyleSheet, View, Text, Modal, useWindowDimensions, PixelRatio, ScrollView, FlatList, Animated } from 'react-native'
import { useTranslation } from '../services/i18n/i18nUtils'
import { GetStartedButton } from './customButton'
import AppLogoSVG from '../../assets/img/icon_shc.svg'
import FontStyle from '../utils/FontStyleHelper'
import commonStyles from '../styles/common'
import { usePreferenceContext } from '../contexts/PreferenceContext'
import Paginator from '../components/welcomePaginator'
import WelcomeDialogInner0 from './WelcomeDialogInner0'
import WelcomeDialogInner1 from './WelcomeDialogInner1'
import WelcomeDialogInner2 from './WelcomeDialogInner2'
import WelcomeDialogInner3 from './WelcomeDialogInner3'

export default ()=> {
  const { setOnboarded } = usePreferenceContext()
  const { t } = useTranslation()
  const getStartText = t('WelcomeDialog.GetStarted', 'Get Started')
  const nextText = t('WelcomeDialog.Next', 'Next')
  const [ nextButtonText, setNextButtonText ] = useState( nextText )
  const [ modalVisible, setModalVisible ]= useState(true)
  const [ sliderWidth, setSliderWidth ] = useState(0)
  const dimension = useWindowDimensions()
  const processConfirmation = ()=> {
    if ( currentIndex.current !== 3 ) {
      return processToNext()
    } 
    setOnboarded()
  }
  const updateText = ( index: number )=> {
    if ( index === 3 ) {
      setNextButtonText( getStartText ) 
    } else {
      setNextButtonText( nextText )
    }
  }

  const processToNext = ()=>{
    if ( currentIndex.current < 3 ) {
      slidesRef.current?.scrollToIndex({ index: ++currentIndex.current, animated: true })      
    }
  }
  interface slideItemType { id: number }
  const slides: slideItemType[] = [
    { id:0 },
    { id:1 }, 
    { id:2 },
    { id:3 }
  ] 
  const scrollX = useRef(new Animated.Value(0)).current
  const slidesRef = useRef(null)
  const currentIndex = useRef<number>(0)
  const measureInner = 
    ( { nativeEvent }: any ) => {
      setSliderWidth( nativeEvent.layout.width - ( 35 * 2 ))
    }
  const viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95,
    itemVisiblePercentThreshold: 75
  }
  const viewableItemsChanged = 
    ({ viewableItems }:{ viewableItems: { item: slideItemType } []}) => {
      if (viewableItems.length === 0) {
        return
      }
      const index =  viewableItems[0].item.id
      updateText( index )
      currentIndex.current = index
    }
  const viewabilityConfigCallbackPairs = useRef([
    { onViewableItemsChanged:viewableItemsChanged,
      viewabilityConfig: {
        itemVisiblePercentThreshold: 55,
      }
    },
  ])

  const getItem = ( id: number  ): JSX.Element => {
    switch ( id ) {
      case 0:
        return  <WelcomeDialogInner0 width={ sliderWidth } />
      case 1:
        return <WelcomeDialogInner1 width={ sliderWidth } />
      case 2: 
        return <WelcomeDialogInner2 width={ sliderWidth } />
      default:
        return <WelcomeDialogInner3 width={ sliderWidth } />
    }
  }

  return ( <View style={ styles.container }>
    <Modal
      animationType="fade"
      transparent={ true }
      visible={ modalVisible }
      onRequestClose={ () => {
        console.log('onRequestClose')
      } }
    >
      <View style={ styles.centeredView }>
        <View style={ styles.modalView }
          onLayout={ measureInner }> 
          <FlatList 
            data={ slides } 
            style={ styles.flatlist }
            renderItem= { ({ item }) =>  getItem( item.id ) } 
            horizontal={ true }
            showsHorizontalScrollIndicator={ false }
            pagingEnabled 
            bounces={ false } 
            keyExtractor={ (item) => item.id.toString() } 
            onScroll={ Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } } ],
              { useNativeDriver: false }) }
            scrollEventThrottle={ 16 }
            viewabilityConfigCallbackPairs={ viewabilityConfigCallbackPairs.current }
            ref={ slidesRef }
            decelerationRate={ 0.8 }
            snapToInterval={ sliderWidth } // your element width
            snapToAlignment={ 'start' }

          />
          <Paginator data={ slides } scrollX={ scrollX } width={ sliderWidth } />
          <GetStartedButton
            title={ nextButtonText }
            onPress={ processConfirmation }
            backgroundColor="#255DCB"
          />
        </View>
      </View>
    </Modal>
  </View>

  )
}

const styles = StyleSheet.create({
  container:
  commonStyles.dialogShade,

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  flatlist: {
    backgroundColor: '#FFFFFF',
    flex: 1
  }
})
