const appUUID = 'test'
const issuerStatus = 'VERIFIED'

const apiLookUpHost = 'https://01djq2yvy8.execute-api.us-west-1.amazonaws.com'
const issuerLookUpPath = '/prod/issuers/lookup'
const vaccineNameLookUpPath = '/prod/vaccines'

export const issuerNameLookUpUrl = `${apiLookUpHost}${issuerLookUpPath}?appUUID=${appUUID}&status=${issuerStatus}`
export const vaccineNameLookUpUrl = `${apiLookUpHost}${vaccineNameLookUpPath}`
