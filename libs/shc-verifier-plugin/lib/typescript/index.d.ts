import type { IVerifierBase, VerifierInitOption } from 'verifier-sdk';
export declare class SHCVerifier implements IVerifierBase {
    option: VerifierInitOption;
    constructor(option: VerifierInitOption);
    canVerify(payloads: string[]): Promise<IVerifierBase | null>;
}
