"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = void 0;
exports.validate = validate;
var _verifierSdk = require("verifier-sdk");
var _smartHealthCardVcSchema = _interopRequireDefault(require("../../schemas/smart-health-card-vc-schema.json"));
var fhirBundle = _interopRequireWildcard(require("../fhir/fhirBundle"));
var _fhirTypes = require("../fhir/fhirTypes");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const schema = _smartHealthCardVcSchema.default;
exports.schema = schema;
async function validate(jwsPayloadText) {
  if (jwsPayloadText.trim() !== jwsPayloadText) {
    console.log('JWS payload has leading or trailing spaces', _verifierSdk.ErrorCode.TRAILING_CHARACTERS);
    jwsPayloadText = jwsPayloadText.trim();
  }
  const jwsPayload = _verifierSdk.Utils.parseJson(jwsPayloadText);
  const isJwsPayloadValid = checkJwsPayload(jwsPayload);
  if (!isJwsPayloadValid) return Promise.reject(false);
  const fhirBundleJson = jwsPayload === null || jwsPayload === void 0 ? void 0 : jwsPayload.vc.credentialSubject.fhirBundle;
  const recordType = (0, _fhirTypes.getRecordTypeFromPayload)(jwsPayload);
  return fhirBundle.validate(recordType, fhirBundleJson);
}
function checkJwsPayload(jwsPayload) {
  if (!jwsPayload || typeof jwsPayload !== 'object') {
    console.log('Failed to parse JWS.payload data as JSON.', _verifierSdk.ErrorCode.JSON_PARSE_ERROR);
    return false;
  }
  // validate issuance date
  const nbf = new Date();
  nbf.setTime(jwsPayload.nbf * 1000); // convert seconds to milliseconds
  const now = new Date();
  if (nbf > now) {
    if (jwsPayload.nbf > new Date(2021, 1, 1).getTime()) {
      // we will assume the nbf was encoded in milliseconds, and we will return an error
      const dateParsedInMilliseconds = new Date();
      dateParsedInMilliseconds.setTime(jwsPayload.nbf);
      console.log(`Health card is not yet valid, nbf=${jwsPayload.nbf} (${nbf.toUTCString()}).\n` + 'nbf should be encoded in seconds since 1970-01-01T00:00:00Z UTC.\n' + `Did you encode the date in milliseconds, which would give the date: ${dateParsedInMilliseconds.toUTCString()}?`, _verifierSdk.ErrorCode.NOT_YET_VALID);
    } else {
      console.log(`Health card is not yet valid, nbf=${jwsPayload.nbf} (${nbf.toUTCString()}).`, _verifierSdk.ErrorCode.NOT_YET_VALID);
    }
  }
  if (!jwsPayload.vc.type || !jwsPayload.vc.type.includes('https://smarthealth.cards#health-card')) {
    console.log("JWS.payload.vc.type should contain 'https://smarthealth.cards#health-card'", _verifierSdk.ErrorCode.SCHEMA_ERROR);
    throw new _verifierSdk.InvalidError(_verifierSdk.ErrorCode.SCHEMA_ERROR);
  }

  // to continue validation, we must have a FHIR bundle string to validate
  if (!jwsPayload.vc || !jwsPayload.vc.credentialSubject || !jwsPayload.vc.credentialSubject.fhirBundle) {
    // The schema check above will list the expected properties/type
    console.log('JWS.payload.vc.credentialSubject.fhirBundle{} required to continue.', _verifierSdk.ErrorCode.CRITICAL_DATA_MISSING);
    return false;
  }
  return true;
}
//# sourceMappingURL=jws-payload.js.map