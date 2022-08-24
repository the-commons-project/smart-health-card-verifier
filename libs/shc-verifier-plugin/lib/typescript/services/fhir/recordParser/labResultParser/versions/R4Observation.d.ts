import type { ObservationParser, BundleEntry } from '../../../types';
export default class R4Observation implements ObservationParser {
    parse(entry: BundleEntry): any;
    getPerformerLabel(performers: Array<Record<any, any>> | undefined): string | null;
}
