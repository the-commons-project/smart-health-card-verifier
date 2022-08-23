import {
  API_HOST, 
  AFFINIDI_HOST, 
  API_KEY,
  API_PATH, /* api/v1 */
  API_ISSUERS_PATH,
  API_LOCALE_PATH,
  API_VCCODE_PATH,
  API_REMOTE_CONFIG_PATH
} from '~/config/config'

const affinidiHost   = AFFINIDI_HOST
const vaccineNameLookUpPath = '/api/v1/vaccines'

export const ApiTimeout      = 5000
export const localeLookUpUrl = [API_HOST, API_PATH, API_LOCALE_PATH].join('/')
export const issuersUrl      = [API_HOST, API_PATH, API_ISSUERS_PATH].join('/')
export const vaccineCodesURl = [API_HOST, API_PATH, API_VCCODE_PATH].join('/')
export const remoteConfigURl = [API_HOST, API_PATH, API_REMOTE_CONFIG_PATH].join('/')

export const issuerStatus = 'VERIFIED'
export const issuerNameLookUpUrl = `${affinidiHost}/api/v1/issuers/lookup`

export const uuidNamespace = API_KEY
