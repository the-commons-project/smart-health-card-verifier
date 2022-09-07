import type { FhirBundle } from '../types'
import immunizationValidator from './immunizationValidator'
import labResultValidator  from './labResultValidator'
import { RecordType } from '../fhirTypes'
import type { ValidateFunction } from '../types'
const validators: Record< RecordType, ValidateFunction> = {
  [RecordType.unknown]: ()=>{ return Promise.resolve(false) },
  [RecordType.immunization]: immunizationValidator,
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
