

import labResultValide from '../src/services/fhir/recordValidator/labResultValidator' 
import R4Observation from '../src/services/fhir/recordValidator/labResultValidator/systems/R4Observation'
import fhirData from './fixtures/fhirLabResult.json'
import _ from 'lodash'
import { getAcceptedSystemCodes } from '../src/services/helpers/getFHIRCodes'
it('Verifies incorrectly', async () => {
  var res = labResultValide([])
  expect(res).toEqual(false)

  var noPatientRefernce = _.cloneDeep( fhirData )
  noPatientRefernce[1].resource!.subject!.reference = "resource:1"
  res = labResultValide( fhirData );
  expect(res).toEqual(false)
})

it('GettingCodeHash', ()=> {
  const observation = new R4Observation()
  var res = observation.isSystem( fhirData[1] )
  expect(res).toEqual(true)
})

