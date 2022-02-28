
import { getVaccineCodesHash, loadVaccineCodes } from '../src/services/helpers/getVaccineCodesHash'
const fs = require('fs')
const path = require('path')

it('VaccineCode retrieved Correctly', async () => {
  await loadVaccineCodes()
  const codes = getVaccineCodesHash()
  expect(codes!=null).toEqual(true)
})
