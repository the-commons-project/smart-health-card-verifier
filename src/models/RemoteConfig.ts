import defaultConfig from '~/../resources/public/remote-config/remote_config.json'
import { getInstallationIdManually } from '~/utils/utils'
import { remoteConfigURl } from '~/models/constants'
import { loadDataOrRetrieveLocally, DataKeys } from '~/services/data/DataService' 
type RemoteConfigType =  Record<string, any >

let remoteConfigData: RemoteConfigType = defaultConfig

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

  shouldUpdateFromRemote (): boolean{
    return remoteConfigData.remoteConfigEnabled ?? false
  }

  useLegacy (): boolean{
    const res = ( remoteConfigData.useLegacy ?? false )
    console.debug( `usingLegacy = ${String(res)}`)
    return res
  }
}

const remoteConfig = new RemoteConfig()

export default remoteConfig
