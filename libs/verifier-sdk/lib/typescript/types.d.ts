export declare type VerifierInitOption = {
    [key: string]: any | undefined;
};
export declare type IVerifierBaseCls = new (options: VerifierInitOption) => IVerifierBase;
export interface VaccineCodeItemType {
    'system': string;
    'code': string;
    'display': string | null;
    'manufacturerName'?: string | null;
    'groupDisplay'?: string | null;
}
export interface BaseResources {
    issuedDate: number | null;
    issuerData: issuerData;
    patientData: patientData;
    recordType: string;
    recordEntries?: RecordEntry[];
    tagKeys?: string[];
}
export interface BaseResponse extends BaseResources {
    isValid: boolean;
    errorCode: number;
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
    systemKey?: string;
    systemCode?: string;
    lotNumber?: unknown;
    vaccinator?: unknown;
    vaccineName?: unknown;
    manufacturerName?: unknown;
    groupName?: unknown;
    vaccinationDate?: unknown;
    securityCode?: string;
    performer?: string;
    effectiveDateTime?: string;
    systemName?: string;
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
//# sourceMappingURL=types.d.ts.map