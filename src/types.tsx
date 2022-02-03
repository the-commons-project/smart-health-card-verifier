import { StackNavigationProp } from '@react-navigation/stack'

export interface RootStackParamList {
  Welcome: undefined
  ScanQR: undefined
  VerificationResult: undefined | { validationResult: BaseResponse }
  Error: undefined
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>

export interface Props {
  navigation: ProfileScreenNavigationProp
  route: any
}

export interface Data {
  data: ValidationResult
}

export interface ValidationResult {
  validationResult: BaseResponse
}

export interface BaseResponse {
  isValid: boolean | string
  errorCode: number
  issuerData: issuerData
  patientData: patientData
  vaccinationData: vaccinationData[]
}

export declare class Timer {
  constructor ();
  start (): void;
  stop (): number;
}

export interface localeType {
  language: string
  region: string
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

interface vaccinationData {
  dose: number
  lotNumber: string
  vaccinationDate: string
  vaccinator: string
  vaccineName: string
}
