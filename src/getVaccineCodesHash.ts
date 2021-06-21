import { vaccineNameLookUpUrl } from './constants'

export const getVaccineCodesHash = async (): Promise<any> => {
  try {
    const response = await fetch(vaccineNameLookUpUrl)
    const { covid_19_vaccine_codes: vaccineCodes } = await response.json()

    const vaccineCodesHash: any = {}

    for (const vaccineCode of vaccineCodes) {
      const { code, display } = vaccineCode
      vaccineCodesHash[code] = display
    }

    return vaccineCodesHash
  } catch (error) {
    console.log('Failed to get vaccine name by code', error)

    return ''
  }
}
