const apiLookUpHost = 'https://shc.tcp.affinidi.com'
const issuerLookUpPath = '/api/v1/issuers/lookup'
const vaccineNameLookUpPath = '/api/v1/vaccines'

export const issuerStatus = 'VERIFIED'
export const issuerNameLookUpUrl = `${apiLookUpHost}${issuerLookUpPath}`
export const vaccineNameLookUpUrl = `${apiLookUpHost}${vaccineNameLookUpPath}`

// UUID namespace generated with uuidv5 using '00000000-0000-0000-0000-000000000000' as namespace
// and health-card-verifier-mobile as text. This generated namespace will be used on all uuidv5
// calls. => `uuidv5("health-card-verifier-mobile", '00000000-0000-0000-0000-000000000000')`
export const uuidNamespace = '099ab7c3-b177-5509-bc9f-6118484acefe'
