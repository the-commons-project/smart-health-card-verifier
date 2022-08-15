const { VerifierFactory } = require('verifier-sdk')
import { SHCVerifier } from 'shc-verifier-plugin'

var moduleService: null| ModuleService;

export class ModuleService {

  static getModuleService(): ModuleService{
    moduleService = moduleService || new ModuleService();
    return moduleService;
  }

  initialize(): Promise<boolean> {
    VerifierFactory.register( "shc", SHCVerifier );
    return Promise.resolve( true )
  }
}
