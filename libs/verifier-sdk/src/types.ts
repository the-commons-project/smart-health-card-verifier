/* eslint @typescript-eslint/no-empty-interface: "off" */
export interface VerifierInitOption {
}

export type IVerifierBaseCls = new ( option: VerifierInitOption ) => IVerifierBase

export interface  IVerifierBase {
  canVerify: ( payload: string ) => boolean
}

export interface Result {
  result: boolean
}

export interface RecordEntry {
  index?: unknown
  resourceType: string
  /* immunization */
  lotNumber?: unknown
  vaccinator?: unknown
  vaccineName?: unknown
  vaccinationDate?: unknown
  /* labResult */
  securityCode?: string
  performer?: string
  effectiveDateTime?: string
  systemName?: string
  systemKey?: string
  systemCode?: string
  systemShortDefault?: string | null
  codableConseptLabel?: string
  codableConseptKey?: string
  codableConseptCode?: string
  codeableShortDefault?: string | null

}

interface issuerData {
  iss: string
  logo_uri: string
  name: string
  updated_at: number
  url: string
}

interface patientData {
  dateOfBirth: string
  names: string[]
}

export interface BaseResponse {
  isValid: boolean 
  errorCode: number
  issuerData: issuerData
  patientData: patientData
  recordType: string
  recordEntries?: RecordEntry[]
}
