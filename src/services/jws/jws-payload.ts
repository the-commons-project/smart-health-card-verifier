import * as utils from '../utils'
import { validateSchema } from './schema'
import { ErrorCode } from '../error'
import jwsPayloadSchema from '../../schemas/smart-health-card-vc-schema.json'
import * as fhirBundle from './fhirBundle'

export const schema = jwsPayloadSchema

export function validate(jwsPayloadText: string): any {
  if (jwsPayloadText.trim() !== jwsPayloadText) {
    console.log(`JWS payload has leading or trailing spaces`, ErrorCode.TRAILING_CHARACTERS)
    jwsPayloadText = jwsPayloadText.trim()
  }

  const jwsPayload = utils.parseJson<JWSPayload>(jwsPayloadText)

  if (!jwsPayload || typeof jwsPayload !== 'object') {
    console.log('Failed to parse JWS.payload data as JSON.', ErrorCode.JSON_PARSE_ERROR)
    return
  }

  // failures will be recorded in the log. we can continue processing.
  // validateSchema(jwsPayloadSchema, jwsPayload);

  // validate issuance date
  const nbf = new Date()
  nbf.setTime(jwsPayload.nbf * 1000) // convert seconds to milliseconds
  const now = new Date()

  if (nbf > now) {
    if (jwsPayload.nbf > new Date(2021, 1, 1).getTime()) {
      // we will assume the nbf was encoded in milliseconds, and we will return an error
      const dateParsedInMilliseconds = new Date()
      dateParsedInMilliseconds.setTime(jwsPayload.nbf)
      console.log(
        `Health card is not yet valid, nbf=${jwsPayload.nbf} (${nbf.toUTCString()}).\n` +
          'nbf should be encoded in seconds since 1970-01-01T00:00:00Z UTC.\n' +
          `Did you encode the date in milliseconds, which would give the date: ${dateParsedInMilliseconds.toUTCString()}?`,
        ErrorCode.NOT_YET_VALID,
      )
    } else {
      console.log(
        `Health card is not yet valid, nbf=${jwsPayload.nbf} (${nbf.toUTCString()}).`,
        ErrorCode.NOT_YET_VALID,
      )
    }
  }

  if (jwsPayload.vc && Object.keys(jwsPayload.vc).includes('@context')) {
    console.log("JWS.payload.vc shouldn't have a @context property", ErrorCode.SCHEMA_ERROR)
    throw ErrorCode.SCHEMA_ERROR
  }

  if (
    !jwsPayload.vc.type ||
    !jwsPayload.vc.type.includes('https://smarthealth.cards#health-card')
  ) {
    console.log(
      "JWS.payload.vc.type should contain 'https://smarthealth.cards#health-card'",
      ErrorCode.SCHEMA_ERROR,
    )
    throw ErrorCode.SCHEMA_ERROR
  }

  // to continue validation, we must have a FHIR bundle string to validate
  if (
    !jwsPayload.vc ||
    !jwsPayload.vc.credentialSubject ||
    !jwsPayload.vc.credentialSubject.fhirBundle
  ) {
    // The schema check above will list the expected properties/type
    console.log(
      'JWS.payload.vc.credentialSubject.fhirBundle{} required to continue.',
      ErrorCode.CRITICAL_DATA_MISSING,
    )
    return
  }

  const fhirBundleJson = jwsPayload.vc.credentialSubject.fhirBundle
  const fhirBundleText = JSON.stringify(fhirBundleJson)

  const isVaccineBundle = fhirBundleJson?.entry[1]?.resource?.resourceType === 'Immunization'
  if (!isVaccineBundle) {
    throw ErrorCode.NOT_VACCINE_BUNDLE
  }

  return fhirBundle.validate(fhirBundleText)
}
