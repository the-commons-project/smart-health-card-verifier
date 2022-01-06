import i18next from 'i18next';
import * as RNLocalize from "react-native-localize";
import { useTranslation, initReactI18next } from "react-i18next";
import  { localeType} from '../types'
import { localeLoopupUpHost } from './constants'


const defaultState = {
  lang: "en",
  region: "US",
};

const backend = {
    loadPath:  `${localeLoopupUpHost}{{lng}}/{{ns}}.json`,
    crossDomain: true,
}


class i18nUtils{
  static initailize: any

  constructor(){
    this.initializei18n()
  }


  initializei18n(){
    i18next
      .use( initReactI18next )
      .init({ 
          resources: {},
          backend
      });
  }

  getSystemLocale(){
    return RNLocalize.getLocales()

  }

  async initializeResourceWithLocale(lang: string, region: string ): Void {
    return new Promise( ( resolve:any, reject:any )=>{
        setTimeout( ()=> {
          resolve({lang:lang,region:region})
        }, 1000 )
      });
  }

  async initializeLocale() : Promise<localeType> {
    console.info("#YF: initializeLocale")
    var that = this;
    return new Promise( ( resolve:any, reject:any )=>{
        setTimeout( async ()=> {
          var arr = that.getSystemLocale()
          if( arr.length > 0 ) {
            try{ 
              var res = await that.initializeResourceWithLocale( arr[0].languageCode, arr[0].countryCode )
              resolve( res )
            } catch {
              var res = that.initializeResourceWithLocale( defaultState.lang, defaultState.region )
              resolve( res )
            }

          }
          
        }, 1000 )
      });
  };

}

const initailize = ():i18nUtils => {
  return new i18nUtils();
}

i18nUtils.initailize = initailize

export default i18nUtils;