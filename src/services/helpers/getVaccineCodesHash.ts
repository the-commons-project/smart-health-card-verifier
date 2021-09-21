import { ErrorCode } from '../error'
import { vaccineNameLookUpUrl } from '../constants'

export const getVaccineCodesHash = async (): Promise<any> => {
  let response

  try {
    response = await fetch(vaccineNameLookUpUrl)
  } catch (error) {
    throw ErrorCode.SERVER_ERROR
  }

  if (response.status !== 200) {
    throw ErrorCode.SERVER_ERROR
  }

  const { covid_19_vaccine_codes: vaccineCodes } = await response.json()

  const vaccineCodesHash: any = {}

  for (const vaccineCode of vaccineCodes) {
    const { code, display } = vaccineCode
    vaccineCodesHash[code] = display
  }

  return vaccineCodesHash
}
