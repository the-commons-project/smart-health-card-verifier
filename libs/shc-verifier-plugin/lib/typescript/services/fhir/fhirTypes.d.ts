import type { JWSPayload, BundleEntry } from './types';
export declare const enum RecordType {
    'unknown' = "unknown",
    'covid19Immunization' = "covid19-immunization",
    'covid19LabResult' = "covid19-lab-result"
}
export declare const enum ResourceType {
    Unknown = "Unknown",
    Immunization = "Immunization",
    Patient = "Patient",
    Observation = "Observation"
}
export declare const availableRecordTypes: RecordType[];
export declare const acceptedVCType: Record<string, string[]>;
export declare function getRecordTypeFromPayload(fhirJWSPayload: JWSPayload): RecordType;
export declare function isResourceType(entry: BundleEntry, resourceType: ResourceType): boolean;
