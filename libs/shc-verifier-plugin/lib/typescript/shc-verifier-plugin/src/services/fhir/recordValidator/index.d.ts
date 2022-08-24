import type { FhirBundle } from '../types';
import { RecordType } from '../fhirTypes';
export default function validateBundleForRecordType(recordType: RecordType, fireBundle: FhirBundle): Promise<boolean>;
