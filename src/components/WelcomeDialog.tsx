import React, { useEffect, useState, useRef } from 'react'
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

const width=300 
export default ()=> {

  const { setOnboarded } = usePreferenceContext()
  const { t } = useTranslation()
  const [ modalVisible, setModalVisible ]= useState(true)
  const dimension = useWindowDimensions()
  //const { width } = useWindowDimensions()
  const processConfirmation = ()=> {
    setOnboarded()
  }
  const deviceHeight = dimension.height
  const maxScrollable = { maxHeight: ( deviceHeight * 0.6 ) }
  const smallScreen = ( deviceHeight < 720 )
  const imageHeight = ( dimension.height * ( smallScreen ? .05 : .08 ) / PixelRatio.getFontScale() )
  const msg1 = 'Use this app to verify the SMART Health Cards of your customers or employees at your business.\n\n'
  const msg2 = 'PLEASE NOTE: This app does not save or store your digital credentials.'
  type slideItemType = { id: number }
  const slides: slideItemType[] = [
    {id:0},
    {id:1}, 
    {id:2},
    {id:3}
    ]; 
  const viewableItems = slides[0];
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  
  const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
        }).current; 

  
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
        <View style={ styles.modalView }> 
          {/* <View style={ { flex: 3 }}> */}
          <FlatList 
                data={slides} 
                style={ [styles.flatlist, {width: width} ] }
                contentContainerStyle = {{justifyContent:'center',}}
                //renderItem={({ item }) => <OnboardingItem item={item} />} 
                renderItem= {({ item }) => ( item.id === 0 ? <WelcomeDialogInner0 width={width} /> : (  item.id === 1 ? <WelcomeDialogInner1 width={width} /> : ( item.id===2 ?  <WelcomeDialogInner2 width={width} /> : <WelcomeDialogInner3 width={width} /> ) )) } 
                
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled 
                bounces={false} 
                keyExtractor={(_, index) => index.toString() } 
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } } ],
                { useNativeDriver: false })}
                scrollEventThrottle={16}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={slidesRef}
                decelerationRate={0}
                snapToInterval={slides.height}
                snapToAlignment="start"
                

                
                
                />
                
                {/* { <View style={ styles.textContainer }>
                <AppLogoSVG height={ imageHeight }  width={ imageHeight }/>
              <Text style={ [ smallScreen ? styles.welcomeTextSmlScreen : styles.welcomeText, 
                FontStyle.Poppins_700Bold,
              ] }>{ t('WelcomeDialog.Welcome', 'Welcome to the\nSMART Health Card\nVerifier App!') }</Text>
              
                <Text style={ [ smallScreen? styles.textStyleSmlScreen : styles.textStyle, FontStyle.OpenSans_400Regular, ] }>{ t('WelcomeDialog.WelcomeDescription1', msg1) }</Text>
                <Text style={ [ smallScreen? styles.textStyleSmlScreen : styles.textStyle, FontStyle.OpenSans_400Regular, styles.textBold] }>{ t('WelcomeDialog.PleaseNote', 'Please Note: ') }</Text>
                <Text style={ [ smallScreen? styles.textStyleSmlScreen : styles.textStyle, FontStyle.OpenSans_400Regular] }>{ t('WelcomeDialog.WelcomeDescription2', msg2) }</Text>
              </View>
                 }
           */}
            
            
            
          <Paginator data={slides} scrollX={scrollX} />
          <GetStartedButton
            title={ t('WelcomeDialog.GetStarted', 'Get Started') }
            onPress={ processConfirmation }
            backgroundColor="#255DCB"
          />
          </View>
        {/* </View> */}
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
    marginTop: 22
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
    // position:"relative"
  },
  scrollContainer: {
    backgroundColor: 'white',
  },
  scrollContents: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 28,
    lineHeight: 32,
    color: '#000000',
    textAlign: 'left',
  },
  welcomeTextSmlScreen: {
    marginTop: 20,
    fontSize: 20,
    lineHeight: 24,
    color: '#000000',
    textAlign: 'left',
  },
  textContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  textStyleSmlScreen: {
    color: '#616C8D',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'left'
  },

  textStyle: {
    color: '#616C8D',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'left'
  },
  textBold: {
    marginTop: 20,
    fontWeight: 'bold'
  },
  flatlist: {
    backgroundColor: '#FF000',
    width: 300,
    flex: 1
    //contentContainerStyle = justifyContent:'center'
  },
  innerComponent: {
    backgroundColor: '#0000FF',
    flex: 1,
    alignItems: 'center',
    width: '100%'
}

})
