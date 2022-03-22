import { ErrorCode } from '../../../../error'
import { InvalidError } from '../../../../../utils/InvalidError'
import { getAcceptedSystemCodes } from '../../../../helpers/getFHIRCodes'

class R4Observation implements ObservationValidator {

    isSystem(entry: BundleEntry): boolean {
      const expectedCodeSystem = "http://loinc.org"
      let coding = ( entry?.resource?.code?.coding ?? [] ).filter(( item:any ) => {
        return ( getAcceptedSystemCodes().indexOf( item.system ?? "" ) >= 0 )
      })
      return ( coding.length > 0 )
    }
    
    validate( entry: BundleEntry ): boolean {
      let res = false;
      if ( this.isSystem( entry ) ) {
        res = true;
      } 
      return res;
    }
}

export default R4Observation;