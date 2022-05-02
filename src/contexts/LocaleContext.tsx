import React, { useContext, useState, useRef, useEffect, Suspense } from 'react'
import RNLocalize from 'react-native-localize'
import { createContext } from './Context'
import i18nUtils from '../services/i18n/i18nUtils'
import LoadingSpinner from '../components/LoadingSpinner'
const i18n = i18nUtils.initailize()

interface localeType {
  key: string
  language: string
  region: string
  initialized: boolean
  timeZone: ''
}

// Declaring the state object globally.
const defaultState = {
  key: 'en',
  language: 'en',
  region: 'US',
  initialized: false,
  timeZone: ''
}

type UpdateType = React.Dispatch<
React.SetStateAction<typeof defaultState>
>

const defaultUpdate: UpdateType = () => defaultState

const localeContext = React.createContext({
  ...defaultState,
  getLocaleString:( key: string ): string => {
    return ''
  }
})

export const useLocaleContext = ()=>{
  return useContext( localeContext )
}

export function getProvider () {
  interface Props {
    children: React.ReactNode
  }

  const Provider = ({ children }: Props): JSX.Element =>  {
    const [ state, setState ] = useState( defaultState )
    const [ initialized, setInitialized ] = useState( false )

    const setLocale = ( locale: localeType) => {
      console.log('updated Locale: ' + JSON.stringify( locale ))
      const newState = {
        ...state,
        ...locale,
        initialized: true,
        timeZone: RNLocalize.getTimeZone() 
      }
      setState( newState )

    }
    const getLocaleString = ( key: string ): string => {
      return key + ':' + state.language
    }

    const udpateLocale = async ()=>{
      const res = await i18n.initializeLocale()
      if ( res != null ) {
        setLocale( res )
      }      
      return res
    }

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect( ()=>{
      udpateLocale().then( ()=> setInitialized( true ) )
      i18n.bindChange( (locale: localeType)=>{
        setLocale( locale )
      })

    }, [])
    // { if( true ) return( < LoadingSpinner enabled={true} /> )}

    return  (
      ( initialized )? 
        (
          <localeContext.Provider value={ { ...state,  getLocaleString } } >
            { 
              ( state.initialized ) && children
            }
          </localeContext.Provider>
        ):(
          < LoadingSpinner enabled={ true } /> 
        )                 
              
    )
  }
  return [ Provider ] as const 
}
