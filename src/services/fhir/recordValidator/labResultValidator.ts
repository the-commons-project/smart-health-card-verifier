import { RecordType } from '../fhirTypes'

const validate: ValidateFunction = (entries: BundleEntry[])=> {
  const profileName = RecordType.covid19LabResult
  return false
}

export default validate
