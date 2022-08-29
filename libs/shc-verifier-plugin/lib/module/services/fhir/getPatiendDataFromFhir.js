import { formatDateOfBirth } from '../../utils/utils';
import constants from '../../models/FHIRFieldConstant';
const {
  RESOURCE_TYPES
} = constants;
const acceptedSuffix = ['Jr.', 'Sr.', 'II', 'III', 'IV'];

const resolveName = name => {
  let res = null;

  if (name.family) {
    const familyName = name.family;
    let givenNames = '';

    if (name.given) {
      var _name$given;

      givenNames = (_name$given = name.given) === null || _name$given === void 0 ? void 0 : _name$given.join(' ');
      const suffixes = (name.suffix ?? []).filter(i => acceptedSuffix.includes(String(i)));

      if (suffixes.length > 0) {
        givenNames = `${String(givenNames)} ${String(suffixes.join(' '))}`;
      } // for( let i  in ( name.suffix ?? [] ) ) {
      //   let s = String( item )
      //   console.log("testing --------------------" + s );
      //   if ( acceptedSuffix.indexOf( s ) >= 0 ) {
      //     givenNames = `${givenNames} ${s}`
      //   }
      // }


      res = `${familyName} / ${givenNames}`;
    }
  } else if (name.text) {
    res = `${String(name.text)}`;
  }

  if (res != null && name.use) {
    res = `${String(res)} (${String(name.use)})`;
  }

  return res;
};

export const getPatientDataFromFhir = credential => {
  var _credential$vc, _credential$vc$creden, _credential$vc$creden2;

  const entries = credential === null || credential === void 0 ? void 0 : (_credential$vc = credential.vc) === null || _credential$vc === void 0 ? void 0 : (_credential$vc$creden = _credential$vc.credentialSubject) === null || _credential$vc$creden === void 0 ? void 0 : (_credential$vc$creden2 = _credential$vc$creden.fhirBundle) === null || _credential$vc$creden2 === void 0 ? void 0 : _credential$vc$creden2.entry;
  const patientEntry = entries === null || entries === void 0 ? void 0 : entries.find(entry => {
    var _entry$resource;

    return (entry === null || entry === void 0 ? void 0 : (_entry$resource = entry.resource) === null || _entry$resource === void 0 ? void 0 : _entry$resource.resourceType) === RESOURCE_TYPES.PATIENT;
  }).resource;
  let fullName = '';
  let dateOfBirth = '';
  let names = [];

  if (patientEntry) {
    const {
      name,
      birthDate
    } = patientEntry;
    const nameList = name;

    if (name) {
      names = nameList.map(it => {
        fullName = resolveName(it) ?? '';
        return fullName;
      });
    }

    dateOfBirth = formatDateOfBirth(birthDate);
  }

  return {
    names,
    dateOfBirth,
    resourceType: RESOURCE_TYPES.PATIENT
  };
};
//# sourceMappingURL=getPatiendDataFromFhir.js.map