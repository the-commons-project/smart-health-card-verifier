export let ErrorCode;

(function (ErrorCode) {
  ErrorCode[ErrorCode["ERROR"] = 100] = "ERROR";
  ErrorCode[ErrorCode["CRITICAL_DATA_MISSING"] = 101] = "CRITICAL_DATA_MISSING";
  ErrorCode[ErrorCode["SCHEMA_ERROR"] = 102] = "SCHEMA_ERROR";
  ErrorCode[ErrorCode["FHIR_SCHEMA_ERROR"] = 103] = "FHIR_SCHEMA_ERROR";
  ErrorCode[ErrorCode["INFLATION_ERROR"] = 104] = "INFLATION_ERROR";
  ErrorCode[ErrorCode["JWS_HEADER_ERROR"] = 105] = "JWS_HEADER_ERROR";
  ErrorCode[ErrorCode["JWS_VERIFICATION_ERROR"] = 106] = "JWS_VERIFICATION_ERROR";
  ErrorCode[ErrorCode["SIGNATURE_FORMAT_ERROR"] = 107] = "SIGNATURE_FORMAT_ERROR";
  ErrorCode[ErrorCode["ISSUER_KEY_DOWNLOAD_ERROR"] = 108] = "ISSUER_KEY_DOWNLOAD_ERROR";
  ErrorCode[ErrorCode["ISSUER_KEY_WELLKNOWN_ENDPOINT_CORS"] = 109] = "ISSUER_KEY_WELLKNOWN_ENDPOINT_CORS";
  ErrorCode[ErrorCode["INVALID_ISSUER_URL"] = 110] = "INVALID_ISSUER_URL";
  ErrorCode[ErrorCode["INVALID_QR"] = 111] = "INVALID_QR";
  ErrorCode[ErrorCode["INVALID_NUMERIC_QR"] = 112] = "INVALID_NUMERIC_QR";
  ErrorCode[ErrorCode["INVALID_NUMERIC_QR_HEADER"] = 113] = "INVALID_NUMERIC_QR_HEADER";
  ErrorCode[ErrorCode["MISSING_QR_CHUNK"] = 114] = "MISSING_QR_CHUNK";
  ErrorCode[ErrorCode["UNBALANCED_QR_CHUNKS"] = 115] = "UNBALANCED_QR_CHUNKS";
  ErrorCode[ErrorCode["JSON_PARSE_ERROR"] = 116] = "JSON_PARSE_ERROR";
  ErrorCode[ErrorCode["JWS_TOO_LONG"] = 117] = "JWS_TOO_LONG";
  ErrorCode[ErrorCode["TRAILING_CHARACTERS"] = 118] = "TRAILING_CHARACTERS";
  ErrorCode[ErrorCode["NOT_YET_VALID"] = 119] = "NOT_YET_VALID";
  ErrorCode[ErrorCode["PROFILE_ERROR"] = 120] = "PROFILE_ERROR";
  ErrorCode[ErrorCode["INVALID_KEY_WRONG_KTY"] = 200] = "INVALID_KEY_WRONG_KTY";
  ErrorCode[ErrorCode["INVALID_KEY_WRONG_ALG"] = 201] = "INVALID_KEY_WRONG_ALG";
  ErrorCode[ErrorCode["INVALID_KEY_WRONG_USE"] = 202] = "INVALID_KEY_WRONG_USE";
  ErrorCode[ErrorCode["INVALID_KEY_WRONG_KID"] = 203] = "INVALID_KEY_WRONG_KID";
  ErrorCode[ErrorCode["INVALID_KEY_SCHEMA"] = 204] = "INVALID_KEY_SCHEMA";
  ErrorCode[ErrorCode["INVALID_KEY_PRIVATE"] = 205] = "INVALID_KEY_PRIVATE";
  ErrorCode[ErrorCode["INVALID_KEY_X5C"] = 206] = "INVALID_KEY_X5C";
  ErrorCode[ErrorCode["INVALID_KEY_UNKNOWN"] = 207] = "INVALID_KEY_UNKNOWN";
  ErrorCode[ErrorCode["NO_VALID_RECORD"] = 250] = "NO_VALID_RECORD";
  ErrorCode[ErrorCode["OPENSSL_NOT_AVAILABLE"] = 300] = "OPENSSL_NOT_AVAILABLE";
  ErrorCode[ErrorCode["SYSTEM_CODE_ERROR"] = 400] = "SYSTEM_CODE_ERROR";
  ErrorCode[ErrorCode["NOT_VACCINE_BUNDLE"] = 401] = "NOT_VACCINE_BUNDLE";
  ErrorCode[ErrorCode["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(ErrorCode || (ErrorCode = {}));
//# sourceMappingURL=error.js.map