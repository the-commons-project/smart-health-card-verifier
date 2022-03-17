import ImmunizationRecordParser from './ImmunizationRecordParser'
import { RecordType } from '../fhirTypes'

const recordParsers: Record< RecordType, ParserFunction> = {
  [RecordType.any]: ()=>{ return null },
  [RecordType.covid19LabResult]: ()=>{ return null },
  [RecordType.covid19Immunization]: ImmunizationRecordParser,
}

export default function getRecordData ( recordType: RecordType, jwsPayload: JWSPayload  ): VaccineRecord[] | null {
  let res = null
  res = recordParsers[recordType]?.call(undefined, jwsPayload) ?? null
  return res
}
