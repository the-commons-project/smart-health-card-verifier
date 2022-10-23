import { ErrorCode, Timer} from 'verifier-sdk'
import { issuerNameLookUpUrl, issuerStatus, issuersUrl, ApiTimeout } from '~/models/constants'
import { getInstallationIdManually, fetchWithTimeout } from '~/utils/utils'
import { DataKeys, loadDataOrRetrieveLocally, getDataService } from '~/services/data/DataService'
import remoteConfig from '~/models/RemoteConfig'


var issuersMap: Record<string, any> | null = null

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

export const loadIssuers = async ( forceReset: boolean ): Promise<boolean>=> {
  var res = null;
  if( !forceReset ) {
    res = await getDataService().getJSON( DataKeys.ISSUERS )
  } 
  if( res == null ){
    const appUuid = await getInstallationIdManually()
    const appUuidParameter = `appUUID=${String(appUuid)}`
    const url = `${issuersUrl}?${appUuidParameter}`
    res = await loadDataOrRetrieveLocally<IssuerItemType|null>( url, DataKeys.ISSUERS )
  }
  if( res != null ){
    issuersMap = res
  }
  return ( issuersMap != null )
}

export const getIssuerData = async ( verifierKey: string, issuer: string ):  Promise<any> => {
  if ( remoteConfig.useLegacy() ) {
    return await _getIssuerDataLegacy( issuer )
  }
  const res =  await getIssuerIss( issuer )
  return res;
}

/* this is used for non-Legacy code to refer to canonical_iss to look for iss */
export const getIssuerIss = async ( issuer: string ):  Promise<any> => {
  const _issuerMap = (issuersMap??{})
  var issuerItem = await _getIssuerData( issuer )
  if ( issuerItem && issuerItem.canonical_iss ) {
    issuerItem.iss = _issuerMap[issuerItem.canonical_iss].iss || null
  }
  return ( ( issuerItem && issuerItem.iss != null ) ? issuerItem : null );
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
