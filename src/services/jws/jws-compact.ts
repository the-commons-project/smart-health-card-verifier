import pako from 'pako'
import jose from 'react-native-jose'

import { ErrorCode } from '../error'
import { KeySet, KeysStore } from './keys'
import * as jwsPayload from './jws-payload'
import { parseJson } from '../utils'
import { validateSchema } from './schema'
// import jwsCompactSchema from './schemas/jws-schema.json'
import { verifyAndImportHealthCardIssuerKey } from './shcKeyValidator'

import { getPatientDataFromFhir } from '../helpers/getPatiendDataFromFhir'
import { getVaccinationDataFromFhir } from '../helpers/getVaccinationDataFromFhir'
import { getIssuerFromFhir } from '../helpers/getIssuerFromFhir'
import { getIssuerData } from '../helpers/getIssuerData'

export const JwsValidationOptions = {
  skipJwksDownload: false,
  jwksDownloadTimeOut: 5000,
}

const MAX_JWS_SINGLE_CHUNK_LENGTH = 1195

export async function validate(jws): Promise<any> {
  KeysStore.resetStore()

  if (jws.trim() !== jws) {
    console.log(`JWS has leading or trailing spaces`, ErrorCode.TRAILING_CHARACTERS)
    jws = jws.trim()
  }

  if (jws.length > MAX_JWS_SINGLE_CHUNK_LENGTH) {
    console.log(
      `JWS is longer than ${MAX_JWS_SINGLE_CHUNK_LENGTH} characters, and will result in split QR codes`,
      ErrorCode.JWS_TOO_LONG,
    )
  }

  const jwsRegex = /[0-9a-zA-Z_-]+\.[0-9a-zA-Z_-]+\.[0-9a-zA-Z_-]+/g
  const isJws = jwsRegex.test(jws)

  if (!isJws) {
    console.log(
      "Failed to parse JWS-compact data as 'base64url.base64url.base64url' string.",
      ErrorCode.JSON_PARSE_ERROR,
    )
    return false
  }

  // validateSchema(jwsCompactSchema, jws)

  // split into header[0], payload[1], key[2]
  const parts = jws.split('.')
  const rawPayload = parts[1]

  // check header
  let headerBytes
  let errString

  try {
    headerBytes = Buffer.from(parts[0], 'base64')
  } catch (err) {
    errString = err as string
  } finally {
    if (!headerBytes) {
      console.log(
        ['Error base64-decoding the JWS header.', errString].join('\n'),
        ErrorCode.JWS_VERIFICATION_ERROR,
      )
    }
  }

  let headerJson

  if (headerBytes) {
    headerJson = parseJson<{ kid: string; alg: string; zip: string }>(headerBytes.toString())

    if (headerJson == null) {
      console.log(
        ["Can't parse JWS header as JSON.", errString].join('\n'),
        ErrorCode.JWS_HEADER_ERROR,
      )
    } else {
      const headerKeys = Object.keys(headerJson)

      if (!headerKeys.includes('alg')) {
        console.log("JWS header missing 'alg' property.", ErrorCode.JWS_HEADER_ERROR)
      } else if (headerJson['alg'] !== 'ES256') {
        console.log(
          `Wrong value for JWS header property 'alg' property expected: "ES256", actual: "${headerJson['alg']}".`,
          ErrorCode.JWS_HEADER_ERROR,
        )
      }
      if (!headerKeys.includes('zip')) {
        console.log("JWS header missing 'zip' property.", ErrorCode.JWS_HEADER_ERROR)
      } else if (headerJson['zip'] !== 'DEF') {
        console.log(
          `Wrong value for JWS header property 'zip' property expected: "DEF", actual: "${headerJson['zip']}".`,
          ErrorCode.JWS_HEADER_ERROR,
        )
      }
      if (!headerKeys.includes('kid')) {
        console.log("JWS header missing 'kid' property.", ErrorCode.JWS_HEADER_ERROR)
      }

      // the value of the kid will be used in the crypto validation of the signature to select the issuer's public key
    }
  }

  // check signature format
  let sigBytes
  try {
    sigBytes = Buffer.from(parts[2], 'base64')
  } catch (err) {
    console.log(
      ['Error base64-decoding the JWS signature.', err as string].join('\n'),
      ErrorCode.JWS_VERIFICATION_ERROR,
    )
  }

  if (sigBytes && sigBytes.length > 64 && sigBytes[0] === 0x30 && sigBytes[2] === 0x02) {
    console.log(
      'Signature appears to be in DER encoded form. Signature is expected to be 64-byte r||s concatenated form.\n' +
        'See https://tools.ietf.org/html/rfc7515#appendix-A.3 for expected ES256 signature form.',
      ErrorCode.SIGNATURE_FORMAT_ERROR,
    )

    // DER encoded signature will constructed as follows:
    // 0       |1             |2      |3         |4-35             |36       |37        |38-69
    // 0x30      |0x44          |0x02     |0x20        |<r-component of signature> |0x02     |0x20 or 0x21    |<s-component of signature>
    // Sequence-type |length-of-sequence-data |Integer-type |length-of-integer |integer-data         |Integer-type |length-of-integer |integer-data

    // sigBytes[3] contains length of r-integer it may be 32 or 33 bytes.
    // DER encoding dictates an Integer is negative if the high-order bit of the first byte is set.
    //   To represent an integer with a high-order bit as positive, a leading zero byte is required.
    //   This increases the Integer length to 33.

    // For signature use, the sign is irrelevant and the leading zero, if present, is ignored.
    const rStart = 4 + (sigBytes[3] - 32) // adjust for the potential leading zero
    const rBytes = sigBytes.slice(rStart, rStart + 32) // 32 bytes of the r-integer
    const sStart = sigBytes.length - 32
    const sBytes = sigBytes.slice(sStart) // 32 bytes of the s-integer

    // Make Base64url
    const newSig = Buffer.concat([rBytes, sBytes])
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
    parts[2] = newSig

    console.log('jws-signature converted from DER form to r||s form: ' + newSig)

    jws = parts.join('.')
  } else if (sigBytes && sigBytes.length !== 64) {
    console.log(
      'Signature is ' + sigBytes.length.toString() + '-bytes. Signature is expected to be 64-bytes',
      ErrorCode.SIGNATURE_FORMAT_ERROR,
    )
  }

  // check payload
  let b64DecodedPayloadBuffer
  let b64DecodedPayloadString

  try {
    b64DecodedPayloadBuffer = Buffer.from(rawPayload, 'base64')
  } catch (err) {
    console.log(
      ['Error base64-decoding the JWS payload.', err as string].join('\n'),
      ErrorCode.JWS_VERIFICATION_ERROR,
    )
  }

  let inflatedPayload

  if (b64DecodedPayloadBuffer) {
    try {
      inflatedPayload = pako.inflateRaw(b64DecodedPayloadBuffer, { to: 'string' }).trim()
    } catch (err) {
      // try normal inflate
      try {
        inflatedPayload = pako.inflate(b64DecodedPayloadBuffer, { to: 'string' }).trim()
        console.log(
          'Error inflating JWS payload. Compression should use raw DEFLATE (without wrapper header and adler32 crc)',
          ErrorCode.INFLATION_ERROR,
        )
      } catch (err) {
        console.log(
          ['Error inflating JWS payload. Did you use raw DEFLATE compression?', err as string].join(
            '\n',
          ),
          ErrorCode.INFLATION_ERROR,
        )
        // inflating failed, let's try to parse the base64-decoded string directly
        b64DecodedPayloadString = b64DecodedPayloadBuffer.toString('utf-8').trim()
      }
    }
  }

  const isJwsPayloadValid = jwsPayload.validate(
    inflatedPayload || b64DecodedPayloadString || rawPayload,
  )

  // TODO: Should we quit here, if we got a fatal error?
  if (!isJwsPayloadValid) {
    console.log('FATAL ERROR at jwsPayload.validate!')
  }

  // try to parse JSON even if it failed validation above
  const payload = parseJson<JWSPayload>(inflatedPayload || b64DecodedPayloadString || rawPayload)

  // if we did not get a payload back, it failed to be parsed and we cannot extract the key url
  // so we can stop.
  // the jws-payload child will contain the parse errors.
  // The payload validation may have a Fatal error
  if (!payload) {
    console.log('NO PAYLOAD!!')
    return
  }

  // Extract the key url
  if (payload.iss) {
    if (typeof payload.iss === 'string') {
      if (payload.iss.slice(0, 8) !== 'https://') {
        console.log('Issuer URL SHALL use https', ErrorCode.INVALID_ISSUER_URL)
      }

      if (payload.iss.slice(-1) === '/') {
        console.log('Issuer URL SHALL NOT include a trailing /', ErrorCode.INVALID_ISSUER_URL)
      }

      // download the keys into the keystore. if it fails, continue an try to use whatever is in the keystore.
      if (!JwsValidationOptions.skipJwksDownload) {
        await downloadAndImportKey(payload.iss)
      } else {
        console.log('skipping issuer JWK set download')
      }
    } else {
      console.log(`JWS payload 'iss' should be a string, not a ${typeof payload.iss}`)
    }
  } else {
    throw new Error("Can't find 'iss' entry in JWS payload")
  }

  let result = false

  if (!headerJson) {
    return result
  }

  const patientData = getPatientDataFromFhir(payload)
  const vaccinationData = await getVaccinationDataFromFhir(payload)
  const issuer = getIssuerFromFhir(payload)
  const issuerData = await getIssuerData(issuer)

  const { message } = issuerData

  const isIssuerNotFound = message && message === 'Issuer not found'

  if (isIssuerNotFound) {
    issuerData.url = issuer
    issuerData.name = undefined
  }

  const isValid = await verifyJws(jws, headerJson['kid'])

  const document = {
    isValid,
    issuerData,
    patientData,
    vaccinationData,
  }

  return document
}

async function fetchWithTimeout(url, options, timeout, timeoutError) {
  return Promise.race([
    fetch(url, options),

    new Promise((_, reject) => setTimeout(() => reject(new Error(timeoutError)), timeout)),
  ])
}

async function downloadAndImportKey(issuerURL: string): Promise<KeySet | undefined> {
  const jwkURL = issuerURL + '/.well-known/jwks.json'
  const requestedOrigin = 'https://example.org' // request bogus origin to test CORS response

  const timeoutError = 'Failed to download issuer JWK set'
  const timeout = JwsValidationOptions.jwksDownloadTimeOut

  try {
    // TODO: Weird way for timeout, if just a value it won't work
    const responseRaw = await fetchWithTimeout(
      jwkURL,
      { headers: { Origin: requestedOrigin } },
      timeout,
      timeoutError,
    )
    const keySet = await responseRaw.json()

    // we expect a CORS response header consistent with the requested origin (either allow all '*' or the specific origin)
    // TODO: can we easily add a unit test for this?
    // const acaoHeader = response.headers['access-control-allow-origin']

    // if (!acaoHeader) {
    //   console.log("Issuer key endpoint does not contain a 'access-control-allow-origin' header for Cross-Origin Resource Sharing (CORS)", ErrorCode.ISSUER_KEY_WELLKNOWN_ENDPOINT_CORS)
    // } else if (acaoHeader !== '*' && acaoHeader !== requestedOrigin) {
    //   console.log(`Issuer key endpoint's 'access-control-allow-origin' header ${acaoHeader} does not match the requested origin ${requestedOrigin}, for Cross-Origin Resource Sharing (CORS)`, ErrorCode.ISSUER_KEY_WELLKNOWN_ENDPOINT_CORS)
    // }

    if (!keySet) {
      throw 'Failed to parse JSON KeySet schema'
    }

    try {
      await verifyAndImportHealthCardIssuerKey(keySet, issuerURL)

      return keySet
    } catch (err) {
      console.log(
        "Can't parse downloaded issuer JWK set: " + (err as Error).toString(),
        ErrorCode.ISSUER_KEY_DOWNLOAD_ERROR,
      )
      return undefined
    }
  } catch (err) {
    console.log(
      'Failed to download issuer JWK set: ' + (err as Error).toString(),
      ErrorCode.ISSUER_KEY_DOWNLOAD_ERROR,
    )
    // return undefined

    throw new Error(timeoutError)
  }
}

async function verifyJws(jws: string, kid: string): Promise<boolean> {
  const verifier: jose.JWS.Verifier = jose.JWS.createVerify(KeysStore.store)

  if (kid && !KeysStore.store.get(kid)) {
    console.log(
      `JWS verification failed: can't find key with 'kid' = ${kid} in issuer set`,
      ErrorCode.JWS_VERIFICATION_ERROR,
    )

    return false
  }

  try {
    const result = await verifier.verify(jws)

    return !!result
  } catch (error) {
    // The error message is always 'no key found', regardless if a key is missing or
    // if the signature was tempered with. Don't return the node-jose error message.
    console.log('JWS verification failed', ErrorCode.JWS_VERIFICATION_ERROR)
    return false
  }
}
