import type { VerifierInitOption, IVerifierBase, IVerifierBaseCls } from '~/types'

export class VerifierFactory {
  static Verifiers: Record<string, IVerifierBase> = {}
  static register ( key: string, VerifierCls: IVerifierBaseCls ) {
    if ( this.Verifiers[key] ){
      const option: VerifierInitOption = {}
      this.Verifiers[key] = new VerifierCls( option )
    }
  }
}
