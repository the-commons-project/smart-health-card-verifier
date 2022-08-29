import { VerifierFactory } from "~/factory/VerifierFactory"
import { IVerifierBaseCls, VerifierInitOption, IVerifierBase, BaseResponse } from "~/types"

class TestVerifier implements IVerifierBase {

    options: VerifierInitOption
    constructor ( options: VerifierInitOption ) {
        this.options = options
    }
    
    canVerify( payloads: string[] ): Promise< IVerifierBase|null > {
        if ( payloads[0] == "1" ) {
            return Promise.resolve( this as IVerifierBase )
        }
        return Promise.reject(null)
    }

    validate(payloads: string[]): Promise< null | BaseResponse > {
        return Promise.resolve(null)
    }
}
test('creates factory', async () => {
    VerifierFactory.register("test", TestVerifier)
    expect( Object.keys( VerifierFactory.getVerifiers()).length ).toBe(1);
  });
  
  