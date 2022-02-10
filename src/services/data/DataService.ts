/* This service handles local data interface */ 
import AsyncStorage from '@react-native-async-storage/async-storage';



class DataService {

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

export enum DataKeys {
  "ISSUER"       = "ISSUER",
  "VACCINECODE" = "VACCINECODE",
  "LASTUPDATE"  = "LASTUPDATE",
  "APIVERSION"  = "APIVERSION"
};

var dataService: DataService | null = null;

export const getDataService = ():DataService=> {
  if( dataService == null ) {
    dataService = new DataService();
  }
  return dataService;
}