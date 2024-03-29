/* This service handles local data interface */ 
import { Timer } from 'verifier-sdk'
import { fetchWithTimeout } from '../../utils/utils'
import { ApiTimeout } from '~/models/constants'
import { getStorage, KVStorage } from './Storage'

export enum DataKeys {
  'ISSUERS'     = 'ISSUERS',
  'VACCINECODE' = 'VACCINECODE',
  'REMOTECONFIG' = 'REMOTECONFIG',
  'LASTUPDATE'  = 'LASTUPDATE',
  'APIVERSION'  = 'APIVERSION'
};

class DataService {

  storage: KVStorage
  constructor (){
    this.storage = getStorage()
  }

  async storeJSON (key: DataKeys, value: object): Promise<boolean> {
    return await this.storage.setJSON( key, value )
  };

  async getJSON (key: DataKeys ): Promise<object|null> {
    let res = null 
    try {
      res = await this.storage.getJSON( key)
    } catch ( error ) {
      console.error(`JSON Parse for ${key} failed `)
      res = null
    }
    return res
  };
  async removeData( key: DataKeys ): Promise<boolean> {
    try {
        await this.storage.removeItem( key)
        return true 
      } catch (error) {
        console.error( `Storing Error: ${String(error)}` )  
      }
      return false
    
  }
  
  async storeData (key: DataKeys, value: string): Promise<boolean> {
    try {
      await this.storage.setData( key, value)
      return true 
    } catch (error) {
      console.error( `Storing Error: ${String(error)}` )  
    }
    return false
  };

  async getData ( key: DataKeys ): Promise<string|null>{
    try {
      const value = await this.storage.getData(key)
      return value 
    } catch (error) {
      console.error( `etrieving local storage Error: ${String(error)}` )  
    }
    return null

  }

  async resetData (): Promise<boolean>{
    try {
      for (const value in DataKeys) {
        await this.storage.removeItem(value)
      }
    } catch ( error ) {

    }
    return true
  }

  async clearLatestUpdate (): Promise<boolean>{
    const res = await this.removeData(DataKeys.LASTUPDATE);
    return res
  }

  async setLatestUpdate (): Promise<boolean>{
    const res = await this.storeData(DataKeys.LASTUPDATE, (new Date).getTime().toString() )
    return res
  }

  async getLastUpdate (){
    const value = await this.getData( DataKeys.LASTUPDATE)
    if ( value != null ) {
      return new Date( Number( value ) )
    }
    return null
  }

  async setLatestAPIVersion ( apiVersion: string ): Promise<boolean>{
    const res = await this.storeData(DataKeys.APIVERSION, apiVersion )
    return res
  }

  async getLastAPIVersion (): Promise<string|null>{
    const value = await this.getData( DataKeys.APIVERSION )
    return value
  }

}

let dataService: DataService | null = null

export const getDataService = (): DataService=> {
  if ( dataService == null ) {
    dataService = new DataService()
  }
  return dataService
}

export const loadDataOrRetrieveLocally = async<T>( url: string, key: DataKeys): Promise<T> => {
  const dataService = getDataService()
  let response
  let res = null
  const timer = new Timer()
  timer.start()

  try {
    console.debug(`loading ${key}: ${url}` )
    response = await fetchWithTimeout(url, {}, ApiTimeout, `ErrorLoading${key}` )
  } catch (error) {
    console.log(`Error Loading ${String(key)}: ${String(error)}`)
  }
  const loadingTime = timer.stop()
  console.log(`loading ${key} took:  ${loadingTime.toFixed(2)}sec`)

  if ( response?.status === 200 ) {
    res = await response.json()
    if ( res != null ){
      await dataService.storeJSON( key, res )
    }
  } else {
    
    res = await dataService.getJSON( key )
  } 
 
  return res as T
}
