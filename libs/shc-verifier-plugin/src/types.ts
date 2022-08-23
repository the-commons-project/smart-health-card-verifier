import type { VerifierInitOption } from 'verifier-sdk'

type ValidateIssuerReturnType = any | null;
export interface ValidateIssuerFunction<T = unknown> {
  ( verifierKey: string, issuer: T ): ValidateIssuerReturnType;
}

export interface AsyncIssuerValidateFunction<T = unknown> extends ValidateIssuerFunction<T> {
  (...args: Parameters<ValidateIssuerFunction<T>>): Promise< ValidateIssuerReturnType >;
  $async: true;
}

export declare type AnyIssuerValidateFunction<T = any> = ValidateIssuerFunction<T> | AsyncIssuerValidateFunction<T>;

type CodesReturnType = string [];


export interface GetGetAcceptedVaccineCodesFunction<T = unknown> {
  ( verifierKey: string ): CodesReturnType;
}

export interface AsyncGetAcceptedVaccineFunction<T = unknown> extends GetGetAcceptedVaccineCodesFunction<T> {
  (...args: Parameters<ValidateIssuerFunction<T>>): Promise< CodesReturnType >;
  $async: true;
}

export declare type AnyGetAcceptedVaccineCodesFunction<T = any> = GetGetAcceptedVaccineCodesFunction<T> | AsyncGetAcceptedVaccineFunction<T>;



export interface useLegacyFunction{
  ( system: string, code: string ): boolean
} 

export interface isAcceptedLabResult{
  ( system: string, code: string ): boolean
} 

export interface getIsSmallScreenFunction{
  ():boolean
} 

export interface getAcceptedSystemCodeFunction{
 ( system: string, code: string ): any | null
}

export interface getSystemCodeLabelFunction {
  ( system: string, code: string ): string | null 
}

export interface getVaccineCodesHashFunction{
  (): { [key: string]: string }
}



export interface SHCverifierOption {
  useLegacy: useLegacyFunction,
  getIssuer: AnyIssuerValidateFunction, 
  getAcceptedVaccineCodes: AnyGetAcceptedVaccineCodesFunction,
  isAcceptedLabResult: isAcceptedLabResult,
  getAcceptedSystemCode: getAcceptedSystemCodeFunction
  getSystemCodeLabel: getSystemCodeLabelFunction,
  getVaccineCodesHash: getVaccineCodesHashFunction, 
}

export interface SHCVerifierType extends VerifierInitOption {
  shc?:SHCverifierOption
}