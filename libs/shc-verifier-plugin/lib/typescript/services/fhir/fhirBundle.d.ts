import { RecordType } from './fhirTypes';
import type { JWSPayload } from './types';
export declare function getRecord(payload: JWSPayload): Promise<any>;
export declare function validate(recordType: RecordType, fhirBundleJSON: object | undefined): Promise<boolean>;
