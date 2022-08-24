"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fhirTypes = require("../fhirTypes");

var _R4Observation = _interopRequireDefault(require("./labResultParser/versions/R4Observation"));

var _utils = require("../../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const parse = jwsPayload => {
  var _jwsPayload$vc, _jwsPayload$vc$creden, _jwsPayload$vc$creden2, _entries$find;

  const parser = new _R4Observation.default();
  const labResultData = [];
  const entries = jwsPayload === null || jwsPayload === void 0 ? void 0 : (_jwsPayload$vc = jwsPayload.vc) === null || _jwsPayload$vc === void 0 ? void 0 : (_jwsPayload$vc$creden = _jwsPayload$vc.credentialSubject) === null || _jwsPayload$vc$creden === void 0 ? void 0 : (_jwsPayload$vc$creden2 = _jwsPayload$vc$creden.fhirBundle) === null || _jwsPayload$vc$creden2 === void 0 ? void 0 : _jwsPayload$vc$creden2.entry;
  /* 1. get the patient 
     2. get the lab result record for the first patient */

  const patientURL = entries === null || entries === void 0 ? void 0 : (_entries$find = entries.find(entry => {
    var _entry$resource;

    return (entry === null || entry === void 0 ? void 0 : (_entry$resource = entry.resource) === null || _entry$resource === void 0 ? void 0 : _entry$resource.resourceType) === _fhirTypes.ResourceType.Patient;
  })) === null || _entries$find === void 0 ? void 0 : _entries$find.fullUrl;
  const observationEntries = entries === null || entries === void 0 ? void 0 : entries.filter(entry => {
    var _entry$resource2, _entry$resource3, _entry$resource3$subj;

    return (entry === null || entry === void 0 ? void 0 : (_entry$resource2 = entry.resource) === null || _entry$resource2 === void 0 ? void 0 : _entry$resource2.resourceType) === _fhirTypes.ResourceType.Observation && (entry === null || entry === void 0 ? void 0 : (_entry$resource3 = entry.resource) === null || _entry$resource3 === void 0 ? void 0 : (_entry$resource3$subj = _entry$resource3.subject) === null || _entry$resource3$subj === void 0 ? void 0 : _entry$resource3$subj.reference) === patientURL;
  });

  for (const [index, entry] of observationEntries.entries()) {
    const resourceItem = parser.parse(entry);
    labResultData.push({ ...resourceItem,
      index: index + 1,
      resourceType: _fhirTypes.ResourceType.Observation
    });
  }

  (0, _utils.sortRecordByDateField)('effectiveDateTime', labResultData);
  return labResultData;
};

var _default = parse;
exports.default = _default;
//# sourceMappingURL=Covid19LabResultRecordParser.js.map