import { issuerNameLookUpUrl } from './constants'

export const getIssuerData = async (issuer: string): any => {
  const issuerUrlParameter = `&issuer=${escape(issuer)}`
  const url = `${issuerNameLookUpUrl}${issuerUrlParameter}`

  const response = await fetch(url)

  return response.json()
}
