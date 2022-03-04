import { formatDateOfBirth } from '../../utils/utils'
import constants from '../../models/FHIRFieldConstant'
const { RESOURCE_TYPES } = constants
const acceptedSuffix = ['Jr.',  'Sr.', 'II', 'III', 'IV']
const resolveName = ( name: any ): string | null  => {
  let res = null
  if ( name.family ) {
    const familyName: string = name.family
    let givenNames: string = ''
    if ( name.given ) {
      givenNames = name.given?.join(' ')
      if ( acceptedSuffix.includes( name.suffix || '') ) {
        givenNames = `${givenNames} ${String( name.suffix)}`
      } 
    }
    res = `${familyName} / ${givenNames}`
  } else if ( name.text ) {
    res = `${String( name.text)}`
  }
  if ( res != null && name.use ){
    res = `${String(res)} (${String(name.use)})`
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
  let names = []

  if ( patientEntry ) {
    const { name, birthDate } = patientEntry
    const nameList = name
    if ( name ) {
      names = nameList.map( (it: any)=> {
        fullName = resolveName( it ) ?? ''
        return fullName
      })
    }

    dateOfBirth = formatDateOfBirth(birthDate)
  }
  return { names, dateOfBirth }
}
