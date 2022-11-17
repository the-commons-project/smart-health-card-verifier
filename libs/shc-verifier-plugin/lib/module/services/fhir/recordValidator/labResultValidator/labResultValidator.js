import { RecordType, ResourceType, isResourceType } from '../../fhirTypes';
import R4Observation from './versions/R4Observation';
const observationValidators = [R4Observation].map(cls => new cls());
const validate = async entries => {
  const profileName = RecordType.covid19LabResult;
  /* checks for each entry 
     1. If the type is observation
     2. if observation can validate the system.
     3. if case 2, then validate.
     4. lastly it checks any valid record contains reference to patient
  */
  const patientKeys = [];
  let labResults = [];
  for (var i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (isResourceType(entry, ResourceType.Patient) && entry.fullUrl) {
      patientKeys.push(entry.fullUrl);
    }
    if (isResourceType(entry, ResourceType.Observation)) {
      /* get the first observation validator */
      const observation = observationValidators.find(observation => {
        return observation.canSupport(entry);
      }) ?? null;
      if (observation != null && (await observation.validate(entry))) {
        labResults.push(entry);
      }
    }
  }
  entries.forEach(async entry => {
    if (isResourceType(entry, ResourceType.Patient) && entry.fullUrl) {
      patientKeys.push(entry.fullUrl);
    }
    if (isResourceType(entry, ResourceType.Observation)) {
      /* get the first observation validator */
      const observation = observationValidators.find(observation => {
        return observation.canSupport(entry);
      }) ?? null;
      if (observation != null && (await observation.validate(entry))) {
        labResults.push(entry);
      }
    }
  });

  /* 4. make sure there is a patient mapped with fullURl */
  labResults = labResults.filter(item => {
    var _item$resource, _item$resource$subjec, _item$resource2, _item$resource2$subje, _item$resource3, _item$resource3$subje;
    console.log('item?.resource?.subject?.reference: ' + (item === null || item === void 0 ? void 0 : (_item$resource = item.resource) === null || _item$resource === void 0 ? void 0 : (_item$resource$subjec = _item$resource.subject) === null || _item$resource$subjec === void 0 ? void 0 : _item$resource$subjec.reference) + '(' + patientKeys.indexOf(item === null || item === void 0 ? void 0 : (_item$resource2 = item.resource) === null || _item$resource2 === void 0 ? void 0 : (_item$resource2$subje = _item$resource2.subject) === null || _item$resource2$subje === void 0 ? void 0 : _item$resource2$subje.reference) + ')');
    if (patientKeys.includes(item === null || item === void 0 ? void 0 : (_item$resource3 = item.resource) === null || _item$resource3 === void 0 ? void 0 : (_item$resource3$subje = _item$resource3.subject) === null || _item$resource3$subje === void 0 ? void 0 : _item$resource3$subje.reference)) {
      return true;
    }
    console.log(`Profile : ${profileName} :  Patient reference does not match`);
    return false;
  });
  return Promise.resolve(labResults.length > 0);
};
console.info('labResultsValidators/labresultValidator' + typeof validate);
export default validate;
//# sourceMappingURL=labResultValidator.js.map