import jose, { JWK } from 'react-native-jose'
import { ErrorCode } from '../error'
import { KeySet, KeysStore } from './keys'
import { InvalidError } from '../../utils/InvalidError'

const addIfKeyIsValidSHCFormat = async ( key: JWK.Key ): Promise< boolean > => {
  if ( ! key.kid || typeof key.kid !== 'string') {
    console.log(
      'key does not contain kid field',
      ErrorCode.INVALID_KEY_PRIVATE,
    )
    return false
  }
  const keyName = `key[${String(key.kid)}]`

  // check for private key material (as to happen before the following store.add, because the returned
  // value will be the corresponding public key)
  // Note: this is RSA/ECDSA specific, but ok since ECDSA is mandated
  if ((key as JWK.Key & { d: string }).d) {
    console.log(
      `${keyName}: key contains private key material.`,
      ErrorCode.INVALID_KEY_PRIVATE,
    )
    return false
  }
  // check that EC curve is 'ES256'
  if (!key.alg) {
    console.log(keyName + ': ' + "'alg' missing in issuer key", ErrorCode.INVALID_KEY_SCHEMA)
    return false
  } else if (key.alg !== 'ES256') {
    console.log(
      `${keyName}: wrong algorithm in issuer key. expected: 'ES256', actual: ${String(key.alg)}`,
      ErrorCode.INVALID_KEY_WRONG_ALG,
    )
    return false
  }

  // check that key type is 'EC'
  if (!key.kty) {
    console.log(`${keyName}:'kty' missing in issuer key`, ErrorCode.INVALID_KEY_SCHEMA)
    return false
  } else if (key.kty !== 'EC') {
    console.log(
      `${keyName}:wrong key type in issuer key. expected: 'EC', actual: ${String( key.kty)} `,
      ErrorCode.INVALID_KEY_WRONG_KTY,
    )
    return false
  }

  // check that usage is 'sig'
  if (!key.use) {
    console.log(`${keyName}:'use' missing in issuer key`, ErrorCode.INVALID_KEY_SCHEMA)
    return false
  } else if (key.use !== 'sig') {
    console.log(
      `${keyName}:wrong usage in issuer key. expected: 'sig', actual: ${String(key.use)}`,
      ErrorCode.INVALID_KEY_WRONG_USE,
    )
    return false
  }
  try {
    const jwkKey = await KeysStore.store.add(key)
    const tpDigest: any = await jwkKey.thumbprint('SHA-256')
    const thumbprint = jose.util.base64url.encode(tpDigest)

    if (key.kid !== thumbprint) {
      console.log(
        `${keyName}:'kid' does not match thumbprint in issuer key. expected: \
                    ${String( thumbprint )} , actual: ${String(key.kid)}`,
        ErrorCode.INVALID_KEY_WRONG_KID,
      )
      jwkKey.error = new InvalidError(ErrorCode.INVALID_KEY_WRONG_KID)
      return false
    }

  } catch ( err: any ){
    console.log(
      `${keyName}: Failed to calculate issuer key thumbprint : ${ String( err.message )}`,
      ErrorCode.INVALID_KEY_UNKNOWN,
    )
    return false
  }
  return true
}

export const verifyAndImportHealthCardIssuerKey = async (
  keySet: KeySet,
  expectedSubjectAltName = '',
): Promise<any> => {
  // check that keySet is valid
  if (!(keySet instanceof Object) || !keySet.keys || !(keySet.keys instanceof Array)) {
    console.log('keySet not valid. Expect {keys : JWK.Key[]}', ErrorCode.INVALID_KEY_SCHEMA)
    return
  }
  for (let i = 0; i < keySet.keys.length; i++) {
    const key: JWK.Key = keySet.keys[i]
    try {
      if ( await addIfKeyIsValidSHCFormat( key ) ) {
        console.debug(`Key [${String(i)}] added : `)
      } else {
        console.debug(`Key [${String(i)}] is not added`)
      }
    } catch (error) {
      console.log(
        'Error adding key to keyStore : ' + (error as Error).message,
        ErrorCode.INVALID_KEY_UNKNOWN,
      )
    }
  }
  
}
