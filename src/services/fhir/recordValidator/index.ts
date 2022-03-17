import immunizationValidator from './immunizationValidator'
import labResultValidator from './labResultValidator'
import { RecordType } from '../fhirTypes'

const validators: Record< RecordType, ValidateFunction> = {
  [RecordType.any]: ()=>{ return false },
  [RecordType.covid19Immunization]: immunizationValidator,
  [RecordType.covid19LabResult]: labResultValidator
}

export default function validateBundleForRecordType ( recordType: RecordType, fireBundle: FhirBundle  ): boolean{
  let res = false
  if ( Array.isArray( fireBundle.entry )){
    const entry = fireBundle.entry 
    res = validators[recordType]?.call(undefined, entry) ?? false
  }
  return res
}
