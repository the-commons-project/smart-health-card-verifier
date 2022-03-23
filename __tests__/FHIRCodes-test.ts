
import { getVaccineCodesHash, loadVaccineCodes, isAcceptedLabResult } from '../src/services/helpers/getFHIRCodes'

it('VaccineCode retrieved Correctly', async () => {
  await loadVaccineCodes()
  let codes = getVaccineCodesHash()
  expect(codes!=null).toEqual(true)
  let res = isAcceptedLabResult("http://loinc.org", "50548-7")
  expect(res).toEqual(true)
  res = isAcceptedLabResult("http://loinc.org", "50548-73")
  expect(res).toEqual(false)
})
