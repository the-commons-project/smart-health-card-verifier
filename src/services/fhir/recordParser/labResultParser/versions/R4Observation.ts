import { getSystemCodeLabel, getAcceptedSystemCode } from '../../../../helpers/getFHIRCodes'
import { formatFHIRRecordDate } from '../../../../../utils/utils'

export default class R4Observation implements ObservationParser {
  parse( entry: BundleEntry ): any {

    try{
      const unknownSystem   = "UNKNOWN"
      var { status, code, performer, meta, valueCodeableConcept, effectiveDateTime } = entry?.resource
      const systemCoding =  code?.coding[0];
      const securityCode = meta?.security ? ( meta?.security[0]?.code ?? "UNKNOWN" ) : "UNKNOWN"
      const system = getAcceptedSystemCode( systemCoding.system, systemCoding.code );
      const systemName = system.display ?? unknownSystem
      const observationDate = effectiveDateTime ? formatFHIRRecordDate(effectiveDateTime ) : ''
      const performerName = this.getPerformerLabel( performer );
      const systemKey  = systemCoding?.systemKey ?? unknownSystem
      const systemCode = systemCoding?.code ?? unknownSystem
      var codableConseptKey   = null
      var codableConseptLabel = null
      var codableConseptCode  = null
      if( valueCodeableConcept?.coding[0] ) {
        let codableCoding  = valueCodeableConcept?.coding[0];
        const codableSystem = getAcceptedSystemCode( codableCoding.system, codableCoding.code );
        codableConseptLabel = getSystemCodeLabel( codableSystem.system, codableSystem.code )
        codableConseptKey   = codableSystem.keys
        codableConseptCode  = code
      }
      const resultCodableConsept = getSystemCodeLabel( valueCodeableConcept?.coding[0].system, valueCodeableConcept?.coding[0].code ) ?? null

      return {
        securityCode,
        status,
        performer: performerName,
        systemName,
        systemKey,
        systemCode,
        observationDate,
        codableConseptLabel,
        codableConseptKey,
        codableConseptCode
      }

    } catch( e ) {
      console.info(e)


    }
  }
  getPerformerLabel( performers: Record<any,any>[] | undefined ): string {
    var res = "UNKNOWN"
    if( performers ) {
      res = performers[0].display ? performers[0].display : "UNKNOWN" 
    } 
    return res;
  }
}
