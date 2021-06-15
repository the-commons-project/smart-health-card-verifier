const url = 'https://01djq2yvy8.execute-api.us-west-1.amazonaws.com/prod/issuers/lookup?appUUID=test&status=VERIFIED&issuerName=C19%20Cards%20Demo%20Issuer'

export const getIssuerData = async (): any => {
  const response = await fetch(url)

  return response.json()
}
