import { StackNavigationProp } from '@react-navigation/stack'
import { RecordEntry, BaseResponse}  from 'verifier-sdk'
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
  showDetail: boolean
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



interface VaccinationData {
  index: number
  lotNumber: string
  vaccinationDate: string
  vaccinator: string
  vaccineName: string
}

interface LabResultData {
  index: number
}
