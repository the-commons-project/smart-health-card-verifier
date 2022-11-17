"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateBundleForRecordType;
var _immunizationValidator = _interopRequireDefault(require("./immunizationValidator"));
var _labResultValidator = _interopRequireDefault(require("./labResultValidator"));
var _fhirTypes = require("../fhirTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const validators = {
  [_fhirTypes.RecordType.unknown]: () => {
    return Promise.resolve(false);
  },
  [_fhirTypes.RecordType.immunization]: _immunizationValidator.default,
  [_fhirTypes.RecordType.covid19LabResult]: _labResultValidator.default
};
async function validateBundleForRecordType(recordType, fireBundle) {
  let res = false;
  if (Array.isArray(fireBundle.entry)) {
    const entry = fireBundle.entry;
    try {
      var _validators$recordTyp;
      res = (await ((_validators$recordTyp = validators[recordType]) === null || _validators$recordTyp === void 0 ? void 0 : _validators$recordTyp.call(undefined, entry))) ?? false;
    } catch (error) {
      console.info("Validation Error: " + error);
    }
  }
  return res;
}
//# sourceMappingURL=index.js.map