import type { IVerifierBase, BaseResponse } from 'verifier-sdk';
import type { SHCVerifierType } from './types';
export * from './types';
export declare class SHCVerifier implements IVerifierBase {
    constructor(options: SHCVerifierType);
    canVerify(payloads: string[]): Promise<IVerifierBase | null>;
    validate(payloads: string[]): Promise<null | BaseResponse>;
}
