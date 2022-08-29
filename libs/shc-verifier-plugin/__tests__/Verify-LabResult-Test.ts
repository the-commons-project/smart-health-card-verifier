import './init'
import { validate as fhirValidate } from '~/services/fhir/fhirBundle'
import labResultIsValid from '~/services/fhir/recordValidator/labResultValidator' 
import R4Observation from '~/services/fhir/recordValidator/labResultValidator/versions/R4Observation'
import fhirEntries from '__tests__/fixtures/fhirLabResult.json'
import immunizationFhirData from '__tests__/fixtures/ImmunizationFhirBundle.json'
import labResultFhirData from '__tests__/fixtures/covid19LabResult.json'
import { RecordType } from '~/services/fhir/fhirTypes'
import _ from 'lodash'

it('Verifies incorrectly', async () => {
  var res = await labResultIsValid([])
  expect(res).toEqual(false)

  var noPatientRefernce = _.cloneDeep( fhirEntries )
  noPatientRefernce[1].resource!.subject!.reference = "resource:1"
  res = await labResultIsValid( noPatientRefernce );
  expect(res).toEqual(false)
  res = await labResultIsValid( fhirEntries );
  expect(res).toEqual(true)
  var res = await fhirValidate(RecordType.covid19LabResult, labResultFhirData.vc.credentialSubject.fhirBundle)
  expect(res).toEqual(true)
  res = await fhirValidate(RecordType.covid19LabResult, immunizationFhirData.vc.credentialSubject.fhirBundle)
  expect(res).toEqual(false)

})

it('GettingCodeHash', async ()=> {
  const observation = new R4Observation()
  var res = observation.canSupport( fhirEntries[1] )
  var wrongStatusEntry = _.cloneDeep( fhirEntries[1]  )
  wrongStatusEntry.resource.status = "wrong"
  var res = await observation.validate( wrongStatusEntry )
  expect(res).toEqual(false)
})

