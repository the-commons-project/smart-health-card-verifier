import { getSystemCodeLabel, getAcceptedSystemCode } from '../../../../helpers/getFHIRCodes'
import { formatFHIRRecordDate } from '../../../../../utils/utils'

export default class R4Observation implements ObservationParser {
  parse ( entry: BundleEntry ): any {

    try {
      const unknownSystem   = 'UNKNOWN'
      const { status, code, performer, meta, valueCodeableConcept, effectiveDateTime } = entry?.resource
      const systemCoding =  code?.coding[0]
      const securityCode = meta?.security ? ( meta?.security[0]?.code ?? 'UNKNOWN' ) : 'UNKNOWN'
      const system = getAcceptedSystemCode( systemCoding.system, systemCoding.code )
      const systemName = system.display ?? unknownSystem
      const observationDate = effectiveDateTime ? formatFHIRRecordDate(effectiveDateTime ) : ''
      const performerName = this.getPerformerLabel( performer )
      const systemKey  = system?.systemKey ?? unknownSystem
      const systemCode = system?.code ?? unknownSystem
      const systemShortDefault = system?.shortDefault ?? null
      let codableConseptKey   = null
      let codableConseptLabel = null
      let codableConseptCode  = null
      let codeableShortDefault = null
      if ( valueCodeableConcept?.coding[0] ) {
        const codableCoding  = valueCodeableConcept?.coding[0]
        const codableSystem = getAcceptedSystemCode( codableCoding.system, codableCoding.code )
        codableConseptLabel = getSystemCodeLabel( codableSystem.system, codableSystem.code )
        codableConseptKey   = codableSystem.systemKey
        codableConseptCode  = codableSystem.code
        codeableShortDefault = codableSystem.codeableShortDefault ?? null
      }

      return {
        securityCode,
        status,
        performer: performerName,
        systemName,
        systemKey,
        systemCode,
        systemShortDefault,
        observationDate,
        codableConseptLabel,
        codableConseptKey,
        codableConseptCode,
        codeableShortDefault
      }

    } catch ( e ) {
      console.info(e)

    }
  }

  getPerformerLabel ( performers: Array<Record<any, any>> | undefined ): string {
    let res = 'UNKNOWN'
    if ( performers ) {
      res = performers[0].display ? performers[0].display : 'UNKNOWN' 
    } 
    return res
  }
}
