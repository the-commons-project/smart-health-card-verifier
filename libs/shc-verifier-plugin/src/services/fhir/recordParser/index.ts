import ImmunizationRecordParser from './ImmunizationRecordParser'
import Covid19LabResultRecordParser from './Covid19LabResultRecordParser'
import { RecordType } from '../fhirTypes'
import type { RecordEntry } from 'verifier-sdk'
import type { ParserFunction, JWSPayload } from '../types' 

const recordParsers: Record< RecordType, ParserFunction> = {
  [RecordType.unknown]: ()=>{ return null },
  [RecordType.covid19LabResult]: Covid19LabResultRecordParser,
  [RecordType.immunization]: ImmunizationRecordParser,
}

export default async function getRecordData ( recordType: RecordType, jwsPayload: JWSPayload  ): Promise< RecordEntry[] | null >{
  let res = null
  res = await recordParsers[recordType]?.call(undefined, jwsPayload) ?? null
  return res
}
