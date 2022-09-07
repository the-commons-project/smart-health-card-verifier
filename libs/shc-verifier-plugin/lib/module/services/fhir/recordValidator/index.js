import immunizationValidator from './immunizationValidator';
import labResultValidator from './labResultValidator';
import { RecordType } from '../fhirTypes';
const validators = {
  [RecordType.unknown]: () => {
    return Promise.resolve(false);
  },
  [RecordType.immunization]: immunizationValidator,
  [RecordType.covid19LabResult]: labResultValidator
};
export default async function validateBundleForRecordType(recordType, fireBundle) {
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