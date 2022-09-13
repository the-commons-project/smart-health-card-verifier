import './init'
import { validate } from '~/qr'
import { validate as fhirValidate, getRecord } from '~/services/fhir/fhirBundle'
import { getPatientDataFromFhir } from '~/services/fhir/getPatiendDataFromFhir'
import immunizationSuffixData from '__tests__/fixtures/ImmunizationFhirBundle.json'
import fhirData from '__tests__/fixtures/fhir.json'
import suffixImmumnization from '__tests__/fixtures/fhir-with-accepted-suffix.json'
import covid19LabResult from '__tests__/fixtures/covid19LabResult.json'
import notCovid19LabResult from '__tests__/fixtures/notCovid19LabResult.json'
import { RecordType, getRecordTypeFromPayload } from '~/services/fhir/fhirTypes'


it('Verifies incorrectly', async () => {
  expect.assertions(1)
  const data = await validate([''])
  expect(data).toEqual(undefined)
})

it('Verifies name correctly', async () => {
  expect.assertions(2)
  let res = await fhirValidate(RecordType.immunization, fhirData)
  expect(res).toEqual(true)
  res = await fhirValidate(RecordType.immunization, suffixImmumnization)
  expect(res).toEqual(true)
})

it('Shows name correctly', ()=>{
  expect.assertions(2)
  const name = getPatientDataFromFhir(immunizationSuffixData)
  expect(name.names.length ).toEqual( 1 )
  expect(name.names[0]).toEqual( 'TESTPATIENT / ANALYST Jr.')
})

it('Gets correct tag', async()=> {
  expect.assertions(1)
  let res = await getRecord( immunizationSuffixData )
  expect(res.tagKeys.length).toEqual(1)

})

it('Gets proper SHCRecord Type', ()=> {
  expect.assertions(3)
  let recordType = getRecordTypeFromPayload( immunizationSuffixData as JWSPayload );
  expect(recordType).toEqual( RecordType.immunization)
  recordType = getRecordTypeFromPayload( covid19LabResult as JWSPayload );
  expect(recordType).toEqual( RecordType.covid19LabResult)
  recordType = getRecordTypeFromPayload( notCovid19LabResult as JWSPayload );
  expect(recordType).toEqual( RecordType.unknown)
})