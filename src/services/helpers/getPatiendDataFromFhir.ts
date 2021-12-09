import { formatDateOfBirth } from '../utils'
import constants from '../../models/fireFieldConstant'
const { RESOURCE_TYPES } = constants

export const getPatientDataFromFhir = (credential: any): any => {
  const entries = credential?.vc?.credentialSubject?.fhirBundle?.entry

  const patientEntry = entries?.find(
    (entry: any) => entry?.resource?.resourceType === RESOURCE_TYPES.PATIENT,
  ).resource

  let fullName: string = ''
  let dateOfBirth: string = ''

  if ( patientEntry ) {
    const { name, birthDate } = patientEntry
    var names = []
    if ( name ) {
      names = name.map ( (it)=> {
        const familyName = it.family
        const givenNames = it.given?.join(' ')
        fullName = `${familyName} / ${givenNames}`
        return fullName
      })
    }

    dateOfBirth = formatDateOfBirth(birthDate)
  }
  return { names, dateOfBirth }
}
