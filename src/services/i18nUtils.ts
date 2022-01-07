import i18next from 'i18next';
import * as RNLocalize from "react-native-localize";
import { useTranslation as i18nUseTranslation, initReactI18next } from "react-i18next";
import  { localeType} from '../types'
import { localeLoopupUpHost } from './constants'
import Timer from '../utils/timer'
import defaultLocaleResource  from "../../resources/public/locales/en/default.json"
const localeFetchURL = `${localeLoopupUpHost}/{{lng}}/default.json`
/* #TODO: Can change to more granular when server side has fallback logic 
  `${localeLoopupUpHost}/{{lng}}/{{region}}/default.json` */

const defaultState = {
  lang: "en",
  region: "US",
};

export const defaultNameSpace = 'default'

type fetchResult = {
  key: string
  data: any
}

const i18nOption = {
    compatibilityJSON: 'v3',
    initImmediate: false,
    react: { 
      useSuspense: true
    },
    ns: [defaultNameSpace],
    defaultNS: defaultNameSpace,
    resources: {},
    languages: ['en','fr']
}

class i18nCache {
  store:any = {}
  constructor(){
    this.store = {}
  }

  async set( lang:string, region:string, data:any ) {
    this.store[ lang ] = this.store[ lang ] || {}
    if( region == null || region.length == 0 ) {
      this.store[ lang ][ 'default' ] = data
    } else {
      this.store[ lang ][region] = data 
    }
  }

  async get( lang: string, region: string  ) : Promise< any > {
    return this.store[ lang ] ? 
      ( this.store[ lang ][ region ] || this.store[lang]['default'] || null ) 
      : null 
  } 
}

class i18nUtils{
  static initailize: any
  currentLocale: any
  cache: i18nCache

  constructor(){
    this.initializei18n()
    this.currentLocale = {
      defaultState
    }

    this.cache = new i18nCache()
  }

  initializei18n(){
    i18next
      .use( initReactI18next )
      .init( i18nOption );
  }


  getSystemLocale(){
    return RNLocalize.getLocales()
  }

  setCurrentLocale( lang: string, region: string,  ){
    this.currentLocale = { lang, region }
  }

  parseResult( res: any ) {
    const{ key, data, lang, region } = res;
    const resources = data[defaultNameSpace] 
    return [key, defaultNameSpace, resources, lang, region ]
  }

  async fetchLocaleResource( lang: string, region: string,  ): Promise< any >{
    const timer = new Timer()
    var   url   =  localeFetchURL
                    .replace("{{lng}}",lang)
                    .replace("{{region}}", region)

    console.log( `resource url = ${url}` );
    timer.start()
    var res = null;
    res = await this.cache.get(lang, region )
    if( res == null ) {
      try {
        var tmp = await fetch(url)
        let loadingTime = timer.stop()
        console.log(`loading locale Resources:  ${loadingTime.toFixed(2)}sec`)
        res = tmp.json()
      } catch (error) {
        let loadingTime = timer.stop()
        console.log(`loading locale Resources ( FAILED! ) :  ${loadingTime.toFixed(2)}sec`)
      }
    } else {
      console.log(`picked up resources from the local cache`)
    }
    return res;
  }

  async initializeLocale() : Promise<localeType> {
    console.info("#YF: initializeLocale")
    var that = this;
    return new Promise( async ( resolve:any, reject:any )=>{
        var _lang       = defaultState.lang 
        var _region:any = defaultState.region
        var arr = that.getSystemLocale()
        var res = defaultLocaleResource;
        if( arr.length > 0 ) {
          _lang = arr[0].languageCode
          _region = arr[0].countryCode
          res = await that.fetchLocaleResource( _lang, _region ) || res
        }
        const [key, namespace, resources, lang, region ] = that.parseResult( res );
        /* Store data : #TODO to store locally */
        _lang = lang 
        if ( region == 'default'){
          _region = null
        }
        console.info("adding resources : "  + JSON.stringify( resources ))
        i18next.addResourceBundle( key, namespace, resources, true, true );
        i18next.changeLanguage( key )
        that.cache.set( _lang, _region, resources )
        that.setCurrentLocale( _lang, _region )
        resolve( res )
      });
  };

}

const initailize = ():i18nUtils => {
  return new i18nUtils();
}

i18nUtils.initailize = initailize
const useTranslation = ()=> {
  return i18nUseTranslation([ defaultNameSpace ])
}

export { useTranslation }

export default i18nUtils;