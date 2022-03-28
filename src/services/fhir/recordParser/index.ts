import ImmunizationRecordParser from './ImmunizationRecordParser'
import Covid19LabResultRecordParser from './Covid19LabResultRecordParser'
import { RecordType } from '../fhirTypes'
import { RecordEntry } from '../../../types'

const recordParsers: Record< RecordType, ParserFunction> = {
  [RecordType.unknown]: ()=>{ return null },
  [RecordType.covid19LabResult]: Covid19LabResultRecordParser,
  [RecordType.covid19Immunization]: ImmunizationRecordParser,
}

export default function getRecordData ( recordType: RecordType, jwsPayload: JWSPayload  ): RecordEntry[] | null {
  let res = null
  res = recordParsers[recordType]?.call(undefined, jwsPayload) ?? null
  return res
}


