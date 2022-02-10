import { ErrorCode } from '../error'
import { issuerNameLookUpUrl, issuerStatus, issuersUrl, ApiTimeout} from '../constants'
import { getInstallationIdManually, fetchWithTimeout } from '../utils'
import Timer from '../../utils/timer'

export const loadIssuers = async(): Promise<boolean>=> {
  const appUuid = await getInstallationIdManually()

  const appUuidParameter = `appUUID=${appUuid}`
  const url = `${issuersUrl}?${appUuidParameter}`

  let response
  const timer = new Timer()
  timer.start()
  try {
    console.log("loading issuers: " + url );
    response = await fetchWithTimeout(url, {}, ApiTimeout, "ErrorLoadingIssuers")
  } catch (error) {
    throw ErrorCode.SERVER_ERROR
  }
  const loadingTime = timer.stop()
  console.log(`loading issuers took:  ${loadingTime.toFixed(2)}sec`)

  const okOrNotFound = response.status === 200 || response.status === 404

  if (!okOrNotFound) {
    throw ErrorCode.SERVER_ERROR
  }

  return await response.json()
}


export const getIssuerData = async (issuer: string): Promise<any> => {
  const appUuid = await getInstallationIdManually()

  const appUuidParameter = `appUUID=${appUuid}`
  const issuerUrlParameter = `issuer=${escape(issuer)}`
  const issuerStatusParameter = `status=${issuerStatus}`

  const parameters = `?${appUuidParameter}&${issuerUrlParameter}&${issuerStatusParameter}`
  const url = `${issuerNameLookUpUrl}${parameters}`

  let response
  const timer = new Timer()
  timer.start()
  try {
    response = await fetch(url)
  } catch (error) {
    throw ErrorCode.SERVER_ERROR
  }
  const loadingTime = timer.stop()
  console.log(`loading issuer took:  ${loadingTime.toFixed(2)}sec`)

  const okOrNotFound = response.status === 200 || response.status === 404

  if (!okOrNotFound) {
    throw ErrorCode.SERVER_ERROR
  }

  return await response.json()
}
