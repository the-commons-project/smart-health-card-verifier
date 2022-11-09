export const VerifierKey = "SHC";
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
export function setVerifierInitOption(option) {
  _verifierInitOption = option;
}
export function getVerifierInitOption() {
  return _verifierInitOption;
}
//# sourceMappingURL=Config.js.map