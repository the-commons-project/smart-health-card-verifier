import { ErrorCode } from '../error'
import { vaccineCodesURl, ApiTimeout } from '../constants'
import { getInstallationIdManually } from '../../utils/utils'
import { DataKeys, loadDataOrRetrieveLocally } from '../../services/data/DataService'
import defaultCodesData from '../../../resources/public/vaccine-codes/accepted_code.json'

interface VaccineCodeItemType {
  'system': string
  'code': string
  'display': string
} 

interface VaccineCodesTypes {
  covid_19_vaccine_codes: VaccineCodeItemType[]
} 

let codesData = defaultCodesData.covid_19_vaccine_codes
let vaccineCodesHash: { [key: string]: string } = {}
let acceptedCodes: string[] = []

export const loadVaccineCodes = async (): Promise<boolean>=> {
  const appUuid: string = await getInstallationIdManually()
  const appUuidParameter = `appUUID=${appUuid}`
  const url = `${vaccineCodesURl}?${appUuidParameter}`
  const res = await loadDataOrRetrieveLocally<VaccineCodesTypes| null>( url, DataKeys.VACCINECODE )
  if ( res != null ) {
    codesData = res.covid_19_vaccine_codes
    updateVaccineCode()
  } else {
    console.log('using default vaccineCodes')
  }
  return ( res != null )
}

const updateVaccineCode = ()=>{
  vaccineCodesHash = {}
  for (const vaccineCode of codesData) {
    const { code, display } = vaccineCode
    vaccineCodesHash[code] = display
  }
  acceptedCodes = codesData.map((item: any)=> item.code)
}

updateVaccineCode()

export const getVaccineCodesHash = (): { [key: string]: string } => {
  return vaccineCodesHash
}

export const getAcceptedCodes = (): string[] => {
  return acceptedCodes
}
