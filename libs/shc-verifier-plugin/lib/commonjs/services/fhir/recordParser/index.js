"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getRecordData;

var _ImmunizationRecordParser = _interopRequireDefault(require("./ImmunizationRecordParser"));

var _Covid19LabResultRecordParser = _interopRequireDefault(require("./Covid19LabResultRecordParser"));

var _fhirTypes = require("../fhirTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const recordParsers = {
  [_fhirTypes.RecordType.unknown]: () => {
    return null;
  },
  [_fhirTypes.RecordType.covid19LabResult]: _Covid19LabResultRecordParser.default,
  [_fhirTypes.RecordType.immunization]: _ImmunizationRecordParser.default
};

async function getRecordData(recordType, jwsPayload) {
  var _recordParsers$record;

  let res = null;
  console.info("Getting Record data ------------------" + recordType);
  res = (await ((_recordParsers$record = recordParsers[recordType]) === null || _recordParsers$record === void 0 ? void 0 : _recordParsers$record.call(undefined, jwsPayload))) ?? null;
  return res;
}
//# sourceMappingURL=index.js.map