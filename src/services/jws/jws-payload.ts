import * as utils from '../../utils/utils'
import { ErrorCode } from '../error'
import jwsPayloadSchema from '../../schemas/smart-health-card-vc-schema.json'
import * as fhirBundle from '../fhir/fhirBundle'
import { getRecordTypeFromPayload, RecordType } from '../fhir/fhirTypes'
import { InvalidError } from '../../utils/InvalidError'

export const schema = jwsPayloadSchema

export function validate (jwsPayloadText: string): Boolean {

  if (jwsPayloadText.trim() !== jwsPayloadText) {
    console.log('JWS payload has leading or trailing spaces', ErrorCode.TRAILING_CHARACTERS)
    jwsPayloadText = jwsPayloadText.trim()
  }

  const jwsPayload = utils.parseJson<JWSPayload>(jwsPayloadText)
  const isJwsPayloadValid = checkJwsPayload(jwsPayload)
  if (!isJwsPayloadValid) return false
 
  const fhirBundleJson = jwsPayload?.vc.credentialSubject.fhirBundle
    
  const recordType: RecordType = getRecordTypeFromPayload(jwsPayload as JWSPayload)
  return fhirBundle.validate(recordType, fhirBundleJson)
}

function checkJwsPayload (jwsPayload: JWSPayload | undefined) {
  if (!jwsPayload || typeof jwsPayload !== 'object') {
    console.log('Failed to parse JWS.payload data as JSON.', ErrorCode.JSON_PARSE_ERROR)
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

  if (
    !jwsPayload.vc.type ||
    !jwsPayload.vc.type.includes('https://smarthealth.cards#health-card')
  ) {
    console.log(
      "JWS.payload.vc.type should contain 'https://smarthealth.cards#health-card'",
      ErrorCode.SCHEMA_ERROR,
    )
    throw new InvalidError(  ErrorCode.SCHEMA_ERROR )
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
    return false
  }
  return true
}
