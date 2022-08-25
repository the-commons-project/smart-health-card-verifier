import { ErrorCode, Timer} from 'verifier-sdk'
import { issuerNameLookUpUrl, issuerStatus, issuersUrl, ApiTimeout } from '~/models/constants'
import { getInstallationIdManually, fetchWithTimeout } from '~/utils/utils'
import { DataKeys, loadDataOrRetrieveLocally } from '~/services/data/DataService'
import remoteConfig from '~/models/RemoteConfig'

let issuersMap: Record<string, any> | null = null

export interface IssuerItemType {
  'iss': string
  'name': string
  'logo_uri': string
  'updated_at': number
  'canonical_iss'?: string
} 

interface IssuerResponse {
  [key: string]: IssuerItemType
} 

export const loadIssuers = async (): Promise<boolean>=> {
  const appUuid = await getInstallationIdManually()
  const appUuidParameter = `appUUID=${String(appUuid)}`
  const url = `${issuersUrl}?${appUuidParameter}`
  const res = await loadDataOrRetrieveLocally<IssuerItemType|null>( url, DataKeys.ISSUERS )
  issuersMap = res
  return ( issuersMap != null )
}

export const getIssuerData = async ( verifierKey: string, issuer: string ):  Promise<any> => {
  console.log("#YF Get Issuer : " + issuer )
  if ( remoteConfig.useLegacy() ) {
    return await _getIssuerDataLegacy( issuer )
  }
  return await _getIssuerData( issuer )
}

/* this is used for non-Legacy code to refer to canonical_iss to look for iss */
export const getIssuerIss = async ( issuer: string ):  Promise<any> => {
  const _issuerMap = (issuersMap??{})
  var issuerItem = await _getIssuerData( issuer )
  if ( issuerItem && issuerItem.canonical_iss ) {
    console.debug('using canonical_iss')
    issuerItem = _issuerMap[issuerItem.canonical_iss] || issuerItem
  }
  return ( issuerItem?.iss || null );
}

export const _getIssuerData = async (issuer: string): Promise<IssuerItemType|null> => {
  const _issuerMap = (issuersMap??{})
  let issuerItem = _issuerMap[issuer]
  return ( issuerItem || null )
}

export const _getIssuerDataLegacy = async (issuer: string): Promise<any> => {
  const appUuid = await getInstallationIdManually()

  const appUuidParameter = `appUUID=${String(appUuid)}`
  const issuerUrlParameter = `issuer=${encodeURIComponent(issuer)}`
  const issuerStatusParameter = `status=${issuerStatus}`

  const parameters = `?${appUuidParameter}&${issuerUrlParameter}&${issuerStatusParameter}`
  const url = `${issuerNameLookUpUrl}${parameters}`

  let response
  const timer = new Timer()
  timer.start()
  try {
    response = await fetch(url)
  } catch (error) {
    throw  ErrorCode.SERVER_ERROR 
  }
  const loadingTime = timer.stop()
  console.log(`loading issuer took:  ${loadingTime.toFixed(2)}sec`)

  const okOrNotFound = response.status === 200 || response.status === 404

  if (!okOrNotFound) {
    throw ErrorCode.SERVER_ERROR
  }

  return await response.json()
}
