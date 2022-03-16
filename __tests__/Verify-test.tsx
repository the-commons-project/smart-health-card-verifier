/**
 * @format
 */

import 'react-native'
import React from 'react'

import { validate } from '../src/services/qr'
import { validate as fhirValidate } from '../src/services/jws/fhirBundle'
import { getPatientDataFromFhir } from '../src/services/helpers/getPatiendDataFromFhir'
import immunizationSuffixData from './fixtures/fhirBundle.json'
import fhirData from './fixtures/fhir.json'
import suffixImmumnization from './fixtures/fhir-with-accepted-suffix.json'
import covid19LabResult from './fixtures/covid19LabResult.json'
import notCovid19LabResult from './fixtures/notCovid19LabResult.json'
import { RecordType, getRecordTypeFromPayload } from '../src/services/jws/fhirTypes'
const fs = require('fs')
const path = require('path')

it('Verifies incorrectly', async () => {
  expect.assertions(1)
  const data = await validate([''])
  expect(data).toEqual(undefined)
})

it('Verifies name correctly', () => {
  expect.assertions(2)
  let res = fhirValidate(RecordType.covid19Immunization, fhirData)
  expect(res).toEqual(true)
  res = fhirValidate(RecordType.covid19Immunization, suffixImmumnization)
  expect(res).toEqual(true)
})

it('Shows name correctly', ()=>{
  expect.assertions(2)
  const name = getPatientDataFromFhir(immunizationSuffixData)
  expect(name.names.length ).toEqual( 1 )
  expect(name.names[0]).toEqual( 'TESTPATIENT / ANALYST Jr.')
})

it('Gets proper SHCRecord Type', ()=> {
  expect.assertions(3)
  let recordType = getRecordTypeFromPayload( immunizationSuffixData as JWSPayload );
  expect(recordType).toEqual( RecordType.covid19Immunization)
  recordType = getRecordTypeFromPayload( covid19LabResult as JWSPayload );
  expect(recordType).toEqual( RecordType.covid19LabResult)
  recordType = getRecordTypeFromPayload( notCovid19LabResult as JWSPayload );
  expect(recordType).toEqual( RecordType.any)
})