
var currentConfig = {
  "useLegacy": true,
  "remoteConfigEnabled": false
}

jest.mock('~/../resources/public/remote-config/remote_config.json', () => {
  return currentConfig;
})

jest.mock('~/services/data/DataService',() => {
  return {
    loadDataOrRetrieveLocally: async ()=>{
      return currentConfig;
    },
    DataKeys: {
      'ISSUERS':'ISSUERS',
      'VACCINECODE':'VACCINECODE',
      'REMOTECONFIG':'REMOTECONFIG',
      'LASTUPDATE':'LASTUPDATE',
      'APIVERSION':'APIVERSION'
    }
  };
})

import RemoteConfig from '../src/models/RemoteConfig'


it('Get Synchronize data case', () => {
  var res =  RemoteConfig.shouldUpdateFromRemote()
  expect(res).toEqual(false) 
  currentConfig.remoteConfigEnabled = true
  res =  RemoteConfig.shouldUpdateFromRemote()
  expect(res).toEqual(true) 


})


