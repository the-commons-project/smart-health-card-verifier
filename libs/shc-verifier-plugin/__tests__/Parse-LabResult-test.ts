import { setVerifierInitOption } from '~/models/Config'
import type { SHCVerifierType } from '../src/types'
import R4Observation from '../src/services/fhir/recordParser/labResultParser/versions/R4Observation' 
import fhirEntries from '../../../__tests__/fixtures/fhirLabResult.json'


const labResultSystem = {
    "code": "50548-7",
    "shortDefault": "Molecular Test",
    "display": "Respiratory virus DNA+RNA [Identifier] in Specimen by NAA with probe detection",
    "systemKey": "LOINC",
    "system": "http://loinc.org"
  }

function initializeConfig(){
  const shcOption: SHCVerifierType = {
    sch: {
      useLegacy: ()=>false,
      getIssuer: ()=>[], 
      getAcceptedVaccineCodes: ()=>[221],
      isAcceptedLabResult: ( system:string, code:string )=> false ,
      getAcceptedSystemCode: ( system: string, code: string ) => labResultSystem, 
    }
  }
  setVerifierInitOption( shcOption )
}

describe('matching cities to foods', () => {

  it('GettingCodeHash', async ()=> {
    beforeEach(() => {
      return initializeConfig();
    });
      const observation = new R4Observation()
    var res = observation.parse( fhirEntries[1] )
    expect(res.performer).not.toEqual("UNKNOWN")
    expect( res.systemKey ).toEqual( "LOINC" )
  })
})

