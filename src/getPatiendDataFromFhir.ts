import { formatDateToUSLocaleWithPaddingZero } from './utils'

export const getPatientDataFromFhir = (credential: any): any => {
  const entries = credential?.vc?.credentialSubject?.fhirBundle?.entry

  const patientEntry = entries?.find(
    (entry: any) => entry?.resource?.resourceType === 'Patient',
  ).resource

  let fullName: string = ''
  let dateOfBirth: string = ''

  if (patientEntry) {
    const { name, birthDate } = patientEntry

    if (name && name[0]) {
      const familyName = name[0]?.family
      const givenNames = name[0]?.given?.join(' ')

      fullName = `${familyName}/${givenNames}`
    }

    dateOfBirth = formatDateToUSLocaleWithPaddingZero(birthDate)
  }

  return { name: fullName, dateOfBirth }
}
