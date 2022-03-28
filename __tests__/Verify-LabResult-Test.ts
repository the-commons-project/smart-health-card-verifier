

import { validate as fhirValidate } from '../src/services/fhir/fhirBundle'
import labResultIsValid from '../src/services/fhir/recordValidator/labResultValidator' 
import R4Observation from '../src/services/fhir/recordValidator/labResultValidator/versions/R4Observation'
import fhirEntries from './fixtures/fhirLabResult.json'
import immunizationFhirData from './fixtures/ImmunizationFhirBundle.json'
import labResultFhirData from './fixtures/covid19LabResult.json'

import { RecordType } from '../src/services/fhir/fhirTypes'
import _ from 'lodash'

it('Verifies incorrectly', async () => {
  var res = labResultIsValid([])
  expect(res).toEqual(false)

  var noPatientRefernce = _.cloneDeep( fhirEntries )
  noPatientRefernce[1].resource!.subject!.reference = "resource:1"
  res = labResultIsValid( noPatientRefernce );
  expect(res).toEqual(false)
  res = labResultIsValid( fhirEntries );
  expect(res).toEqual(true)
  var res = await fhirValidate(RecordType.covid19LabResult, labResultFhirData.vc.credentialSubject.fhirBundle)
  expect(res).toEqual(true)
  res = await fhirValidate(RecordType.covid19LabResult, immunizationFhirData.vc.credentialSubject.fhirBundle)
  expect(res).toEqual(false)

})

it('GettingCodeHash', ()=> {
  const observation = new R4Observation()
  var res = observation.canSupport( fhirEntries[1] )
  var wrongStatusEntry = _.cloneDeep( fhirEntries[1]  )
  wrongStatusEntry.resource.status = "wrong"
  var res = observation.validate( wrongStatusEntry )
  expect(res).toEqual(false)
})

