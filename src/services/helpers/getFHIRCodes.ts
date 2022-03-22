import { ErrorCode } from '../error'
import { vaccineCodesURl, ApiTimeout } from '../constants'
import { getInstallationIdManually } from '../../utils/utils'
import { DataKeys, loadDataOrRetrieveLocally } from '../../services/data/DataService'
import RemoteConfig from '../RemoteConfig'
import defaultCodesData from '../../../resources/public/vaccine-codes/accepted_code.json'

interface VaccineCodeItemType {
  'system': string
  'code': string
  'display': string
} 

interface SystemCodeItemType {
  'system': string
  'code': string
  'display': string
} 


interface VaccineCodesTypes {
  covid_19_vaccine_codes?: VaccineCodeItemType[]
  covid_19_lab_result_codes?:SystemCodeItemType[]
} 

let vaccineCodesData   = defaultCodesData.covid_19_vaccine_codes
let labResultCodesData = defaultCodesData.covid_19_lab_result_codes
let labResultSystemCodes = []

let vaccineCodesHash: { [key: string]: string } = {}
let acceptedVaccineCodes: string[] = []

let labResultCodesHash: { [key: string]: string } = {}
let acceptedSystemCodes: string[] = []
let acceptedLabResultCodes = []


export const loadVaccineCodes = async (): Promise<boolean>=> {
  const appUuid: string = await getInstallationIdManually()
  const appUuidParameter = `appUUID=${appUuid}`
  const url = `${vaccineCodesURl}?${appUuidParameter}`
  const res = await loadDataOrRetrieveLocally<VaccineCodesTypes| null>( url, DataKeys.VACCINECODE )
  if ( res != null ) {
    vaccineCodesData   = res.covid_19_vaccine_codes ?? vaccineCodesData
    labResultCodesData = res.covid_19_lab_result_codes ?? labResultCodesData
    updateCodes()
  } else {
    console.log('using default vaccineCodes')
  }
  return ( res != null )
}

const updateCodes = () => {
    updateVaccineCode()
    updateLabResultSystemCode()

}

const updateVaccineCode = ()=>{
  vaccineCodesHash = {}
  acceptedVaccineCodes = []
  for (const vaccineCode of vaccineCodesData) {
    const { code, display } = vaccineCode
    acceptedVaccineCodes.push( code )
    vaccineCodesHash[code] = display

  }
}

const updateLabResultSystemCode = ()=>{
  labResultCodesHash = {}
  acceptedSystemCodes = []
  for (const vaccineCode of labResultCodesData) {
    const { code, display, system } = vaccineCode
    acceptedLabResultCodes.push( code )
    labResultCodesHash[code] = display
    if( acceptedSystemCodes.indexOf( system ) < 0 ) {
      acceptedSystemCodes.push( system )
    }
  }
  acceptedLabResultCodes = vaccineCodesData.map((item: any)=> item.code)
}



updateCodes()

export const getSystemCodeLabel = ( code: string ): string | null => {
  return ( labResultCodesHash[code] ?? null );
}

export const getVaccineCodesHash = (): { [key: string]: string } => {
  return vaccineCodesHash
}

export const getAcceptedSystemCodes = (): string [] => {
  return acceptedSystemCodes;
}

export const getAcceptedVaccineCodes = (): string[] => {
  return acceptedVaccineCodes
}
