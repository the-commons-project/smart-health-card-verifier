import { formatVaccinationDate } from '../../../utils/utils'
import { getVaccineCodesHash, getAcceptedVaccineCodes } from '../../helpers/getFHIRCodes'
import { ResourceType } from '.'

const cvxCodes = getAcceptedVaccineCodes()

const parse: ParserFunction  =(jwsPayload: JWSPayload): VaccineRecord[] | null=> {
  const vaccinationData = []
  const entries = jwsPayload?.vc?.credentialSubject?.fhirBundle?.entry

  const immunizationEntries = entries
    ?.filter((entry: any) => {
      return ( entry?.resource?.resourceType === ResourceType.Immunization )
    })
    .map((entry: any) => entry.resource)

  const vaccineCodesHash: { [key: string]: string } = getVaccineCodesHash()

  for (const [index, entry] of immunizationEntries.entries()) {
    const { status, lotNumber, performer, vaccineCode, occurrenceDateTime } = entry
    const { code } = vaccineCode?.coding[0]
    const isValidVaccinationCode = code && cvxCodes.includes(code)
    const isVaccineShotDone = status === 'completed'
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
    const vaccinationDate = formatVaccinationDate(occurrenceDateTime)

    let vaccinator = ''
    if (performer) {
      vaccinator = performer[0]?.actor?.display || ''
    }

    if (isVaccineShotDone && isValidVaccinationCode) {
      vaccinationData.push({
        dose,
        lotNumber,
        vaccinator,
        vaccineName,
        vaccinationDate,
      })
    }
  }

  sortDosesByDate(vaccinationData)

  return vaccinationData
}

const sortDosesByDate = (vaccinationData: any[]) => {
  // earliest -> latest
  vaccinationData.sort((a, b) => Date.parse(a.vaccinationDate) - Date.parse(b.vaccinationDate))
  // set correct dose number if dose objects are swapped
  for (const [index, dose] of vaccinationData.entries()) {
    dose.dose = index + 1
  }
}

export default parse
