import type { VerifierInitOption, IVerifierBase, IVerifierBaseCls } from '~/types';
export declare class VerifierFactory {
    static Verifiers: Record<string, IVerifierBase>;
    static register(key: string, VerifierCls: IVerifierBaseCls, option: VerifierInitOption): void;
    static getVerifiers(): Record<string, IVerifierBase>;
}
