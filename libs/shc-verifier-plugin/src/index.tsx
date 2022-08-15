import type { IVerifierBase, VerifierInitOption } from 'verifier-sdk'

export class SHCVerifier implements IVerifierBase{
  option: VerifierInitOption
  constructor ( option: VerifierInitOption ) {
    this.option = option
    console.info("SHCVerifier: initialized")
  }
  
  canVerify ( payload: string ): boolean {
    return ( payload.length > 4 && payload.startsWith("shc:/"));
  }
}
