import { RecordType } from '../fhirTypes';
import type { RecordEntry } from 'verifier-sdk';
import type { JWSPayload } from '../types';
export default function getRecordData(recordType: RecordType, jwsPayload: JWSPayload): Promise<RecordEntry[] | null>;
