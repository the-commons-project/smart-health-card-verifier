"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.availableRecordTypes = exports.acceptedVCType = exports.ResourceType = exports.RecordType = void 0;
exports.getRecordTypeFromPayload = getRecordTypeFromPayload;
exports.isResourceType = isResourceType;
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let RecordType;
exports.RecordType = RecordType;
(function (RecordType) {
  RecordType["unknown"] = "unknown";
  RecordType["immunization"] = "immunization";
  RecordType["covid19LabResult"] = "covid19-lab-result";
})(RecordType || (exports.RecordType = RecordType = {}));
let ResourceType;
exports.ResourceType = ResourceType;
(function (ResourceType) {
  ResourceType["Unknown"] = "Unknown";
  ResourceType["Immunization"] = "Immunization";
  ResourceType["Patient"] = "Patient";
  ResourceType["Observation"] = "Observation";
})(ResourceType || (exports.ResourceType = ResourceType = {}));
const availableRecordTypes = [RecordType.immunization, RecordType.covid19LabResult];
exports.availableRecordTypes = availableRecordTypes;
const acceptedVCType = {
  [RecordType.immunization]: ['https://smarthealth.cards#immunization', 'https://smarthealth.cards#health-card'],
  [RecordType.covid19LabResult]: ['https://smarthealth.cards#laboratory', 'https://smarthealth.cards#covid19', 'https://smarthealth.cards#health-card']
};

/* this will check if it's validatable types per payload. 
   it also assumes that per each payload it has one record type
   exclusively, or it fallback to unknown.
*/
exports.acceptedVCType = acceptedVCType;
function getRecordTypeFromPayload(fhirJWSPayload) {
  var _fhirJWSPayload$vc;
  let res = RecordType.unknown;
  const types = fhirJWSPayload === null || fhirJWSPayload === void 0 ? void 0 : (_fhirJWSPayload$vc = fhirJWSPayload.vc) === null || _fhirJWSPayload$vc === void 0 ? void 0 : _fhirJWSPayload$vc.type;
  if (Array.isArray(types)) {
    for (let i = 0; i < availableRecordTypes.length; i++) {
      const recordType = acceptedVCType[availableRecordTypes[i]];
      if (_lodash.default.intersection(types.sort(), recordType.sort()).length === recordType.length) {
        res = availableRecordTypes[i];
        break;
      }
    }
  }
  return res;
}
function isResourceType(entry, resourceType) {
  var _entry$resource;
  return (entry === null || entry === void 0 ? void 0 : (_entry$resource = entry.resource) === null || _entry$resource === void 0 ? void 0 : _entry$resource.resourceType.toLowerCase()) === resourceType.toLowerCase();
}
//# sourceMappingURL=fhirTypes.js.map