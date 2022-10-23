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
const lastTimeUpdate = 1 * 24 * 60 * 60 * 1000;

interface remoteDataType{
  dataInitialized: boolean
  updatedAt: null | Date
}

export interface RemoteDataActionType {
  resetData: any
}
// Declaring the state object globally.

const defaultState: remoteDataType = {
  dataInitialized: false,
  updatedAt: null,
}

const defaultActions: RemoteDataActionType = {
  resetData: ()=>{}
}

const remoteDataSyncContext = React.createContext([ defaultState, defaultActions ])

const shouldResetDataIfNeeded = async (): Promise<boolean> => {
  const dataService = getDataService()
  const lastUpdateThreshold = ( new Date() ).getTime() - lastTimeUpdate
  const lastUpdate = await dataService.getLastUpdate()
  console.info("last update: " + lastUpdate)
  const lastApi    = await dataService.getLastAPIVersion()
  if ( ( lastUpdate === null || lastUpdate.getTime() < lastUpdateThreshold ) || 
      ( lastApi !== null && lastApi !== API_VERSION  ) ) {
    //await dataService.resetData()
    return true
  } 
  console.log('Skip resetting local data.')
  return false
}

const getActions = ( state:remoteDataType, setState: any ): RemoteDataActionType =>  {
  return {
    resetData: async ( isInternetReachable: boolean ) => {
      if( isInternetReachable ) {
        setState({
          ...state,
          ...defaultState
        })
        // update updated time so it will force update. 
        const dataService = getDataService()
        await dataService.clearLatestUpdate()

        synchWithLocal( isInternetReachable || false ).then( ()=> {
          setState({
            ...state,
            'dataInitialized': true,
            'updatedAt': ( new Date() )
          })
        })

      }
    }
  }
}

const synchWithLocal = async ( isInternetReachable: boolean ): Promise<boolean> => {
  let res      = false
  const dataService = getDataService()

  if ( isInternetReachable && remoteConfig.shouldUpdateFromRemote() ){
    await remoteConfig.updateRemoteConfig()
  }
  if ( remoteConfig.useLegacy() ) {
    res = true
  } else {
    let  forceReset = false
    if( isInternetReachable  ){
      forceReset = await shouldResetDataIfNeeded() 
    }
    /* 1: Load VaccineCods and issuers and attemp to store locally */
    try {
      await Promise.all( [loadIssuers(forceReset), loadVaccineCodes(forceReset)] )
      if( isInternetReachable ) {
        dataService.setLatestUpdate()
      }
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

    const actions = getActions( state, setState );
    const _values = [state, actions]
    var mounted = true;
    useEffect(()=>{
      synchWithLocal( isInternetReachable || false ).then( ()=> {
        if( mounted ) {
          setState({
            ...state,
            'dataInitialized': true,
            'updatedAt': ( new Date() )
          })
        }
      })
      return (()=> mounted = false )
    }, [])

    return  (
      ( state.dataInitialized )? 
        (
          <remoteDataSyncContext.Provider value={ _values } >
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
