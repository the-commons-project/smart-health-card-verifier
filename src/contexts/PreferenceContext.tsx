/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useRef, useEffect, Suspense } from 'react'
import PreferenceService from '../services/data/PreferenceService' 

interface preferenceDataType{
  preferenceInitialized: boolean
  isOnboarded: boolean
}

// Declaring the state object globally.

const defaultState: preferenceDataType = {
  preferenceInitialized: false,
  isOnboarded: false 
}

const preferenceContext = React.createContext({
  ...defaultState,
  setOnboarded: ()=>{}
})

export const usePreferenceContext = ()=>{
  return useContext( preferenceContext )
}

export function getProvider () {
  interface Props {
    children: React.ReactNode
  }

  const Provider = ({ children }: Props): JSX.Element =>  {
    const [ state, setState ] = useState( defaultState )
    const prefService = PreferenceService.getPreferenceService()

    const setOnboarded = ()=>{
      prefService.setOnboarded()
      setState({
        ...state,
        isOnboarded: true
      })
    }

    useEffect( ()=>{
      prefService.loadPreference()
        .then( ()=> {
          const isOnboarded  = prefService.isOnboarded()
          setState({
            ...state,
            'preferenceInitialized': true,
            isOnboarded
          })
        })

    }, [])

    return  (
      <preferenceContext.Provider value={ { ...state, setOnboarded } } >
        { children }
      </preferenceContext.Provider>
    )
  }
  return [ Provider ] as const 
}
