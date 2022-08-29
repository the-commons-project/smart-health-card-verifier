"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIssuerFromFhir = void 0;

const getIssuerFromFhir = credential => {
  const {
    iss: issuer
  } = credential;
  return issuer;
};

exports.getIssuerFromFhir = getIssuerFromFhir;
//# sourceMappingURL=getIssuerFromFhir.js.map