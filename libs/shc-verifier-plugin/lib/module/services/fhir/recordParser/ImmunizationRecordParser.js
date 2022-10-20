import { sortRecordByDateField } from '../../../utils/utils';
import { ResourceType, isResourceType } from '../fhirTypes';
import { getVerifierInitOption, VerifierKey } from '../../../models/Config';
var cvxCodes = null;
var vaccineCodesHash = {};

const parse = async jwsPayload => {
  var _jwsPayload$vc, _jwsPayload$vc$creden, _jwsPayload$vc$creden2;

  cvxCodes = cvxCodes || (await getVerifierInitOption().getAcceptedVaccineCodes(VerifierKey));
  const vaccinationData = [];
  const entries = jwsPayload === null || jwsPayload === void 0 ? void 0 : (_jwsPayload$vc = jwsPayload.vc) === null || _jwsPayload$vc === void 0 ? void 0 : (_jwsPayload$vc$creden = _jwsPayload$vc.credentialSubject) === null || _jwsPayload$vc$creden === void 0 ? void 0 : (_jwsPayload$vc$creden2 = _jwsPayload$vc$creden.fhirBundle) === null || _jwsPayload$vc$creden2 === void 0 ? void 0 : _jwsPayload$vc$creden2.entry;
  const immunizationEntries = entries === null || entries === void 0 ? void 0 : entries.filter(entry => {
    return isResourceType(entry, ResourceType.Immunization);
  }).map(entry => entry.resource);
  vaccineCodesHash = getVerifierInitOption().getVaccineCodesHash();

  for (const [index, entry] of immunizationEntries.entries()) {
    const {
      status,
      lotNumber,
      performer,
      vaccineCode,
      occurrenceDateTime
    } = entry;
    const {
      code
    } = vaccineCode === null || vaccineCode === void 0 ? void 0 : vaccineCode.coding[0];
    const isValidVaccinationCode = code && cvxCodes.includes(code);
    const isVaccineShotDone = (status || '').toLowerCase() === 'completed';

    if (!isValidVaccinationCode) {
      console.log(`Immunization.vaccineCode.code (${String(code)}) requires valid COVID-19 code (${String(cvxCodes.join(','))}).`);
    }

    if (!isVaccineShotDone) {
      console.log(`Immunization.status should be "completed", but it is ${String(status)}`);
    }

    const {
      system,
      display,
      manufacturerName,
      groupDisplay
    } = vaccineCodesHash[code] || {};
    const vaccinationDate = occurrenceDateTime;
    let vaccinator = '';

    if (performer) {
      var _performer$, _performer$$actor;

      vaccinator = ((_performer$ = performer[0]) === null || _performer$ === void 0 ? void 0 : (_performer$$actor = _performer$.actor) === null || _performer$$actor === void 0 ? void 0 : _performer$$actor.display) || '';
    }

    if (isVaccineShotDone && isValidVaccinationCode) {
      vaccinationData.push({
        index: index + 1,
        systemKey: system,
        systemCode: code,
        resourceType: ResourceType.Immunization,
        lotNumber,
        vaccinator,
        vaccineName: display,
        manufacturerName: manufacturerName || null,
        groupName: groupDisplay,
        vaccinationDate
      });
    }
  }

  sortRecordByDateField('vaccinationDate', vaccinationData);
  return vaccinationData;
};

export default parse;
//# sourceMappingURL=ImmunizationRecordParser.js.map