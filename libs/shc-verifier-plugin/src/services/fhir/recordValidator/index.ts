import immunizationValidator from './immunizationValidator'
import labResultValidator  from './labResultValidator'
import { RecordType } from '../fhirTypes'

const validators: Record< RecordType, ValidateFunction> = {
  [RecordType.unknown]: ()=>{ return Promise.resolve(false) },
  [RecordType.covid19Immunization]: immunizationValidator,
  [RecordType.covid19LabResult]: labResultValidator
}

export default async function validateBundleForRecordType ( recordType: RecordType, fireBundle: FhirBundle  ): Promise< boolean>{

  let res = false
  if ( Array.isArray( fireBundle.entry )){
    const entry = fireBundle.entry
    try{ 
      res = await validators[recordType]?.call(undefined, entry) ?? false
    } catch ( error ){
      console.info( "Validation Error: "  + error )
    }
  }
  return res
}
