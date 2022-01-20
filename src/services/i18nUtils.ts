import i18next from 'i18next';
import RNLocalize from "react-native-localize";
import { useTranslation as i18nUseTranslation, initReactI18next } from "react-i18next";
import  { localeType} from '../types'
import { localeLoopupUpHost } from './constants'
import Timer from '../utils/timer'
import defaultLocaleResource  from "../../resources/public/locales/en/default.json"
import frResource  from "../../resources/public/locales/fr/default.json"
import jaResource  from "../../resources/public/locales/ja/default.json"


const localeResolutionOnly = true

type localeResourcesMapType = {
  [key:string] : any 
}


const localeResourcesMap:localeResourcesMapType = {
  "en": defaultLocaleResource,
  "fr": frResource,
  "ja": jaResource
}


const localeFetchURL = `${localeLoopupUpHost}/{{lng}}/default.json`
/* #TODO: Can change to more granular when server side has fallback logic 
  `${localeLoopupUpHost}/{{lng}}/{{region}}/default.json` */

const defaultState = {
  key: "en",
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

  bindChange( callback: any ){
    var that = this
    RNLocalize.addEventListener("change", async() => {
      await this.updateLocale(false);
      callback();
      // do localization related stuff…
    });
  }


  getSystemLocale(){
    return RNLocalize.getLocales()
  }

  setCurrentLocale( key: string, lang: string, region: string,  ){
    this.currentLocale = { key, lang, region }
  }

  parseResult( res: any ) {
    const{ key, data, lang, region } = res;
    const resources = data[defaultNameSpace] 
    return [key, defaultNameSpace, resources, lang, region ]
  }
  
  fetchLocalResource( lang: string, region: string,): Promise<any>{
    return ( localeResourcesMap[ lang ] || null )
  }

  async fetchResource( lang: string, region: string,  ): Promise< any >{
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
        res = this.fetchLocalResource( lang, region );
        console.log(`loading locale Resources ( FAILED! ) :  ${loadingTime.toFixed(2)}sec`)
      }
    } else {
      console.log(`picked up resources from the local cache`)
    }
    return res;
  }

  updateResourceBundle( res: any ):[ key: string, lang: any, region:any] {
      var _lang:any
      var _region:any
      const [key, namespace, resources, lang, region ] = this.parseResult( res );
      /* Store data : #TODO to store locally */
      _lang = lang 
      if ( region == 'default'){
        _region = null
      }
      i18next.addResourceBundle( key, namespace, resources, true, true );
      this.cache.set( _lang, _region, resources )
      return [key, _lang, _region];
  }

  loadDefaultResources(){
    Object.keys( localeResourcesMap ).forEach( key => {
      this.updateResourceBundle(localeResourcesMap[key])
    })
  }

  async updateLocale(force: boolean = false): Promise<localeType>{
    var key         = defaultState.key
    var _lang       = defaultState.lang 
    var _region:any = defaultState.region
    var arr = this.getSystemLocale()
    var res = defaultLocaleResource;
    if( arr.length > 0 ) {
      _lang = arr[0].languageCode
      _region = arr[0].countryCode
      res = await this.fetchResource( _lang, _region ) || res
    }
    [ key, _lang, _region ] = this.updateResourceBundle( res );
    i18next.changeLanguage( key )
    this.setCurrentLocale( key, _lang, _region )
    return this.currentLocale
  }

  initializeLocale(){
    var that = this;
    that.loadDefaultResources()
    that.updateLocale(true)
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