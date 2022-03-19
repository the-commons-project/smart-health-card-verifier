
import { getVaccineCodesHash, loadVaccineCodes, getAcceptedSystemCodes } from '../src/services/helpers/getVaccineCodesHash'

it('VaccineCode retrieved Correctly', async () => {
  await loadVaccineCodes()
  let codes = getVaccineCodesHash()
  expect(codes!=null).toEqual(true)
  let systemCodes = getAcceptedSystemCodes()
  console.log("systemCodes: " + systemCodes)
  expect(systemCodes.length == 1).toEqual(true)
})
