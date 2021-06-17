import { vaccineNameLookUpUrl } from './constants'

export const getCovidVaccineNameByCode = async (code: string): string => {
  try {
    const response = await fetch(vaccineNameLookUpUrl)
    const { covid_19_vaccine_codes: vaccineCodes } = await response.json()

    const vaccineName = vaccineCodes.find((object) => object.code === code).display

    return vaccineName
  } catch (error) {
    console.log('Failed to get vaccine name by code', error)

    return ''
  }
}
