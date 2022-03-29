import { RecordType, ResourceType, isResourceType } from '../../fhirTypes'
import R4Observation from './versions/R4Observation'

const observationValidators= [ R4Observation ].map((cls) => new cls())

const validate: ValidateFunction = (entries: BundleEntry[]): boolean => {
  const profileName = RecordType.covid19LabResult
  /* checks for each entry 
     1. If the type is observation
     2. if observation can validate the system.
     3. if case 2, then validate.
     4. lastly it checks any valid record contains reference to patient
  */ 
  const patientKeys: String[]  = []
  let labResults: BundleEntry[] = []
  const entryMap: Record<string, BundleEntry> = {}
  entries.forEach((entry) => {
    if ( isResourceType( entry, ResourceType.Patient ) && entry.fullUrl ) {
      patientKeys.push( entry.fullUrl )
    }
    if ( isResourceType( entry, ResourceType.Observation )) {
      /* get the first observation validator */ 
      const observation = observationValidators.find(( observation )=> {
        return observation.canSupport( entry )
      }) ?? null
      if ( observation != null && observation.validate( entry ) ){
        labResults.push( entry )
      } 
    }
  })

  /* 4. make sure there is a patient mapped with fullURl */
  labResults = labResults.filter( (item ) => {
    console.log('item?.resource?.subject?.reference: ' + item?.resource?.subject?.reference  + '(' + patientKeys.indexOf(item?.resource?.subject?.reference)  + ')')
    if ( patientKeys.includes(item?.resource?.subject?.reference) ){
      return true
    }
    console.log(`Profile : ${profileName} :  Patient reference does not match`)
    return false  
  })
  return ( labResults.length > 0 )
}

console.info('labResultsValidators/labresultValidator' + typeof validate)
export default validate
