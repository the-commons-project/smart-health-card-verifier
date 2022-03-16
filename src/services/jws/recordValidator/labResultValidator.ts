import {RecordType} from '../fhirTypes'

const validate:ValidateFunc = (entries: BundleEntry[])=> {
    const profileName = RecordType.covid19LabResult
    return false;
};

export default validate;