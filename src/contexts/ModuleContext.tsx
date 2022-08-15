/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useRef, useEffect, Suspense } from 'react'
import { ModuleService } from '../services/module/ModuleService' 
import LoadingSpinner from '../components/LoadingSpinner'

interface ModuleDataType{
  isLoaded: boolean
}

// Declaring the state object globally.

const defaultState: ModuleDataType = {
  isLoaded: false 
}

const moduleContext = React.createContext({
  ...defaultState
})

export const useModuleContext = ()=>{
  return useContext( moduleContext )
}

export function getProvider () {
  interface Props {
    children: React.ReactNode
  }

  const Provider = ({ children }: Props): JSX.Element =>  {
    const [ state, setState ] = useState( defaultState )
    const moduleService = ModuleService.getModuleService()

    useEffect( ()=>{
      moduleService.initialize()
      .then( ()=> {
          setState({
            ...state,
            isLoaded: true
          })
        })
    }, [])

    return  (
        ( state.isLoaded )? 
        (
          <moduleContext.Provider value={ { ...state } } >
            { 
              ( state.isLoaded ) && children
            }
          </moduleContext.Provider>
        ):(
          < LoadingSpinner enabled={ true } /> 
        )                 

    )
  }
  return [ Provider ] as const 
}
