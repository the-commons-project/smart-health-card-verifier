import './init'
import R4Observation from '~/services/fhir/recordParser/labResultParser/versions/R4Observation' 
import fhirEntries from '__tests__/fixtures/fhirLabResult.json'


describe('matching cities to foods', () => {

  it('GettingCodeHash', async ()=> {
    const observation = new R4Observation()
    var res = observation.parse( fhirEntries[1] )
    expect(res.performer).not.toEqual("UNKNOWN")
    expect( res.systemKey ).toEqual( "LOINC" )
  })
})

