import { StackNavigationProp } from '@react-navigation/stack'

export type RootStackParamList = {
  Welcome: undefined
  ScanQR: undefined
  VerificationResult: undefined | { validationResult: BaseResponse }
  Error: undefined
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>

export type Props = {
  navigation: ProfileScreenNavigationProp
  route: any
}

export type Data = {
  data: ValidationResult
}

export type ValidationResult = {
  validationResult: BaseResponse
}

export type BaseResponse = {
  isValid: boolean | string
  issuerData: issuerData
  patientData: patientData
  vaccinationData: vaccinationData[]
}

export declare class Timer {
  constructor();
  start(): void;
  stop(): number;
}

type issuerData = {
  iss: string
  logo_uri: string
  name: string
  updated_at: number
  url: string
}

type patientData = {
  dateOfBirth: string
  names: string[]
}

type vaccinationData = {
  dose: number
  lotNumber: string
  vaccinationDate: string
  vaccinator: string
  vaccineName: string
}
