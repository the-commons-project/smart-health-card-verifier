"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortRecordByDateField = exports.formatDateOfBirth = void 0;
// NOTE: Timezone affects date presentation, so in US it will be 1 day behind,
//       that is why `new Date()` is not needed.
//       Birthday date in FHIR => "birthDate": "1960-01-20"
const formatDateOfBirth = birthDate => {
  const [year, month, day] = birthDate.split('-');
  const dateOfBirth = `${month}/${day}/${year}`;
  return dateOfBirth;
};
exports.formatDateOfBirth = formatDateOfBirth;
const sortRecordByDateField = (dateFieldName, records) => {
  records.sort((a, b) => Date.parse(a[dateFieldName]) - Date.parse(b[dateFieldName]));
  // set correct dose number if dose objects are swapped
  for (const [index, rec] of records.entries()) {
    rec.index = index + 1;
  }
};
exports.sortRecordByDateField = sortRecordByDateField;
//# sourceMappingURL=utils.js.map