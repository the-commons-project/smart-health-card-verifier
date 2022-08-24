import type { RecordEntry } from 'verifier-sdk';
import type { JWS } from '../jws/types';
export declare type ParserFunction = (jwsPayload: JWSPayload) => RecordEntry[] | any | null;
export declare type ValidateFunction = (entry: BundleEntry[]) => Promise<boolean>;
export interface HealthCard {
    verifiableCredential: JWS[];
}
export interface JWSPayload {
    iss: string;
    nbf: number;
    vc: {
        type: string[];
        credentialSubject: {
            fhirBundle: FhirBundle;
        };
    };
}
export interface FhirBundle {
    text?: string;
    Coding?: {
        display: unknown;
    };
    CodeableConcept?: {
        text: unknown;
    };
    meta?: unknown;
    id?: unknown;
    resourceType: string;
    type: string;
    entry: BundleEntry[];
}
export interface BundleEntry {
    id?: string;
    extension?: unknown[];
    modifierExtension?: unknown[];
    link?: string[];
    fullUrl?: string;
    resource: Resource;
    search?: unknown;
    request?: unknown;
    response?: unknown;
    lotNumber?: unknown;
    performer?: unknown;
}
export declare type Resource = {
    resourceType: string;
    subject?: any;
    code?: any;
    valueCodeableConcept?: any;
    status?: string;
    effectiveDateTime?: string;
    performer?: Array<Record<any, any>>;
    meta?: {
        security?: Array<{
            system: string;
            code: string;
        }>;
    };
} & Record<string, unknown>;
export interface ObservationValidator {
    canSupport: (entry: BundleEntry) => boolean;
    validate: (entry: BundleEntry) => Promise<boolean>;
}
export interface ObservationParser {
    parse: (entry: BundleEntry) => any;
}
