import _ from 'lodash'

export const enum RecordType {
  'unknown'='unknown',
  'covid19Immunization' = 'covid19-immunization',
  'covid19LabResult'    = 'covid19-lab-result'
}

export const enum ResourceType {
  Unknown      = 'Unknown',
  Immunization = 'Immunization',
  Patient      = 'Patient',
  Observation  = 'Observation'
}

export const availableRecordTypes: RecordType[] = [ 
  RecordType.covid19Immunization,
  RecordType.covid19LabResult
]
export const acceptedVCType: Record<string, string[]> = {
  [RecordType.covid19Immunization]: [  
    'https://smarthealth.cards#immunization',
    'https://smarthealth.cards#covid19',
    'https://smarthealth.cards#health-card'],
  [RecordType.covid19LabResult]: [               
    'https://smarthealth.cards#laboratory',
    'https://smarthealth.cards#covid19',
    'https://smarthealth.cards#health-card']
}

/* this will check if it's validatable types per payload. 
   it also assumes that per each payload it has one record type
   exclusively, or it fallback to unknown.
*/
export function getRecordTypeFromPayload ( fhirJWSPayload: JWSPayload ): RecordType  {
  let res = RecordType.unknown
  const types = fhirJWSPayload?.vc?.type
  if ( Array.isArray( types ) ) {
    for ( let i=0; i < availableRecordTypes.length; i++ ) {
      const recordType = acceptedVCType[availableRecordTypes[i]]
      if ( _.intersection(types.sort(), recordType.sort()).length === recordType.length ){
        res = availableRecordTypes[i]
        break
      }
    } 
  }
  return res
}

export function isResourceType ( entry: BundleEntry, resourceType: ResourceType ): boolean {
  return ( entry?.resource?.resourceType.toLowerCase() === resourceType.toLowerCase() )
}
