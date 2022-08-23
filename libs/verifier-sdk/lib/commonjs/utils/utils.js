"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatFHIRRecordDate = void 0;
exports.parseJson = parseJson;
exports.propPath = propPath;
exports.walkProperties = walkProperties;

function parseJson(json) {
  try {
    return JSON.parse(json);
  } catch (error) {
    return undefined;
  }
}

function walkProperties(obj, path, callback) {
  if (obj instanceof Array) {
    for (let i = 0; i < obj.length; i++) {
      const element = obj[i];

      if (element instanceof Object) {
        walkProperties(element, path.slice(0), callback);
      }
    }

    if (obj.length === 0) callback(obj, path);
    return;
  }

  callback(obj, path);
  if (!(obj instanceof Object)) return;

  for (const propName in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, propName)) {
      const prop = obj[propName];
      path.push(propName);
      walkProperties(prop, path.slice(0), callback);
      path.pop();
    }
  }
} // NOTE: Timezone affects date presentation, so in US it will be 1 day behind,
//       that is why `new Date()` is not needed.
//       Vaccination date in FHIR => "occurrenceDateTime": "2020-12-29"


const formatFHIRRecordDate = dateRaw => {
  let tmpDate = dateRaw;

  if (dateRaw.indexOf('T') > 0) {
    const tmp = new Date(dateRaw);
    tmpDate = [tmp.getFullYear(), tmp.getMonth() + 1, tmp.getDate()].join('-');
  }

  const monthShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [year, month, day] = tmpDate.split('-');
  const monthIndex = parseInt(month, 10) - 1; // 08 -> 7

  const monthShortName = monthShortNames[monthIndex];
  const vaccinationDate = `${day} ${monthShortName} ${year}`;
  return vaccinationDate;
};

exports.formatFHIRRecordDate = formatFHIRRecordDate;

function propPath(object, path) {
  const props = path.split('.');
  let val = object;

  for (let i = 1; i < props.length; i++) {
    val = val[props[i]];
    if (val instanceof Array) val = val.length === 0 ? val : val[0];
    if (val === undefined) return val;
  }

  return val;
}
//# sourceMappingURL=utils.js.map