import type { IVerifierBase, VerifierInitOption, BaseResponse } from 'verifier-sdk'
import { validate as jwsValidate } from '~/sevices/jws/jws-compact'

interface VerifierType extends VerifierInitOption {
  useLegacy: boolean;
}
export class SHCVerifier implements IVerifierBase {
  options: VerifierType
  constructor ( options: VerifierInitOption ) {
    let defaultOption = {
      useLegacy: false
    }
    this.options = {
      ...defaultOption,
      ...options
    }
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

  validate(payloads: string[]): Promise< null | BaseResponse > {
    return jwsValidate(payloads, this.options.useLegacy )
  }

}
