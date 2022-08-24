import type { IVerifierBase, BaseResponse } from 'verifier-sdk'
import { validate  as qrValidate } from './qr' 
import type { SHCverifierOption, SHCVerifierType } from './types'
import { setVerifierInitOption } from "./models/Config"
export  * from './types'




export class SHCVerifier implements IVerifierBase {

  constructor ( options: SHCVerifierType ) {
    setVerifierInitOption( options.shc as SHCverifierOption )
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
    return qrValidate( payloads )
  }

}
