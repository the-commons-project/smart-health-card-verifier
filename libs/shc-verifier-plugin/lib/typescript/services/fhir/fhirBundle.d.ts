import { RecordType } from './fhirTypes';
import type { JWSPayload } from './types';
import type { RecordEntry } from 'verifier-sdk';
interface ResultType {
    issuerData: {
        url: string | null;
        name?: string;
    };
    isValid?: boolean;
    recordType: RecordType;
    tagKeys: string[];
    recordEntries: RecordEntry[] | null;
}
export declare function getRecord(payload: JWSPayload, header: any): Promise<ResultType>;
export declare function getTagKeys(payload: JWSPayload): string[];
export declare function validate(recordType: RecordType, fhirBundleJSON: object | undefined): Promise<boolean>;
export {};
