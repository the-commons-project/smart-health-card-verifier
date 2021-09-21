export const getIssuerFromFhir = (credential: any): string => {
  const { iss: issuer } = credential
  return issuer
}
