import type { IVerifierBase, IVerifierBaseCls } from '~/types';
export declare class VerifierFactory {
    static Verifiers: Record<string, IVerifierBase>;
    static register(key: string, VerifierCls: IVerifierBaseCls): void;
    static getVerifiers(): Record<string, IVerifierBase>;
}
//# sourceMappingURL=VerifierFactory.d.ts.map