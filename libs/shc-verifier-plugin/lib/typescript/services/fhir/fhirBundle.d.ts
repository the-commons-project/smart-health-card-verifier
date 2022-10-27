import { RecordType } from './fhirTypes';
import type { JWSPayload } from './types';
import type { BaseResources } from 'verifier-sdk';
export declare function getRecord(payload: JWSPayload): Promise<BaseResources>;
export declare function getTagKeys(payload: JWSPayload): string[];
export declare function validate(recordType: RecordType, fhirBundleJSON: object | undefined): Promise<boolean>;
