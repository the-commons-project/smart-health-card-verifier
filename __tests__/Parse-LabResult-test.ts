import labResultIsValid from '../src/services/fhir/recordValidator/labResultValidator' 
import R4Observation from '../src/services/fhir/recordParser/labResultParser/versions/R4Observation' 
import fhirEntries from './fixtures/fhirLabResult.json'


it('GettingCodeHash', ()=> {
  const observation = new R4Observation()
  var res = observation.parse( fhirEntries[1] )
  expect(res.performer).not.toEqual("UNKNOWN")
})

