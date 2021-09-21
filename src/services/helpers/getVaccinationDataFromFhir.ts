import { formatVaccinationDate } from '../utils'
import { getVaccineCodesHash } from './getVaccineCodesHash'

const cvxCodes = ['207', '208', '210', '211', '212']

export const getVaccinationDataFromFhir = async (credential: any): any => {
  const vaccinationData = []

  const entries = credential?.vc?.credentialSubject?.fhirBundle?.entry

  const immunizationEntries = entries
    ?.filter((entry: any) => {
      const isTypeImmunization = entry?.resource?.resourceType === 'Immunization'

      if (isTypeImmunization) {
        return entry
      }
    })
    .map((entry) => entry.resource)

  const vaccineCodesHash = await getVaccineCodesHash()

  for (const [index, entry] of immunizationEntries.entries()) {
    const { status, lotNumber, performer, vaccineCode, occurrenceDateTime } = entry

    const { code } = vaccineCode?.coding[0]

    const isValidVaccinationCode = code && cvxCodes.includes(code)

    if (!isValidVaccinationCode) {
      console.log(
        `Immunization.vaccineCode.code requires valid COVID-19 code (${cvxCodes.join(',')}).`,
      )
    }

    const vaccineName = vaccineCodesHash[code]

    let vaccinator = ''
    if (performer) {
      vaccinator = performer[0]?.actor?.display || ''
    }

    const isVaccineShotDone = status === 'completed'

    if (!isVaccineShotDone) {
      console.log(`Immunization.status should be "completed", but it is ${status}`)
    }

    const dose = index + 1
    const vaccinationDate = formatVaccinationDate(occurrenceDateTime)

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

function sortDosesByDate(vaccinationData: any[]) {
  // earliest -> latest
  vaccinationData.sort((a, b) => Date.parse(a.vaccinationDate) - Date.parse(b.vaccinationDate))
  // set correct dose number if dose objects are swapped
  for (const [index, dose] of vaccinationData.entries()) {
    dose.dose = index + 1
  }
}
