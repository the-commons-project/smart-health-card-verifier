import { VerifierFactory, IVerifierBase, VerifierInitOption } from 'verifier-sdk'
import { SHCVerifier } from 'shc-verifier-plugin'
var promiseAny = require('promise.any');

var moduleService: null| ModuleService;

export class ModuleService {

  static getModuleService(): ModuleService{
    moduleService = moduleService || new ModuleService();
    return moduleService;
  }

  initialize( option: VerifierInitOption ): Promise<boolean> {
    VerifierFactory.register( "shc", SHCVerifier, option );
    return Promise.resolve( true )
  }

  getVerifier(payloads: string[] ): Promise< null| IVerifierBase >{
    const verifiers = VerifierFactory.getVerifiers();
    const promises = Object.keys( verifiers ).map((key:string)=>
      verifiers[key].canVerify( payloads )
    );
    return promiseAny(promises)
  }
}
