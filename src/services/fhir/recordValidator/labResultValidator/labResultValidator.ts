import { RecordType, ResourceType } from '../../fhirTypes'
import R4Observation from './systems/R4Observation'
import { isResourceType } from '../../fhirBundle'

const observationValidators= [ R4Observation ].map((cls) => new cls());
const validate: ValidateFunction = (entries: BundleEntry[])=> {
  const profileName = RecordType.covid19LabResult
  /* checks for each entry 
     1. If the type is observation
     2. if observation can validate the system.
     3. if case 2, then validate.
     4. lastly it checks any valid record contains reference to patient
  */ 
  let patientKeys:String[]  = [];
  let labResults:BundleEntry[] = [];
  const entryMap:Record<string, BundleEntry> = {}
  entries.forEach((entry) => {
     if( isResourceType( entry, ResourceType.Patient ) && entry.fullUrl ) {
       patientKeys.push( entry.fullUrl )
     }
     if( isResourceType( entry, ResourceType.Observation )) {
        console.log(" This is observation ###################### ")
        console.log(JSON.stringify( entry ))
        /* get the first observation validator */ 
        let observation = observationValidators.find(( observation )=> {
           return observation.isSystem( entry );
         }) ?? null;
        if ( observation != null && observation.validate( entry ) ){
          labResults.push( entry )
        } 
     }
  })
  console.log("LabResultValidateFunction patientKeys: " + JSON.stringify( patientKeys ))
  console.log("Valified lab result: " + JSON.stringify( labResults ))
  /* 4. make sure there is a patient mapped with fullURl */
  labResults = labResults.filter( (item ) => {
    if ( patientKeys.indexOf( item?.resource?.subject?.reference ) >= 0 ){
      return true;
    }
    console.log(`Profile : ${profileName} :  Patient reference does not match`)
    return false;  
  })
  return ( labResults.length > 0 )
}


export default validate
