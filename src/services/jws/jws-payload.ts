import * as utils from '../utils'
import { validateSchema } from './schema'
import { ErrorCode } from '../error'
import jwsPayloadSchema from '../../schemas/smart-health-card-vc-schema.json'
import * as fhirBundle from './fhirBundle'
import Log from '../logger'

export const schema = jwsPayloadSchema
const log = new Log()

export function validate(jwsPayloadText: string): any {
  if (jwsPayloadText.trim() !== jwsPayloadText) {
    log.error(`JWS payload has leading or trailing spaces`, ErrorCode.TRAILING_CHARACTERS)
    jwsPayloadText = jwsPayloadText.trim()
  }

  const jwsPayload = utils.parseJson<JWSPayload>(jwsPayloadText)

  // failures will be recorded in the log. we can continue processing.
  validateSchema(jwsPayloadSchema, jwsPayload)

  const isJwsPayloadValid = checkJwsPayload(jwsPayload)
  if (!isJwsPayloadValid) return

  const fhirBundleJson = jwsPayload?.vc.credentialSubject.fhirBundle
  const fhirBundleText = JSON.stringify(fhirBundleJson)

  const isVaccineBundle = fhirBundleJson?.entry[1]?.resource?.resourceType === 'Immunization'
  if (!isVaccineBundle) {
    log.error('This is not a vaccine bundle', ErrorCode.NOT_VACCINE_BUNDLE)
    throw ErrorCode.NOT_VACCINE_BUNDLE
  }

  return fhirBundle.validate(fhirBundleText)
}

function checkJwsPayload(jwsPayload: JWSPayload | undefined) {
  if (!jwsPayload || typeof jwsPayload !== 'object') {
    log.error('Failed to parse JWS.payload data as JSON.', ErrorCode.JSON_PARSE_ERROR)
    return false
  }
  // validate issuance date
  const nbf = new Date()
  nbf.setTime(jwsPayload.nbf * 1000) // convert seconds to milliseconds
  const now = new Date()

  if (nbf > now) {
    if (jwsPayload.nbf > new Date(2021, 1, 1).getTime()) {
      // we will assume the nbf was encoded in milliseconds, and we will return an error
      const dateParsedInMilliseconds = new Date()
      dateParsedInMilliseconds.setTime(jwsPayload.nbf)
      log.error(
        `Health card is not yet valid, nbf=${jwsPayload.nbf} (${nbf.toUTCString()}).\n` +
          'nbf should be encoded in seconds since 1970-01-01T00:00:00Z UTC.\n' +
          `Did you encode the date in milliseconds, which would give the date: ${dateParsedInMilliseconds.toUTCString()}?`,
        ErrorCode.NOT_YET_VALID,
      )
    } else {
      log.error(
        `Health card is not yet valid, nbf=${jwsPayload.nbf} (${nbf.toUTCString()}).`,
        ErrorCode.NOT_YET_VALID,
      )
    }
  }

  if (jwsPayload.vc && Object.keys(jwsPayload.vc).includes('@context')) {
    log.error("JWS.payload.vc shouldn't have a @context property", ErrorCode.SCHEMA_ERROR)
    throw ErrorCode.SCHEMA_ERROR
  }

  if (
    !jwsPayload.vc.type ||
    !jwsPayload.vc.type.includes('https://smarthealth.cards#health-card')
  ) {
    log.error(
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
    log.error(
      'JWS.payload.vc.credentialSubject.fhirBundle{} required to continue.',
      ErrorCode.CRITICAL_DATA_MISSING,
    )
    return false
  }
}
