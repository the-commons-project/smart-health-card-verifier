export declare function parseJson<T>(json: string): T | undefined;
export declare function walkProperties(obj: Record<string, unknown>, path: string[], callback: (o: Record<string, unknown>, p: string[]) => void): void;
export declare const formatFHIRRecordDate: (dateRaw: string) => string;
export declare function propPath(object: Record<string, unknown>, path: string): string | undefined;
