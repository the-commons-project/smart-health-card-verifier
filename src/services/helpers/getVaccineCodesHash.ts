import { ErrorCode } from '../error'
import { vaccineNameLookUpUrl } from '../constants'
const codesData = require(  '../../models/accepted_code.json' )
const vaccineCodes = codesData.covid_19_vaccine_codes

export const getVaccineCodesHash = (): { [key: string]: string } => {
  
  const vaccineCodesHash: { [key: string]: string } = {}
  for (const vaccineCode of vaccineCodes) {
    const { code, display } = vaccineCode
    vaccineCodesHash[code] = display
  }

  return vaccineCodesHash
}

export const getAcceptedCodes = (): string[] => {
  return vaccineCodes.map((item: any)=> item.code)
}
