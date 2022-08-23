import { getVerifierInitOption } from '~/models/Config'

class R4Observation implements ObservationValidator {

  canSupport (entry: BundleEntry): boolean {
    const expectedCodeSystem = 'http://loinc.org'
    const isAcceptedResult = getVerifierInitOption().isAcceptedLabResult
    const coding = ( entry?.resource?.code?.coding ?? [] ).filter(( item: any ) => {
      return isAcceptedResult( item.system, item.code )
    })
    return ( coding.length > 0 )
  }
    
  async validate ( entry: BundleEntry ): Promise<boolean> {
    let res = true
    const acceptedStatuses = ['final', 'amended', 'corrected']
    if ( this.canSupport( entry ) ) {
      const { status } = entry.resource || ''
      const isObservationCompleteStatus = acceptedStatuses.includes( String( status )  )
      console.log('isObservationCompleteStatus - ' + isObservationCompleteStatus)
      if (!isObservationCompleteStatus) {
        console.log(`Observation.status should be "final, amended, corrected", but it is ${String(status)}`)
        res = false
      }
    } else {
      res = false
      console.log(`Observation.system ${String(entry?.resource?.code?.coding)} should be supported`)
    } 
    return res
  }
}

export default R4Observation
