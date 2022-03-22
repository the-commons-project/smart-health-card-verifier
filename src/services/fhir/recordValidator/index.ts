import immunizationValidator from './immunizationValidator'
import validate  from './labResultValidator'
import { RecordType } from '../fhirTypes'


console.info("validator labresult: " + typeof validate)

const validators: Record< RecordType, ValidateFunction> = {
  [RecordType.unknown]: ()=>{ return false },
  [RecordType.covid19Immunization]: immunizationValidator,
  [RecordType.covid19LabResult]: validate
}

let keys = Object.keys( validators )
for( var i in keys ) {
  console.log( "validator["+ keys[i] +" = " + typeof validators[keys[i]] )
}

console.log("validators[]=" + typeof validators[RecordType.covid19LabResult])


export default function validateBundleForRecordType ( recordType: RecordType, fireBundle: FhirBundle  ): boolean{
  

  let res = false
  if ( Array.isArray( fireBundle.entry )){
    const entry = fireBundle.entry
    res = validators[recordType]?.call(undefined, entry) ?? false
  }
  return res
}
