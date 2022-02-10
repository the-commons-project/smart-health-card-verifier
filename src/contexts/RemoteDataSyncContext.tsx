import React, { useContext, useState, useRef, useEffect, Suspense } from 'react'
import { createContext } from './Context'
import LoadingSpinner from '../components/LoadingSpinner'
import { loadIssuers } from '../services/helpers/getIssuerData'
import { API_VERSION } from '../config/config'
import { getDataService } from '../services/data/DataService'

                    /* day hr   min  sec  mil */
const lastTimeUpdate = 1 * 24 * 60 * 60 * 1000;
const dataService = getDataService();

interface remoteDataType {
  dataInitialized: boolean,
  updatedAt: null | Date,
}

// Declaring the state object globally.


const defaultState:remoteDataType = {
  dataInitialized: false,
  updatedAt: null,
}



const remoteDataSyncContext = React.createContext({
  ...defaultState,
})

const resetDataIfNeeded = async (): Promise<boolean> => {
  const lastUpdateThreshold = ( new Date() ).getTime() - lastTimeUpdate;
  const lastUpdate = await dataService.getLastUpdate();
  const lastApi    = await dataService.getLastAPIVersion();
  if( ( lastUpdate !== null && lastUpdate.getTime() < lastUpdateThreshold ) || 
      ( lastApi !== null && lastApi != API_VERSION  ) ) {
    console.log("resetting local data.")
    await dataService.resetData();
    return true;
  } else {
    console.log("Skip resetting local data.")
  }
  return false;
}

const synchWithLocal = async (): Promise<boolean> => {
  var res = false;
  try {
    await resetDataIfNeeded();
    const data = await loadIssuers();
    console.info( '#YFgot issuers: ====================== ')
    console.info( JSON.stringify( data ) );
    res = true;
  } catch( error ) {
    console.log("NetworkError")
  }
  return res;
}

export const useRemoteDataSyncContext = ()=>{
  return useContext( remoteDataSyncContext )
}



export function getProvider () {
  interface Props {
    children: React.ReactNode
  }

  const Provider = ({ children }: Props): JSX.Element =>  {
    const [ state, setState ] = useState( defaultState )


    useEffect( ()=>{
      synchWithLocal().then( ()=> {
        setState({
          ...state,
          "dataInitialized": true,
          "updatedAt": ( new Date() )
        });
      })


    }, [])
    // { if( true ) return( < LoadingSpinner enabled={true} /> )}

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
