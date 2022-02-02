import i18next from 'i18next'
import RNLocalize from 'react-native-localize'
import { useTranslation as i18nUseTranslation, initReactI18next } from 'react-i18next'
import  { localeType } from '../../types'
import { localeLoopupUpHost } from '../constants'
import Timer from '../../utils/timer'
import defaultLocaleResource  from '../../../resources/public/locales/en/default.json'
import frResource  from '../../../resources/public/locales/fr/default.json'
import jaResource  from '../../../resources/public/locales/ja/default.json'
import i18nCache from './i18nCache'

const localeResolutionOnly = true

interface localeResourcesMapType {
  [key: string]: any 
}

const localeResourcesMap: localeResourcesMapType = {
  'en': defaultLocaleResource,
  'fr': frResource,
  'ja': jaResource
}

const localeFetchURL = `${localeLoopupUpHost}/{{lng}}/default.json`
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

  constructor (){
    this.initializei18n()
    this.currentLocale = {
      defaultState
    }

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
      await this.updateLocale()
      callback( this.currentLocale )
      // do localization related stuff…
    })
  }

  getSystemLocale (){
    return RNLocalize.getLocales()
  }

  setCurrentLocale ( key: string, language: string, region: string,  ){
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
    let key = [ language, ( region || 'default')].join('_').toLowerCase()
    key = key.replace('_default', '')
    return key
  }

  async fetchResource ( language: string, region: string,  ): Promise< any >{
    let key         = defaultState.key
    let _lang       = defaultState.language 
    let _region: any = defaultState.region

    const timer = new Timer()
    const   url   =  localeFetchURL
      .replace('{{lng}}', language)
      .replace('{{region}}', language)

    timer.start()
    let res = null
    res = await this.cache.get(language, region )
    if ( res != null ) {

      key = this.getKey( language, region )
      _lang = language.toLowerCase()
      _region = region.toLowerCase()

    } else if ( ( res = this.cache.get( language, 'default') ) != null ){
      _lang = language.toLowerCase()
      _region = null
      key = this.getKey( language, _region )

    } 
    // else {

    //   try {
    //     var tmp = await fetch(url)
    //     let loadingTime = timer.stop()
    //     console.log(`loading locale Resources:  ${loadingTime.toFixed(2)}sec`)
    //     res = tmp.json()
    //     if( res ) {
    //       [ key, _lang, _region ] = this.updateResourceBundle( res );
    //        console.info(`#YF fetchResource3: From remote${lang}, ${_region}`)
    //     }
    //   } catch (error) {
    //     let loadingTime = timer.stop()
    //     console.log(`loading locale Resources ( FAILED! ) :  ${loadingTime.toFixed(2)}sec`)
    //     return null;
    //   }
    // }
    return [ key, _lang, _region ]
  }

  updateResourceBundle ( bundle: any ): [ key: string, language: any, region:any] {
    let _lang: any
    let _region: any
    const [key, namespace, resources, language, region ] = this.parseResult( bundle )
    /* Store data : #TODO to store locally */
    _lang = language 
    if ( region == 'default'){
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

  async updateLocale (): Promise<localeType>{
    let key                = defaultState.key
    let _lang              = defaultState.language 
    let _region: string|any = defaultState.region
    const arr = this.getSystemLocale()
    const res = defaultLocaleResource
    if ( arr.length > 0 ) {
      _lang   = arr[0].languageCode
      _region = arr[0].countryCode;
      [ key, _lang, _region ] = await this.fetchResource( _lang, _region ) || res
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
