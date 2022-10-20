import { ErrorCode, VaccineCodeItemType } from 'verifier-sdk'
import { vaccineCodesURl, ApiTimeout } from '~/models/constants'
import { getInstallationIdManually } from '~/utils/utils'
import { DataKeys, loadDataOrRetrieveLocally, getDataService } from '~/services/data/DataService'
import defaultCodesData from '~/../resources/public/vaccine-codes/accepted_code.json'


interface SystemCodeItemType {
  'shortDefault'?: string
  'system': string
  'code': string
  'display': string
  'systemKey': string
} 

interface VaccineCodesTypes {
  vaccine_codes?: VaccineCodeItemType[]
  lab_test_codes?: SystemCodeItemType[]
} 

let vaccineCodesData: VaccineCodeItemType[]  = defaultCodesData.vaccine_codes
let labResultCodesData: SystemCodeItemType[] = defaultCodesData.lab_test_codes

let vaccineCodesHash: { [key: string]: VaccineCodeItemType } = {}
let acceptedVaccineCodes: string[] = []

let labResultCodesHash: { [key: string]: SystemCodeItemType } = {}
const acceptedSystemCodes: string[] = []
const acceptedLabResultSystemCodes = []

export const loadVaccineCodes = async ( forceReset: boolean ): Promise<boolean>=> {
  var res = null;
  if( !forceReset ) {
    res = await getDataService().getJSON( DataKeys.VACCINECODE )
  }
  if( res == null ){
    const appUuid: string = await getInstallationIdManually()
    const appUuidParameter = `appUUID=${appUuid}`
    const url = `${vaccineCodesURl}?${appUuidParameter}`
    res = await loadDataOrRetrieveLocally<VaccineCodesTypes| null>( url, DataKeys.VACCINECODE )
  }
  if ( res != null ) {
    vaccineCodesData   = res.vaccine_codes ?? vaccineCodesData
    labResultCodesData = res.lab_test_codes ?? labResultCodesData
    updateCodes()
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
    let { system, code, display, manufacturerName, groupDisplay } = vaccineCode
    manufacturerName = manufacturerName || null
    groupDisplay = groupDisplay || null
    acceptedVaccineCodes.push( code )
    vaccineCodesHash[code] = vaccineCode

  }
}

const getLabResultSystemKey = (system: string, code: string ): string => {
  return `${system}#${code}`
}

const updateLabResultSystemCode = ()=>{
  labResultCodesHash = {}
  for (const labCode of labResultCodesData) {
    const { code, display, system, systemKey, shortDefault } = labCode
    labResultCodesHash[ getLabResultSystemKey( system, code )] = {
      code, 
      system,
      display,
      systemKey,
      shortDefault
    }
  }
}

updateCodes()

export const getVaccineCodesHash = (): { [key: string]: VaccineCodeItemType } => {
  return vaccineCodesHash
}

export const getAcceptedVaccineCodes = (): string [] => {
  return acceptedVaccineCodes
}

export const getAcceptedSystemCode =( system: string, code: string ): any | null => {
  return labResultCodesHash[getLabResultSystemKey( system, code)] ?? null
}

export const getSystemCodeLabel = ( system: string, code: string ): string | null => {
  return getAcceptedSystemCode( system, code )?.display  ?? null
}

export const isAcceptedLabResult =( system: string, code: string ): boolean => {
  return !!getAcceptedSystemCode( system, code)
}
