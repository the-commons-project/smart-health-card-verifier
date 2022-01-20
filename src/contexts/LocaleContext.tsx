import React, { useContext, useState, useRef, useEffect, Suspense } from 'react'
import RNLocalize from "react-native-localize"
import { createContext } from "./Context";
import i18nUtils from '../services/i18nUtils'
import LoadingSpinner from '../components/LoadingSpinner'

const i18n = i18nUtils.initailize()

type localeType = {
    key: string,
    lang: string,
    region: string
    initialized: boolean
}


// Declaring the state object globally.
const defaultState = {
  key: 'en',
  lang: "en",
  region: "US",
  initialized: false
};



type UpdateType = React.Dispatch<
  React.SetStateAction<typeof defaultState>
>;

const defaultUpdate: UpdateType = () => defaultState;



var localeContext = React.createContext({
  ...defaultState,
  getLocaleString:( key: string ): string => {
    return ""
  }
});


export const useLocaleContext = ()=>{
  return useContext( localeContext )
}

export function getProvider() {
  type Props = {
    children: React.ReactNode;
  };

  const Provider = ({ children }: Props): JSX.Element =>  {
    const [ state, setState ] = useState( defaultState );
    const setLocale = ( locale: localeType) => {
        const newState = {
          ...state,
          ...{ initialized: true },
          ...locale
          };

        setState( newState );
      }
    const getLocaleString = ( key: string ):string => {
        return key + ":" + state.lang
      }

    const udpateLocale = ()=>{
      var res = i18n.initializeLocale()
      console.log("updated Locale: " + JSON.stringify( res ))
      setLocale( res );
    }

    useEffect(()=>{
        udpateLocale();
    }, []);

    return  (
              < Suspense  fallback={ LoadingSpinner } >
               <localeContext.Provider value={{...state,  getLocaleString }} >
                {children}
               </localeContext.Provider>
              </Suspense>
             );
  }
  return [ Provider ] as const; 
}




