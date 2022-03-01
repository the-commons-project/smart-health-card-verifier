import { ErrorCode } from '../error'
import { issuerNameLookUpUrl, issuerStatus, issuersUrl, ApiTimeout } from '../constants'
import { getInstallationIdManually, fetchWithTimeout } from '../../utils/utils'
import { DataKeys, loadDataOrRetrieveLocally } from '../../services/data/DataService'
import Timer from '../../utils/timer'
import remoteConfig from '../RemoteConfig'

let issuersMap: Record<string, any> | null = null

interface IssuerItemType {
  'iss': string
  'name': string
  'logo_uri': string
  'updated_at': number
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

export const getIssuerData = async ( issuer: string ):  Promise<any> => {
  if ( remoteConfig.usingLegacy() ) {
    return await _getIssuerDataLegacy( issuer )
  }
  return await getIssuerData( issuer )
}

export const _getIssuerData = async (issuer: string): Promise<any> => {
  console.info(`get new shc service : ${issuer}`)
  return ((issuersMap??{})[issuer] || null )
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
