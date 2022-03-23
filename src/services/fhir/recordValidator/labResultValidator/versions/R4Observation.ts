import { ErrorCode } from '../../../../error'
import { InvalidError } from '../../../../../utils/InvalidError'
import { isAcceptedLabResult } from '../../../../helpers/getFHIRCodes'

class R4Observation implements ObservationValidator {

    canSupport(entry: BundleEntry): boolean {
      const expectedCodeSystem = "http://loinc.org"
      let coding = ( entry?.resource?.code?.coding ?? [] ).filter(( item:any ) => {
        console.info("R4Observation : " + JSON.stringify( item ) +  " \r\n" + 
         "isAcceptedLabResult: " + isAcceptedLabResult( item.system, item.code ) 
        )
        return isAcceptedLabResult( item.system, item.code );
      })
      let res = ( coding.length > 0 )

      console.info("R4Observation: returning :" + res )
      return res;
    }
    
    validate( entry: BundleEntry ): boolean {
      let res = false;
      if ( this.canSupport( entry ) ) {
        res = true;
      } 
      return res;
    }
}

export default R4Observation;