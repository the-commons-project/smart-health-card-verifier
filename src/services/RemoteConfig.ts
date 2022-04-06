class RemoteConfig {
  
  async updateRemoteConfig (){
    console.info('updating remote config')
    Promise.resolve(true)
  }

  usingLegacy () {
    return false
  }
}

const remoteConfig = new RemoteConfig()

export default remoteConfig
