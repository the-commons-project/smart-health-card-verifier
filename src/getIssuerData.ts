import { ErrorCode } from './error'
import { issuerNameLookUpUrl } from './constants'

export const getIssuerData = async (issuer: string): Promise<any> => {
  const issuerUrlParameter = `&issuer=${escape(issuer)}`

  const url = `${issuerNameLookUpUrl}${issuerUrlParameter}`

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
