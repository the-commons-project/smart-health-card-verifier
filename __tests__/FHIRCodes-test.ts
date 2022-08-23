
import { getVaccineCodesHash, loadVaccineCodes, isAcceptedLabResult, getAcceptedSystemCode } from '../src/helpers/getFHIRCodes'

it('VaccineCode retrieved Correctly', async () => {
  await loadVaccineCodes()
  let codes = getVaccineCodesHash()
  expect(codes!=null).toEqual(true)
  let res:any = isAcceptedLabResult("http://loinc.org", "50548-7")
  expect(res).toEqual(true)
  res = getAcceptedSystemCode("http://loinc.org", "50548-7")
  expect(res['systemKey']).toEqual("LOINC")
})
