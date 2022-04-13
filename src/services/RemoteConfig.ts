import defaultConfig from '../../resources/public/remote-config/remote_config.json'
import { getInstallationIdManually } from '../utils/utils'
import { remoteConfigURl } from './constants'
import { loadDataOrRetrieveLocally, DataKeys } from './data/DataService' 
type RemoteConfigType =  Record<string, any >

var remoteConfigData:RemoteConfigType = defaultConfig

class RemoteConfig {
  
  async updateRemoteConfig (){
    const appUuid: string = await getInstallationIdManually()
    const appUuidParameter = `appUUID=${appUuid}`
    const url = `${remoteConfigURl}?${appUuidParameter}`
    const res = await loadDataOrRetrieveLocally<RemoteConfigType| null>( url, DataKeys.REMOTECONFIG )
    if ( res != null ) {
      remoteConfigData   = res ?? remoteConfigData
    } else {
      console.log('using default vaccineCodes')
    }
    Promise.resolve(true)
  }


  usingLegacy():boolean{
    const res = ( remoteConfigData.usingLegacy ?? false );
    console.info( `usingLegacy = ${res}`)
    return res;
  }
}

const remoteConfig = new RemoteConfig()

export default remoteConfig
