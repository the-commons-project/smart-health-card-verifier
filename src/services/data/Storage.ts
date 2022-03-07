/* eslint no-useless-catch: "off" */

import AsyncStorage from '@react-native-async-storage/async-storage'

export interface KVStorage {
  setData: ( key: string, value: String ) => Promise<any>
  getData: ( key: string ) => Promise<any>
  removeItem: (key: string) => Promise<any>
  setNumber: ( key: string, value: number ) => Promise<any>
  getNumber: ( key: string ) => Promise<any>
  setJSON: (key: string, value: object) => Promise<any>
  getJSON: (key: string ) => Promise<object|null>
}

class Storage implements KVStorage {
  asyncStorage: typeof AsyncStorage
  constructor (){
    this.asyncStorage = AsyncStorage
  }

  async setData ( key: string, value: String ): Promise<any> {
    try {
      return ( await AsyncStorage.setItem( key, value.toString() ) )
    } catch ( error ) {
      throw error
    }
  }

  async getData ( key: string ): Promise<any> {
    try {
      return ( await AsyncStorage.getItem( key ) )

    } catch ( error ) {
      throw error
    }
  }

  async removeItem ( key: string ) {
    try {
      return ( await AsyncStorage.removeItem( key ) )
    } catch ( error ) {
      throw error
    }
  }

  async setNumber (key: string, value: number): Promise<any> {
    return await this.setData( key, value.toString() )
  };

  async getNumber (key: string): Promise<any> {
    try {
      let str = await this.getData( key );
      return ( Number.isNaN( str ) ? null : Number( str ));
    } catch (error) {
      throw error
    }
  };

  async setJSON (key: string, value: object): Promise<any> {
    return await this.setData( key, JSON.stringify(value))
  };

  async getJSON (key: string ): Promise<object|null> {
    let res = await this.getData( key)
    if ( res != null ) {
      try {
        res = JSON.parse( res )
      } catch ( error ) {
        throw error
      }
    }
    return res
  };

}

let _storage: Storage | null = null

export const getStorage = (): KVStorage => {
  _storage =  _storage ?? ( new Storage() )
  return _storage
} 
