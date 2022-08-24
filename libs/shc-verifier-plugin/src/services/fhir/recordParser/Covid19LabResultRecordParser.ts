import { ResourceType } from '../fhirTypes'
import type { RecordEntry } from 'verifier-sdk'
import R4Observation from './labResultParser/versions/R4Observation'
import { sortRecordByDateField } from '~/utils/utils'
import type { JWSPayload, ParserFunction, ObservationParser}  from '../types'
const parse: ParserFunction  =(jwsPayload: JWSPayload): RecordEntry[] | null=> {
  const parser: ObservationParser = new R4Observation()
  const labResultData:any[] = []
  const entries: any[] = jwsPayload?.vc?.credentialSubject?.fhirBundle?.entry

  /* 1. get the patient 
     2. get the lab result record for the first patient */
  
  const patientURL = entries?.find((entry: any) => {
    return ( entry?.resource?.resourceType === ResourceType.Patient )
  })?.fullUrl

  const observationEntries = entries?.filter((entry: any) => {
    return ( entry?.resource?.resourceType === ResourceType.Observation &&
               entry?.resource?.subject?.reference === patientURL )
  })

  for (const [index, entry] of observationEntries.entries()) {
    const resourceItem = parser.parse( entry )  

    labResultData.push({
      ...resourceItem,
      index: ( index + 1 ),
      resourceType: ResourceType.Observation
    })
  }

  sortRecordByDateField('effectiveDateTime', labResultData)
  return labResultData
}

export default parse
