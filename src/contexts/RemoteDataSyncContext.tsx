/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useRef, useEffect, Suspense } from 'react'
import { createContext } from './Context'
import LoadingSpinner from '../components/LoadingSpinner'
import { loadIssuers } from '~/helpers/getIssuerData'
import { loadVaccineCodes } from '~/helpers/getFHIRCodes'
import { API_VERSION } from '../config/config'
import { getDataService, DataKeys } from '../services/data/DataService'
import remoteConfig from '~/models/RemoteConfig'
import { useNetInfo } from '@react-native-community/netinfo'

/* day hr   min  sec  mil */
const lastTimeUpdate = 1 * 24 * 60 * 60 * 1000

interface remoteDataType{
  dataInitialized: boolean
  updatedAt: null | Date
}

// Declaring the state object globally.

const defaultState: remoteDataType = {
  dataInitialized: false,
  updatedAt: null,
}

const remoteDataSyncContext = React.createContext({
  ...defaultState,
})

const resetDataIfNeeded = async (): Promise<boolean> => {
  const dataService = getDataService()
  const lastUpdateThreshold = ( new Date() ).getTime() - lastTimeUpdate
  const lastUpdate = await dataService.getLastUpdate()
  const lastApi    = await dataService.getLastAPIVersion()
  if ( ( lastUpdate !== null && lastUpdate.getTime() < lastUpdateThreshold ) || 
      ( lastApi !== null && lastApi !== API_VERSION  ) ) {
    console.log('resetting local data.')
    await dataService.resetData()
    return true
  } 
  console.log('Skip resetting local data.')
  return false
}

const synchWithLocal = async ( isInternetReachable: boolean ): Promise<boolean> => {
  let res      = false
  if ( isInternetReachable && remoteConfig.shouldUpdateFromRemote() ){
    await remoteConfig.updateRemoteConfig()
  }
  if ( remoteConfig.useLegacy() ) {
    res = true
  } else {
    if( isInternetReachable  ){
      await resetDataIfNeeded() 
    }
    /* 1: Load VaccineCods and issuers and attemp to store locally */
    try {
      await Promise.all( [loadIssuers(), loadVaccineCodes()] )
      res = true
    } catch ( error ) {
      console.info( `Loading initial data: ${String(error)}`)
    }

  }
  return res
}

export const useRemoteDataSyncContext = ()=>{
  return useContext( remoteDataSyncContext )
}

export function getProvider () {
  const { isInternetReachable } = useNetInfo()
  interface Props {
    children: React.ReactNode
  }

  const Provider = ({ children }: Props): JSX.Element =>  {
    const [ state, setState ] = useState( defaultState )

    useEffect( ()=>{
      synchWithLocal( isInternetReachable || false ).then( ()=> {
        setState({
          ...state,
          'dataInitialized': true,
          'updatedAt': ( new Date() )
        })
      })

    }, [])

    return  (
      ( state.dataInitialized )? 
        (
          <remoteDataSyncContext.Provider value={ { ...state } } >
            { 
              ( state.dataInitialized ) && children
            }
          </remoteDataSyncContext.Provider>
        ):(
          < LoadingSpinner enabled={ true } /> 
        )                 
              
    )
  }
  return [ Provider ] as const 
}
