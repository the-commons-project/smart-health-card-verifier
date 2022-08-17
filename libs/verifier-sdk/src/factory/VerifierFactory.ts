import type { VerifierInitOption, IVerifierBase, IVerifierBaseCls } from '~/types'

export class VerifierFactory {
  static Verifiers: Record<string, IVerifierBase> = {}
  static register ( key: string, VerifierCls: IVerifierBaseCls, option: VerifierInitOption  ) {
    if ( !!!this.Verifiers[key] ){
      this.Verifiers[key] = new VerifierCls( option )
    }
  }
  static getVerifiers():Record<string, IVerifierBase>  {
    return this.Verifiers;
  }
}
