/* eslint-disable new-cap */

import i18next from 'i18next'
import RNLocalize from 'react-native-localize'
import { useTranslation as i18nUseTranslation, initReactI18next } from 'react-i18next'
import  { localeType } from '../../types'
import { localeLookUpUrl, ApiTimeout } from '~/models/constants'
import { Timer } from 'verifier-sdk'
import defaultLocaleResource  from '~/../resources/public/locales/en/default.json'
import frResource  from '~/../resources/public/locales/fr/default.json'
import jaResource  from '~/../resources/public/locales/ja/default.json'
import i18nCache from './i18nCache'
import { fetchWithTimeout } from '~/utils/utils'
import remoteConfig from '~/models/RemoteConfig'

const localeResolutionOnly = true
const mappedHistory: Record<string, string[] > = {}

interface localeResourcesMapType {
  [key: string]: any 
}

const localeResourcesMap: localeResourcesMapType = {
  'en': defaultLocaleResource,
  'fr': frResource,
  'ja': jaResource
}

const localeFetchURL = `${localeLookUpUrl}/{{lng}}/{{region}}.json`
/* #TODO: Can change to more granular when server side has fallback logic 
  `${localeLoopupUpHost}/{{lng}}/{{region}}/default.json` */

const defaultState = {
  key: 'en',
  language: 'en',
  region: null,
}

export const defaultNameSpace = 'default'

interface fetchResult {
  key: string
  data: any
}

const i18nOption = {
  compatibilityJSON: 'v3',
  initImmediate: false,
  react: { 
    useSuspense: false
  },
  ns: [defaultNameSpace],
  defaultNS: defaultNameSpace,
  resources: {},
  useSuspense: false,
  languages: ['en', 'fr', 'ja']
}

class i18nUtils{
  static initailize: any
  currentLocale: any
  cache: i18nCache
  currentLanguageRequest: string | null

  constructor (){
    this.initializei18n()
    this.currentLocale = {
      defaultState
    }
    this.currentLanguageRequest = null
    this.cache = new i18nCache()
  }  

  initializei18n (){
    i18next
      .use( initReactI18next )
      .init( i18nOption )
  }

  bindChange ( callback: any ){
    const that = this
    RNLocalize.addEventListener('change', async () => {
      const  res =  await that.updateLocale()
      if ( res != null ) {
        callback( this.currentLocale )
      }
      // do localization related stuff…
    })
  }

  getSystemLocale (){
    return RNLocalize.getLocales()
  }

  setCurrentLocale ( key: string, language: string, region: any  ){
    this.currentLocale = { key, language, region }
  }

  parseResult ( res: any ) {
    const { key, data, language, region } = res
    const resources = data[defaultNameSpace] 
    return [key, defaultNameSpace, resources, language, region ]
  }
  
  async fetchLocalResource ( language: string, region: string,): Promise<any>{
    return await Promise.resolve( localeResourcesMap[ language ] || null )
  }

  getKey ( language: string, region: string | null ): string {
    let key = [ language, ( region ?? 'default')].join('_').toLowerCase()
    key = key.replace('_default', '')
    return key
  }

  async hasLocalCache ( language: string, region: any ){
    const res = await this.cache.get(language, region )
    return ( res !== null )
  }

  async fetchResource ( language: string, region: string,  ): Promise< any>{
    let key         = defaultState.key
    let _lang       = defaultState.language 
    let _region: any = defaultState.region
    let found       = false

    const timer = new Timer()
    const   url =  localeFetchURL
      .replace('{{lng}}', language)
      .replace('{{region}}', region)

    timer.start()
    let res = null
    res = await this.hasLocalCache(language, region )
    console.log(`has local cache for ${language}:${region}=${String(res)}`)
    if ( res ) {
      key = this.getKey( language, region )
      _lang = language.toLowerCase()
      _region = region.toLowerCase()
      found = true
    } else if ( ( mappedHistory[url] ?? null ) != null ) {
      [ key, _lang, _region ] = mappedHistory[url] 
      found = true
      console.log(`Using mapped history: ${key}`)
    } else if ( !remoteConfig.useLegacy() ) {
      try {
        console.log(`loading ${key}: ${url}` )
        const response  = await fetchWithTimeout(url, {}, ApiTimeout, 'ErrorLoadingVaccineCodes')
        const loadingTime = timer.stop()
        console.log(`loading locale Resources:  ${loadingTime.toFixed(2)}sec`)

        if ( response?.status !== undefined && response.status === 200 ) {
          res = await response.json()
          if ( res != null ){
            [ key, _lang, _region ] = this.updateResourceBundle( res )
            console.info(`url( ${url} } mapped to : [${key}, ${_lang}, ${String(_region)}`)
            mappedHistory[url] = [ key, _lang, _region ]
            found = true
          }
        } 
      } catch (error) {
        const loadingTime = timer.stop()
      }
        
    }
    if ( !found ) {
      res = await this.hasLocalCache(language, 'default' )
      console.log(`try with only language ${language} : ${String(res)}`)
      if ( res ) {
        key = this.getKey( language, null )
        _lang = language.toLowerCase()
        _region = null
        found   = true
      } else {
        return null
      }
    }
    return [ key, _lang, _region ]
  }

  updateResourceBundle ( bundle: any ): [ key: string, language: any, region:any] {
    let _region: any
    const [key, namespace, resources, language, region ] = this.parseResult( bundle )

    /* Store data : #TODO to store locally */
    const _lang   = language
    _region = region
    if ( _region === 'default'){
      _region = null
    } 
    i18next.addResourceBundle( key, namespace, resources, true, true )
    this.cache.set( _lang, _region, resources )
    return [key, _lang, _region]
  }

  loadDefaultResources (){
    Object.keys( localeResourcesMap ).forEach( key => {
      this.updateResourceBundle(localeResourcesMap[key])
    })
  }

  async updateLocale (): Promise<localeType | null >{
    let key                = defaultState.key
    let _lang              = defaultState.language 
    let _region: string|null = defaultState.region
    const arr = this.getSystemLocale()
    if ( arr.length > 0 ) {
      _lang   = arr[0].languageCode
      _region = ( arr[0].countryCode || '')
      const nextLangRequest  = `${_lang}:${_region}`
      if ( this.currentLanguageRequest === nextLangRequest ){
        console.info(`already requesting ${nextLangRequest}`)
        return this.currentLocale
      }
      this.currentLanguageRequest = nextLangRequest 
      const res = await this.fetchResource( _lang, _region ) 
      if ( res != null ){
        [ key, _lang, _region ] = res
      } 
    }
    i18next.changeLanguage( key )
    this.setCurrentLocale( key, _lang, _region )
    return this.currentLocale
  }

  async initializeLocale (){
    this.loadDefaultResources()
    return await this.updateLocale()
  };

}

const initailize = (): i18nUtils => {
  return new i18nUtils() 
}

i18nUtils.initailize = initailize
const useTranslation = ()=> {
  return i18nUseTranslation( defaultNameSpace )
}

export { useTranslation }

export default i18nUtils
