/* This service handles local data interface */ 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Timer from '../../utils/timer'
import { fetchWithTimeout } from '../../utils/utils'
import { ApiTimeout } from '../constants'



export enum DataKeys {
  "ISSUERS"     = "ISSUERS",
  "VACCINECODE" = "VACCINECODE",
  "LASTUPDATE"  = "LASTUPDATE",
  "APIVERSION"  = "APIVERSION"
};


class DataService {

  async storeJSON(key: DataKeys, value: object): Promise<boolean> {
    return await this.storeData( key, JSON.stringify(value));
  };

  async getJSON(key: DataKeys ): Promise<string|null> {
    let res = await this.getData( key);
    if( res != null ) {
      try {
        res = JSON.parse( res );
      } catch {
        console.error(`JSON Parse for ${key} failed `)
        res = null;
      }
    }
    return res;
  };

  async storeData(key: DataKeys, value: string): Promise<boolean> {
    try {
      await AsyncStorage.setItem( key, value);
      return true 
    } catch (error) {
      console.error( 'Storing Error: ' + error )  
    }
    return false;
  };

  async getData( key: DataKeys ): Promise<string|null>{
    try {
      const value = await AsyncStorage.getItem(key);
      return value; 
    } catch (error) {
      console.error( 'Retrieving local storage Error: ' + error )  
    }
    return null;

  }

  async resetData():Promise<boolean>{
    try {
      for (const value in DataKeys) {
        await AsyncStorage.removeItem(value);
      }
    } catch ( error ) {

    }
    return true;
  }

  async setLatestUpdate():Promise<boolean>{
    const res = await this.storeData(DataKeys.LASTUPDATE, (new Date).getTime().toString() );
    return res;
  }

  async getLastUpdate(){
    const value = await this.getData( DataKeys.LASTUPDATE);
    if( value != null ) {
      return new Date( Number( value ) );
    }
    return null;
  }

  async setLatestAPIVersion( apiVersion: string ):Promise<boolean>{
    const res = await this.storeData(DataKeys.APIVERSION, apiVersion );
    return res;
  }

  async getLastAPIVersion(): Promise<string|null>{
    const value = await this.getData( DataKeys.APIVERSION );
    return value;
  }

}


var dataService: DataService | null = null;

export const getDataService = ():DataService=> {
  if( dataService == null ) {
    dataService = new DataService();
  }
  return dataService;
}

export const loadDataOrRetrieveLocally = async<T>( url:string, key:DataKeys):Promise<T> => {
  const dataService = getDataService();
  let response
  const timer = new Timer()
  timer.start()
  try {
    console.log(`loading ${key}: ${url}` );
    response = await fetchWithTimeout(url, {}, ApiTimeout, "ErrorLoadingVaccineCodes")
  } catch (error) {
    console.log(`ErrorLoading ${key}: ${error}`)
  }
  const loadingTime = timer.stop()
  console.log(`loading ${key} took:  ${loadingTime.toFixed(2)}sec`)
  var res = null;

  if( response && response.status && response.status === 200 ) {
    res = await response.json()
    if( res != null ){
      dataService.storeJSON( key, res )
    }
  } else {
    console.log(`try loading local ${key}`)
    res = dataService.getJSON( key )
  } 
  return res as T
}