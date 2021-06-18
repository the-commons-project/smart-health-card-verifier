import { formatVaccinationDate } from './utils'
import { getCovidVaccineNameByCode } from './getCovidVaccineNameByCode'

const cvxCodes = ['207', '208', '210', '211', '212']

export const getVaccinationDataFromFhir = async (credential: any): any => {
  const vaccinationData = []

  const entries = credential?.vc?.credentialSubject?.fhirBundle?.entry

  const immunizationEntries = entries?.filter((entry: any) => {
    const isTypeImmunization = entry?.resource?.resourceType === 'Immunization'

    if (isTypeImmunization) {
      return entry
    }
  }).map(entry => entry.resource)

  for (const [index, entry] of immunizationEntries.entries()) {
    const {
      status,
      lotNumber,
      performer,
      vaccineCode,
      occurrenceDateTime,
    } = entry

    const { code } = vaccineCode?.coding[0]

    const isValidVaccinationCode = code && cvxCodes.includes(code)

    if (!isValidVaccinationCode) {
      console.log(`Immunization.vaccineCode.code requires valid COVID-19 code (${cvxCodes.join(',')}).`)
    }

    const vaccineName = await getCovidVaccineNameByCode(code)

    const vaccinator = performer[0]?.actor?.display || ''

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

  return vaccinationData
}
