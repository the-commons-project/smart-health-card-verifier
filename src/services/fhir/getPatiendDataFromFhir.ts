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
      const suffixes = ( name.suffix ?? [] ).filter( (i: any) => acceptedSuffix.includes( String(i)) )
      if ( suffixes.length > 0 ) {
        givenNames = `${String(givenNames)} ${String(suffixes.join(' '))}`
      }
      // for( let i  in ( name.suffix ?? [] ) ) {
      //   let s = String( item )
      //   console.log("testing --------------------" + s );
      //   if ( acceptedSuffix.indexOf( s ) >= 0 ) {
      //     givenNames = `${givenNames} ${s}`
      //   }
      // }
      res = `${familyName} / ${givenNames}`
    }
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
  return { 
    names,
    dateOfBirth,
    resourceType:RESOURCE_TYPES.PATIENT
  }
}
