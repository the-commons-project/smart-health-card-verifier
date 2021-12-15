import { ErrorCode } from '../error'
import { issuerNameLookUpUrl, issuerStatus } from '../constants'
import { getInstallationIdManually } from '../utils'
import Timer from '../../utils/timer'

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
  let loadingTime = timer.stop()
  console.log(`loading issure took:  ${loadingTime.toFixed(2)}sec`)

  const okOrNotFound = response.status === 200 || response.status === 404

  if (!okOrNotFound) {
    throw ErrorCode.SERVER_ERROR
  }

  return response.json()
}
