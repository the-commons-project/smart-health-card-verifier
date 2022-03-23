import { formatFHIRRecordDate, sortRecordByDateField } from '../../../utils/utils'
import { getSystemCodeLabel } from '../../helpers/getFHIRCodes'
import { ResourceType } from '../fhirTypes'
import { RecordEntry } from "../../../types"


const parse: ParserFunction  =(jwsPayload: JWSPayload): RecordEntry[] | null=> {
  const labResultData = []
  const unknownSystem   = "UNKNOWN"
  const entries:any[] = jwsPayload?.vc?.credentialSubject?.fhirBundle?.entry

  /* 1. get the patient 
     2. get the lab result record for the first patient */
  const patient = entries?.find((entry: any) => {
      return ( entry?.resource?.resourceType === ResourceType.Patient )
    })
    .map((entry: any) => entry.resource)

  const observationEntries = entries
    ?.filter((entry: any) => {
      return ( entry?.resource?.resourceType === ResourceType.Observation &&
               entry?.subject?.reference == patient.fullURL )
    })
    .map((entry: any) => entry.resource)


  for (const [index, entry] of observationEntries.entries()) {
    var { status, code, performer, meta, valueCodeableConcept, effectiveDateTime } = entry
    const acceptedStatuses = ['final','amended', 'corrected']
    const isObservationCompleteStatus = acceptedStatuses.indexOf( status  ) >= 0;
    const securityCode = ( meta?.security?.code ?? "UNKNOWN" )
    if (!isObservationCompleteStatus) {
      console.log(`Observation.status should be "final, amended, corrected", but it is ${String(status)}`)
      continue;
    }
    const systemName = getSystemCodeLabel( code?.coding[0].system, code?.coding[0].code ) ?? unknownSystem

    if( systemName == unknownSystem){
      console.log(`Observation.system`)
      continue;
    }
    const observationDate = formatFHIRRecordDate(effectiveDateTime)

    performer = performer[0]?.actor?.display || ''
  
    labResultData.push({
      index: ( index + 1 ),
      resourceType: ResourceType.Observation,
      securityCode,
      performer,
      systemName,
      observationDate,
    })
  }
  sortRecordByDateField("observationDate", labResultData)

  return labResultData
}


export default parse
