import { formatDateOfBirth } from '../../utils/utils'
import constants from '../../models/FHIRFieldConstant'
const { RESOURCE_TYPES } = constants

const resolveName = ( name: any ): string | null  => {
  let res = null
  if ( name.family ) {
    const familyName = name.family
    const givenNames = name.given?.join(' ')
    res = `${familyName} / ${givenNames}`
  } else if ( name.text ) {
    res = `${name.text}`
  }
  if ( res != null && name.use ){
    res = `${res} (${name.use})`
  }
  return res
}

export const getPatientDataFromFhir = (credential: any): any => {
  const entries = credential?.vc?.credentialSubject?.fhirBundle?.entry

  const patientEntry = entries?.find(
    (entry: any) => entry?.resource?.resourceType === RESOURCE_TYPES.PATIENT,
  ).resource

  let fullName: string = ''
  let dateOfBirth: string = ''

  if ( patientEntry ) {
    const { name, birthDate } = patientEntry
    const nameList = name
    var names = []
    if ( name ) {
      names = nameList.map( (it: any)=> {
        fullName = resolveName( it ) || ''
        return fullName
      })
    }

    dateOfBirth = formatDateOfBirth(birthDate)
  }
  return { names, dateOfBirth }
}
