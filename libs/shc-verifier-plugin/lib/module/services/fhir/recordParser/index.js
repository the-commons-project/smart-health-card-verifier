import ImmunizationRecordParser from './ImmunizationRecordParser';
import Covid19LabResultRecordParser from './Covid19LabResultRecordParser';
import { RecordType } from '../fhirTypes';
const recordParsers = {
  [RecordType.unknown]: () => {
    return null;
  },
  [RecordType.covid19LabResult]: Covid19LabResultRecordParser,
  [RecordType.covid19Immunization]: ImmunizationRecordParser
};
export default async function getRecordData(recordType, jwsPayload) {
  var _recordParsers$record;

  let res = null;
  res = (await ((_recordParsers$record = recordParsers[recordType]) === null || _recordParsers$record === void 0 ? void 0 : _recordParsers$record.call(undefined, jwsPayload))) ?? null;
  return res;
}
//# sourceMappingURL=index.js.map