const appUUID = 'test'
const issuerStatus = 'VERIFIED'

const apiLookUpHost = 'https://shc.tcp.affinidi.com'
const issuerLookUpPath = '/api/v1/issuers/lookup'
const vaccineNameLookUpPath = '/api/v1/vaccines'

export const issuerNameLookUpUrl = `${apiLookUpHost}${issuerLookUpPath}?appUUID=${appUUID}&status=${issuerStatus}`
export const vaccineNameLookUpUrl = `${apiLookUpHost}${vaccineNameLookUpPath}`
