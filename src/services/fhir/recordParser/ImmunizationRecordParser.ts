import { sortRecordByDateField } from '../../../utils/utils'
import { getVaccineCodesHash, getAcceptedVaccineCodes } from '../../helpers/getFHIRCodes'
import { ResourceType, isResourceType } from '../fhirTypes'
import { RecordEntry } from '../../../types'

const cvxCodes = getAcceptedVaccineCodes()

const parse: ParserFunction  =(jwsPayload: JWSPayload): RecordEntry[] | null=> {
  const vaccinationData = []
  const entries = jwsPayload?.vc?.credentialSubject?.fhirBundle?.entry

  const immunizationEntries = entries
    ?.filter((entry: any) => {
      return isResourceType( entry, ResourceType.Immunization )
    })
    .map((entry: any) => entry.resource)

  const vaccineCodesHash: { [key: string]: string } = getVaccineCodesHash()

  for (const [index, entry] of immunizationEntries.entries()) {
    const { status, lotNumber, performer, vaccineCode, occurrenceDateTime } = entry
    const { code } = vaccineCode?.coding[0]
    const isValidVaccinationCode = code && cvxCodes.includes(code)
    const isVaccineShotDone = ( status || '').toLowerCase() === 'completed'
    if (!isValidVaccinationCode) {
      console.log(
        `Immunization.vaccineCode.code (${String(code)}) requires valid COVID-19 code (${String(cvxCodes.join(','))}).`,
      )
    }

    if (!isVaccineShotDone) {
      console.log(`Immunization.status should be "completed", but it is ${String(status)}`)
    }

    const dose = index + 1
    const vaccineName = vaccineCodesHash[code]
    const vaccinationDate = occurrenceDateTime

    let vaccinator = ''
    if (performer) {
      vaccinator = performer[0]?.actor?.display || ''
    }

    if (isVaccineShotDone && isValidVaccinationCode) {
      vaccinationData.push({
        index: ( index + 1),
        resourceType:ResourceType.Immunization,
        lotNumber,
        vaccinator,
        vaccineName,
        vaccinationDate,
      })
    }
  }

  sortRecordByDateField('vaccinationDate', vaccinationData)
  return vaccinationData
}

export default parse
