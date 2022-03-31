import * as utils from '../../../utils/utils'
import { ErrorCode } from '../../error'
import { getAcceptedVaccineCodes } from '../../helpers/getFHIRCodes'
import immunizationDM from '../../../schemas/immunization-dm.json'
import patientDM from '../../../schemas/patient-dm.json'
import { RecordType } from '../fhirTypes'
const validate: ValidateFunction  = (entries: BundleEntry[])=> {
  const profileName = RecordType.covid19Immunization
  const immunizations = entries.filter((entry) => entry.resource.resourceType === 'Immunization')

  if (immunizations.length === 0) {
    console.log(
      `Profile : ${profileName} : requires 1 or more Immunization resources. Actual : ${immunizations.length.toString()}`,
      ErrorCode.PROFILE_ERROR,
    )
    return false
  }

  const patients = entries.filter((entry) => entry.resource.resourceType === 'Patient')

  if (patients.length !== 1) {
    console.log(
      `Profile : ${profileName} : requires exactly 1 ${'Patient'} resource. Actual : ${patients.length.toString()}`,
      ErrorCode.PROFILE_ERROR,
    )
  }

  const expectedResources = ['Patient', 'Immunization']

  entries.forEach((entry, index) => {
    if (!expectedResources.includes(entry.resource.resourceType)) {
      console.log(
        `Profile : ${profileName} : resourceType: ${entry.resource.resourceType} is not allowed.`,
        ErrorCode.PROFILE_ERROR,
      )
      expectedResources.push(entry.resource.resourceType) // prevent duplicates
      return
    }

    if (entry.resource.resourceType === 'Immunization') {
      // verify that valid codes are used see : https://www.cdc.gov/vaccines/programs/iis/COVID-19-related-codes.html
      const code = (entry.resource?.vaccineCode as { coding: Array<{ code: string }> })?.coding[0]
        ?.code
      const cvxCodes = getAcceptedVaccineCodes() 

      if (code && !cvxCodes.includes(code)) {
        console.log(
          `Profile : ${profileName} : Immunization.vaccineCode.code requires valid COVID-19 code (${cvxCodes.join(
            ',',
          )}).`,
          ErrorCode.PROFILE_ERROR,
        )
      }

      // check for properties that are forbidden by the dm-profiles
      ;(immunizationDM as Array<{ path: string }>).forEach((constraint) => {
        utils.propPath(entry.resource, constraint.path) &&
            console.log(
              `Profile : ${profileName} : entry[${index.toString()}].resource.${
                constraint.path
              } should not be present.`,
              ErrorCode.PROFILE_ERROR,
            )
      })
    }

    if (entry.resource.resourceType === 'Patient') {
      // check for properties that are forbidden by the dm-profiles
      ;(patientDM as Array<{ path: string }>).forEach((constraint) => {
        const tmp = utils.propPath(entry.resource, constraint.path)
        utils.propPath(entry.resource, constraint.path) &&
            console.log(
              `Profile : ${profileName} : entry[${index.toString()}].resource.${
                constraint.path
              } should not be present.`,
              ErrorCode.PROFILE_ERROR,
            )
      })
    }
  })

  return true
}

export default validate
