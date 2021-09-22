import jose, { JWK } from 'react-native-jose'
import { ErrorCode } from '../error'
import { KeySet, KeysStore } from './keys'

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
    let key: JWK.Key = keySet.keys[i]
    const keyName = 'key[' + (key.kid || i.toString()) + ']'

    // check for private key material (as to happen before the following store.add, because the returned
    // value will be the corresponding public key)
    // Note: this is RSA/ECDSA specific, but ok since ECDSA is mandated
    if ((key as JWK.Key & { d: string }).d) {
      console.log(
        keyName + ': ' + 'key contains private key material.',
        ErrorCode.INVALID_KEY_PRIVATE,
      )
    }

    try {
      key = await KeysStore.store.add(key)
    } catch (error) {
      console.log(
        'Error adding key to keyStore : ' + (error as Error).message,
        ErrorCode.INVALID_KEY_UNKNOWN,
      )
      return
    }

    // check that kid is properly generated
    if (!key.kid) {
      console.log(keyName + ': ' + "'kid' missing in issuer key", ErrorCode.INVALID_KEY_SCHEMA)
    } else {
      await key
        .thumbprint('SHA-256')
        .then((tpDigest: any) => {
          const thumbprint = jose.util.base64url.encode(tpDigest)

          if (key.kid !== thumbprint) {
            console.log(
              keyName +
                ': ' +
                "'kid' does not match thumbprint in issuer key. expected: " +
                thumbprint +
                ', actual: ' +
                key.kid,
              ErrorCode.INVALID_KEY_WRONG_KID,
            )
          }
        })
        .catch((err: Error) => {
          console.log(
            keyName +
              ': ' +
              'Failed to calculate issuer key thumbprint : ' +
              (err as Error).message,
            ErrorCode.INVALID_KEY_UNKNOWN,
          )
        })
    }

    // check that key type is 'EC'
    if (!key.kty) {
      console.log(keyName + ': ' + "'kty' missing in issuer key", ErrorCode.INVALID_KEY_SCHEMA)
    } else if (key.kty !== 'EC') {
      console.log(
        keyName + ': ' + "wrong key type in issuer key. expected: 'EC', actual: " + key.kty,
        ErrorCode.INVALID_KEY_WRONG_KTY,
      )
    }

    // check that EC curve is 'ES256'
    if (!key.alg) {
      console.log(keyName + ': ' + "'alg' missing in issuer key", ErrorCode.INVALID_KEY_SCHEMA)
    } else if (key.alg !== 'ES256') {
      console.log(
        keyName + ': ' + "wrong algorithm in issuer key. expected: 'ES256', actual: " + key.alg,
        ErrorCode.INVALID_KEY_WRONG_ALG,
      )
    }

    // check that usage is 'sig'
    if (!key.use) {
      console.log(keyName + ': ' + "'use' missing in issuer key", ErrorCode.INVALID_KEY_SCHEMA)
    } else if (key.use !== 'sig') {
      console.log(
        keyName + ': ' + "wrong usage in issuer key. expected: 'sig', actual: " + key.use,
        ErrorCode.INVALID_KEY_WRONG_USE,
      )
    }
  }

  return
}
