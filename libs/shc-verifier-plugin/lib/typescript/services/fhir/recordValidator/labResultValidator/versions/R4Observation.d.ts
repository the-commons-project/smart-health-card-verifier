import type { ObservationValidator, BundleEntry } from '../../../types';
declare class R4Observation implements ObservationValidator {
    canSupport(entry: BundleEntry): boolean;
    validate(entry: BundleEntry): Promise<boolean>;
}
export default R4Observation;
