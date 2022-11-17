"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerifierKey = void 0;
exports.getVerifierInitOption = getVerifierInitOption;
exports.setVerifierInitOption = setVerifierInitOption;
const VerifierKey = "SHC";
exports.VerifierKey = VerifierKey;
const defaultOption = {
  useLegacy: () => true,
  getIssuer: () => null,
  getAcceptedVaccineCodes: () => [],
  isAcceptedLabResult: () => false,
  isAccgetAcceptedSystemCode: () => null,
  getAcceptedSystemCode: () => null,
  getSystemCodeLabel: () => null,
  getVaccineCodesHash: () => {
    return {};
  }
};
var _verifierInitOption = {
  ...defaultOption
};
function setVerifierInitOption(option) {
  _verifierInitOption = option;
}
function getVerifierInitOption() {
  return _verifierInitOption;
}
//# sourceMappingURL=Config.js.map