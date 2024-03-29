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
  let isMounted = true;               // note mutable flag

  const Provider = ({ children }: Props): JSX.Element =>  {
    const [ state, setState ] = useState( defaultState )
    const providerelm = useRef(null)
    const [ initialized, setInitialized ] = useState( false )

    const setLocale = ( locale: localeType) => {
      console.log('updated Locale: ' + JSON.stringify( locale ))
      const newState = {
        ...state,
        ...locale,
        initialized: true,
        timeZone: RNLocalize.getTimeZone() 
      }
      if( isMounted ) {
        setState( newState )
      }

    }
    const getLocaleString = ( key: string ): string => {
      return key + ':' + state.language
    }

    const udpateLocale = async ()=>{
      const res = await i18n.initializeLocale()
      return res
    }

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect( ()=>{
      isMounted = true
      udpateLocale().then( ( res )=> {
        if( isMounted ) {
          if ( res != null ) {
            setLocale( res )
          }     
          setInitialized( true )
        }
      })
      i18n.bindChange( setLocale );
      return ( ()=> {
        isMounted = false
        //i18n.unbindChange( setLocale );
      })
    }, [])

    return  (
      <localeContext.Provider value={ { ...state,  getLocaleString } } >
        { ( initialized && children ) } 
        { ( !initialized && < LoadingSpinner enabled={ true } /> ) } 
      </localeContext.Provider>
              
    )
  }
  return [ Provider ] as const 
}
