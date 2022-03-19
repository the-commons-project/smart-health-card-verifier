import { ErrorCode } from '../../../../error'
import { InvalidError } from '../../../../../utils/InvalidError'
import { getAcceptedSystemCodes } from '../../../../helpers/getVaccineCodesHash'

class R4Observation implements ObservationValidator {

    isSystem(entry: BundleEntry): boolean {
      const expectedCodeSystem = "http://loinc.org"
      console.log("R4Observation:####################3")
      let coding = ( entry?.resource?.code?.coding ?? [] ).filter(( item:any ) => {
        return ( getAcceptedSystemCodes().indexOf( item.system ?? "" ) >= 0 )
      })
      console.log(JSON.stringify( coding ));
      return ( coding.length > 0 )
      
    }
    
    validate( entry: BundleEntry ): boolean {
      let res = false;
      if ( this.isSystem( entry ) ) {

      } 
      return res;

    }

}

export default R4Observation;