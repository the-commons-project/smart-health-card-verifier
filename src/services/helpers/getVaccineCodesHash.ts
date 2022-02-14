import { ErrorCode } from '../error'
const defaultCodesData = require(  '../../models/accepted_code.json' )
import { vaccineCodesURl, ApiTimeout} from '../constants'
import { getInstallationIdManually } from '../../utils/utils'
import { DataKeys, loadDataOrRetrieveLocally} from '../../services/data/DataService'

interface VaccineCodeItemType {
  "system": string,
  "code": string,
  "display": string
} 

interface VaccineCodesTypes {
  covid_19_vaccine_codes: Array<VaccineCodeItemType>
} 

var codesData = defaultCodesData.covid_19_vaccine_codes;
var vaccineCodesHash: { [key: string]: string } = {}
var acceptedCodes:string[] = [];

export const loadVaccineCodes = async(): Promise<boolean>=> {
  const appUuid = await getInstallationIdManually()
  const appUuidParameter = `appUUID=${appUuid}`
  const url = `${vaccineCodesURl}?${appUuidParameter}`
  const res = await loadDataOrRetrieveLocally<VaccineCodesTypes| null>( url, DataKeys.VACCINECODE )
  if( res != null ) {
    codesData = res.covid_19_vaccine_codes;
    loadVaccineCode();
  } else {
    console.log('using default vaccineCodes')
  }
  return ( res != null );
}

const loadVaccineCode = ()=>{
    vaccineCodesHash = {}
    for (const vaccineCode of codesData) {
      const { code, display } = vaccineCode
      vaccineCodesHash[code] = display
    }
    acceptedCodes = codesData.map((item: any)=> item.code);
}

export const getVaccineCodesHash = (): { [key: string]: string } => {
  return vaccineCodesHash;
}

export const getAcceptedCodes = (): string[] => {
  return acceptedCodes
}
