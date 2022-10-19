import React, { useState, useEffect } from 'react'
import {  StyleSheet, Modal, View, Text, TouchableWithoutFeedback } from 'react-native'
import { useTranslation } from '../services/i18n/i18nUtils'
import { version }  from '../../package.json'
import { useRemoteDataSyncContext, RemoteDataActionType } from '../contexts/RemoteDataSyncContext'
import { useNetInfo } from '@react-native-community/netinfo'

type SettingModalTypes = {
  show: boolean
  onClose: any
}
export default function SettingsModal( { show, onClose }: SettingModalTypes ){
    const { isInternetReachable } = useNetInfo()

    const { t } = useTranslation()
    const [ _, actions  ] = useRemoteDataSyncContext()
    const [ visible, setVisible ] = useState( show );
    const closeModal = ()=> {
      console.info("close modal")
      onClose()
    }

    const resetData = ()=> {
      ( actions as RemoteDataActionType ).resetData( isInternetReachable );
    }

    useEffect(()=> {
      if( show != visible ){
        setVisible( show )
      }
    })

    return ( 
    <Modal
      animationType="fade"
      transparent={ true }
      visible={ visible }
      onRequestClose={ closeModal }
    >
      <TouchableWithoutFeedback onPress={closeModal} style={{backgroundColor: "#00FF00"}}>
        <View style={ styles.centeredView }  >
          <View style={ styles.modalView }>
            <Text style={ styles.appVersion }>Version: { version }</Text>
            <Text style={ styles.resetText } onPress={ resetData } >
              { t('Welcome.ResetData', 'ResetData', 'Reset Data') }
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal> 
    )

}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    background:"#0000FF",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  appVersion: {
    textAlign: 'center',
    width: '100%',
    fontSize: 20,
    color: '#292B52',
  },
  resetText: {
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine:'underline',
    width: '100%',
    fontSize: 20,
    color: '#292B52',
  }
});