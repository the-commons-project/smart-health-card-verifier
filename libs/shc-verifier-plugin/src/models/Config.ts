import type { SHCverifierOption } from '~/types'

export const VerifierKey = "SHC"
const defaultOption = {
    useLegacy: ()=>true,
    getIssuer: ()=>null, 
    getAcceptedVaccineCodes: ()=>[],
    isAcceptedLabResult: ()=>false,
    isAccgetAcceptedSystemCode: ()=> null,
    getAcceptedSystemCode: ()=> null, 
    getSystemCodeLabel: ()=> null,
    getVaccineCodesHash: ()=> { return {}} 
}

var _verifierInitOption: SHCverifierOption  = {
    ...defaultOption
}

export function setVerifierInitOption( option: SHCverifierOption ): void {
    _verifierInitOption = option
}

export function getVerifierInitOption(): SHCverifierOption {
    return _verifierInitOption
}