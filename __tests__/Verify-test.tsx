/**
 * @format
 */

import 'react-native'
import React from 'react'

import { validate } from '../src/services/qr'
import { validate as fhirValidate } from '../src/services/jws/fhirBundle'
import { getPatientDataFromFhir } from '../src/services/helpers/getPatiendDataFromFhir'
import suffixData from './fixtures/fhirBundle.json'
const fs = require('fs')
const path = require('path')

it('Verifies incorrectly', async () => {
  expect.assertions(1)
  const data = await validate([''])
  expect(data).toEqual(undefined)
})

it('Verifies name correctly', async () => {
  expect.assertions(2)

  let data = fs.readFileSync(path.join(__dirname, 'fixtures/fhir.txt'), 'utf8')
  let res = fhirValidate(data)
  expect(res).toEqual(true)
  data = fs.readFileSync(path.join(__dirname, 'fixtures/fhir-with-accepted-suffix.txt'), 'utf8')
  res = fhirValidate(data)
  expect(res).toEqual(true)

})

it('Shows name correctly', ()=>{
  expect.assertions(2)
  const name = getPatientDataFromFhir(suffixData)
  expect(name.names.length ).toEqual( 1 )
  expect(name.names[0]).toEqual( 'TESTPATIENT / ANALYST Jr.')
})
