export declare type VerifierInitOption = {
    [key: string]: any | undefined;
};
export declare type IVerifierBaseCls = new (options: VerifierInitOption) => IVerifierBase;
export interface BaseResponse {
    isValid: boolean;
    errorCode: number;
    issuerData: issuerData;
    patientData: patientData;
    recordType: string;
    recordEntries?: RecordEntry[];
}
export interface IVerifierBase {
    canVerify: (payloads: string[]) => Promise<null | IVerifierBase>;
    validate: (payloads: string[]) => Promise<null | BaseResponse>;
}
export interface Result {
    result: boolean;
}
export interface RecordEntry {
    index?: unknown;
    resourceType: string;
    lotNumber?: unknown;
    vaccinator?: unknown;
    vaccineName?: unknown;
    vaccinationDate?: unknown;
    securityCode?: string;
    performer?: string;
    effectiveDateTime?: string;
    systemName?: string;
    systemKey?: string;
    systemCode?: string;
    systemShortDefault?: string | null;
    codableConseptLabel?: string;
    codableConseptKey?: string;
    codableConseptCode?: string;
    codeableShortDefault?: string | null;
}
interface issuerData {
    iss: string;
    logo_uri: string;
    name: string;
    updated_at: number;
    url: string;
}
interface patientData {
    dateOfBirth: string;
    names: string[];
}
export {};
