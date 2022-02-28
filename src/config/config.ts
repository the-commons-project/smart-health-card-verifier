import env from 'react-native-config'

const config = {
  api: {
    uri: env.API_URL,
    key: env.API_KEY,
    backupURL: env.AFFINIDI_SERVICE_SERVICE_URL,
    version: env.API_VERSION,
    path: env.API_PATH,
    services: {
      issuers: env.ISSUER_PATH,
      locale: env.LOCALE_PATH,
      vaccienCodes: env.VCCODE_PATH
    }
  },
}


const API_HOST     = config.api.uri
const API_PATH     = `${config.api.path}/${config.api.version}`
const API_KEY      = config.api.key
const API_VERSION  = config.api.version
const AFFINIDI_HOST = env.AFFINIDI_SERVICE_SERVICE_URL
const API_ISSUERS_PATH = config.api.services.issuers
const API_LOCALE_PATH  = config.api.services.locale
const API_VCCODE_PATH  = config.api.services.vaccienCodes

export {
  API_PATH,
  API_HOST,
  API_KEY,
  API_VERSION,
  AFFINIDI_HOST,
  API_ISSUERS_PATH,
  API_LOCALE_PATH,
  API_VCCODE_PATH,
}

export default config
