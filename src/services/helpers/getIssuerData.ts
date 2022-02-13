import { ErrorCode } from '../error'
import { issuerNameLookUpUrl, issuerStatus, issuersUrl, ApiTimeout} from '../constants'
import { getInstallationIdManually, fetchWithTimeout } from '../../utils/utils'
import { DataKeys, loadDataOrRetrieveLocally} from '../../services/data/DataService'
import Timer from '../../utils/timer'

var issuersMap: Record<string, any> | null = null;

interface IssuerItemType {
  "iss": string,
  "name": string,
  "logo_uri": string,
  "updated_at": number
} 

interface IssuerResponse {
  [key:string]: IssuerItemType
} 

export const loadIssuers = async(): Promise<boolean>=> {
  const appUuid = await getInstallationIdManually()
  const appUuidParameter = `appUUID=${appUuid}`
  const url = `${issuersUrl}?${appUuidParameter}`
  const res = await loadDataOrRetrieveLocally<IssuerItemType|null>( url, DataKeys.ISSUERS );
  issuersMap = res;
  return ( issuersMap != null );
}


export const getIssuerData = async (issuer: string): Promise<any> => {
  return ((issuersMap||{})[issuer] || null )
}
