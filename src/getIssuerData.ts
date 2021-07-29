import { ErrorCode } from './error'
import { issuerNameLookUpUrl, issuerStatus } from './constants'
import { getInstallationIdManually } from './utils'

export const getIssuerData = async (issuer: string): Promise<any> => {
  const appUuid = await getInstallationIdManually()

  const appUuidParameter = `appUUID=${appUuid}`
  const issuerUrlParameter = `issuer=${escape(issuer)}`
  const issuerStatusParameter = `status=${issuerStatus}`

  const parameters = `?${appUuidParameter}&${issuerUrlParameter}&${issuerStatusParameter}`
  const url = `${issuerNameLookUpUrl}${parameters}`

  let response

  try {
    response = await fetch(url)
  } catch (error) {
    throw ErrorCode.SERVER_ERROR
  }

  const okOrNotFound = response.status === 200 || response.status === 404

  if (!okOrNotFound) {
    throw ErrorCode.SERVER_ERROR
  }

  return response.json()
}
