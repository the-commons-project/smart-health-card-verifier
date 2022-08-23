import { before } from 'lodash'
import { setVerifierInitOption } from '~/models/Config'
import type { SHCverifierOption } from '~/types'

const labResultSystem = {
    "code": "50548-7",
    "shortDefault": "Molecular Test",
    "display": "Respiratory virus DNA+RNA [Identifier] in Specimen by NAA with probe detection",
    "systemKey": "LOINC",
    "system": "http://loinc.org"
  }

function initializeConfig(){
  console.info("Setting up intial SHC Config ")
  const shcOption: SHCverifierOption = {
      useLegacy: ()=>false,
      getIssuer: ()=>[], 
      getVaccineCodesHash: ()=>{ return {} },
      getSystemCodeLabel: ( system: string, code: string ) => "Test Label",
      getAcceptedVaccineCodes: ()=>["208"],
      isAcceptedLabResult: ( system:string, code:string )=> false ,
      getAcceptedSystemCode: ( system: string, code: string ) => labResultSystem, 
  }
  setVerifierInitOption( shcOption )
}

beforeAll( initializeConfig )
