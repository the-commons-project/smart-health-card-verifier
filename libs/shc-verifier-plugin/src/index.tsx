import type { IVerifierBase, VerifierInitOption } from 'verifier-sdk'

export class SHCVerifier implements IVerifierBase {
  option: VerifierInitOption
  constructor ( option: VerifierInitOption ) {
    this.option = option
    console.info("SHCVerifier: initialized")
  }
  
  canVerify( payloads: string[] ): Promise< IVerifierBase|null > {
    if ( payloads.length > 0 &&
         payloads[0].length > 4 && 
         payloads[0].startsWith("shc:/")) {
      return Promise.resolve( this )
    }
    return Promise.reject(null)
  }
}
