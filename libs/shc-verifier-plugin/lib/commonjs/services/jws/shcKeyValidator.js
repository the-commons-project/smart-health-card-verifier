"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyAndImportHealthCardIssuerKey = void 0;

var _reactNativeJose = _interopRequireDefault(require("react-native-jose"));

var _verifierSdk = require("verifier-sdk");

var _keys = require("./keys");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addIfKeyIsValidSHCFormat = async key => {
  if (!key.kid || typeof key.kid !== 'string') {
    console.log('key does not contain kid field', _verifierSdk.ErrorCode.INVALID_KEY_PRIVATE);
    return false;
  }

  const keyName = `key[${String(key.kid)}]`; // check for private key material (as to happen before the following store.add, because the returned
  // value will be the corresponding public key)
  // Note: this is RSA/ECDSA specific, but ok since ECDSA is mandated

  if (key.d) {
    console.log(`${keyName}: key contains private key material.`, _verifierSdk.ErrorCode.INVALID_KEY_PRIVATE);
    return false;
  } // check that EC curve is 'ES256'


  if (!key.alg) {
    console.log(keyName + ': ' + "'alg' missing in issuer key", _verifierSdk.ErrorCode.INVALID_KEY_SCHEMA);
    return false;
  } else if (key.alg !== 'ES256') {
    console.log(`${keyName}: wrong algorithm in issuer key. expected: 'ES256', actual: ${String(key.alg)}`, _verifierSdk.ErrorCode.INVALID_KEY_WRONG_ALG);
    return false;
  } // check that key type is 'EC'


  if (!key.kty) {
    console.log(`${keyName}:'kty' missing in issuer key`, _verifierSdk.ErrorCode.INVALID_KEY_SCHEMA);
    return false;
  } else if (key.kty !== 'EC') {
    console.log(`${keyName}:wrong key type in issuer key. expected: 'EC', actual: ${String(key.kty)} `, _verifierSdk.ErrorCode.INVALID_KEY_WRONG_KTY);
    return false;
  } // check that usage is 'sig'


  if (!key.use) {
    console.log(`${keyName}:'use' missing in issuer key`, _verifierSdk.ErrorCode.INVALID_KEY_SCHEMA);
    return false;
  } else if (key.use !== 'sig') {
    console.log(`${keyName}:wrong usage in issuer key. expected: 'sig', actual: ${String(key.use)}`, _verifierSdk.ErrorCode.INVALID_KEY_WRONG_USE);
    return false;
  }

  try {
    const jwkKey = await _keys.KeysStore.store.add(key);
    const tpDigest = await jwkKey.thumbprint('SHA-256');

    const thumbprint = _reactNativeJose.default.util.base64url.encode(tpDigest);

    console.log("jwkThumbprint : " + thumbprint);

    if (key.kid !== thumbprint) {
      console.log(`${keyName}:'kid' does not match thumbprint in issuer key. expected: \
                    ${String(thumbprint)} , actual: ${String(key.kid)}`, _verifierSdk.ErrorCode.INVALID_KEY_WRONG_KID);
      jwkKey.error = new _verifierSdk.InvalidError(_verifierSdk.ErrorCode.INVALID_KEY_WRONG_KID);
      return false;
    }
  } catch (err) {
    console.log(`${keyName}: Failed to calculate issuer key thumbprint : ${String(err.message)}`, _verifierSdk.ErrorCode.INVALID_KEY_UNKNOWN);
    return false;
  }

  return true;
};

const verifyAndImportHealthCardIssuerKey = async keySet => {
  // check that keySet is valid
  if (!(keySet instanceof Object) || !keySet.keys || !(keySet.keys instanceof Array)) {
    console.log('keySet not valid. Expect {keys : JWK.Key[]}', _verifierSdk.ErrorCode.INVALID_KEY_SCHEMA);
    return;
  }

  for (let i = 0; i < keySet.keys.length; i++) {
    const key = keySet.keys[i];

    try {
      if (await addIfKeyIsValidSHCFormat(key)) {
        console.debug(`Key [${String(i)}] added : `);
      } else {
        console.debug(`Key [${String(i)}] is not added`);
      }
    } catch (error) {
      console.log('Error adding key to keyStore : ' + error.message, _verifierSdk.ErrorCode.INVALID_KEY_UNKNOWN);
    }
  }
};

exports.verifyAndImportHealthCardIssuerKey = verifyAndImportHealthCardIssuerKey;
//# sourceMappingURL=shcKeyValidator.js.map