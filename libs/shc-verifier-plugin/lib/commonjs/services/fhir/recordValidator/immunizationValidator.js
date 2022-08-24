"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _verifierSdk = require("verifier-sdk");

var _immunizationDm = _interopRequireDefault(require("~/schemas/immunization-dm.json"));

var _patientDm = _interopRequireDefault(require("~/schemas/patient-dm.json"));

var _fhirTypes = require("../fhirTypes");

var _Config = require("~/models/Config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validate = async entries => {
  const profileName = _fhirTypes.RecordType.covid19Immunization;
  const immunizations = entries.filter(entry => entry.resource.resourceType === 'Immunization');

  if (immunizations.length === 0) {
    console.log(`Profile : ${profileName} : requires 1 or more Immunization resources. Actual : ${immunizations.length.toString()}`, _verifierSdk.ErrorCode.PROFILE_ERROR);
    return Promise.reject(false);
  }

  const patients = entries.filter(entry => entry.resource.resourceType === 'Patient');

  if (patients.length !== 1) {
    console.log(`Profile : ${profileName} : requires exactly 1 ${'Patient'} resource. Actual : ${patients.length.toString()}`, _verifierSdk.ErrorCode.PROFILE_ERROR);
  }

  const expectedResources = ['Patient', 'Immunization'];
  entries.forEach(async (entry, index) => {
    if (!expectedResources.includes(entry.resource.resourceType)) {
      console.log(`Profile : ${profileName} : resourceType: ${entry.resource.resourceType} is not allowed.`, _verifierSdk.ErrorCode.PROFILE_ERROR);
      expectedResources.push(entry.resource.resourceType); // prevent duplicates

      return Promise.reject(false);
    }

    if (entry.resource.resourceType === 'Immunization') {
      var _entry$resource, _entry$resource2, _entry$resource2$vacc, _entry$resource2$vacc2;

      const status = (((_entry$resource = entry.resource) === null || _entry$resource === void 0 ? void 0 : _entry$resource.status) ?? '').toLowerCase();

      if (status !== 'completed') {
        console.log(`Record #${index} has invalid status code: ${status}`);
      } // verify that valid codes are used see : https://www.cdc.gov/vaccines/programs/iis/COVID-19-related-codes.html


      const code = (_entry$resource2 = entry.resource) === null || _entry$resource2 === void 0 ? void 0 : (_entry$resource2$vacc = _entry$resource2.vaccineCode) === null || _entry$resource2$vacc === void 0 ? void 0 : (_entry$resource2$vacc2 = _entry$resource2$vacc.coding[0]) === null || _entry$resource2$vacc2 === void 0 ? void 0 : _entry$resource2$vacc2.code;
      const _getCodeFunc = (0, _Config.getVerifierInitOption)().getAcceptedVaccineCodes;
      const cvxCodes = _getCodeFunc ? await _getCodeFunc("shc") : [];

      if (code && !cvxCodes.includes(code)) {
        console.log(`Profile : ${profileName} : Immunization.vaccineCode.code ( ${code} ) requires valid COVID-19 code (${cvxCodes.join(',')}).`, _verifierSdk.ErrorCode.PROFILE_ERROR);
      } // check for properties that are forbidden by the dm-profiles


      ;

      _immunizationDm.default.forEach(constraint => {
        _verifierSdk.Utils.propPath(entry.resource, constraint.path) && console.log(`Profile : ${profileName} : entry[${index.toString()}].resource.${constraint.path} should not be present.`, _verifierSdk.ErrorCode.PROFILE_ERROR);
      });
    }

    if (entry.resource.resourceType === 'Patient') {
      // check for properties that are forbidden by the dm-profiles
      ;

      _patientDm.default.forEach(constraint => {
        _verifierSdk.Utils.propPath(entry.resource, constraint.path) && console.log(`Profile : ${profileName} : entry[${index.toString()}].resource.${constraint.path} should not be present.`, _verifierSdk.ErrorCode.PROFILE_ERROR);
      });
    }
  });
  return Promise.resolve(true);
};

var _default = validate;
exports.default = _default;
//# sourceMappingURL=immunizationValidator.js.map