import pako from 'pako'
import { Platform, PixelRatio } from 'react-native'
import { getUniqueId, getBundleId } from 'react-native-device-info'
import { v5 as uuidv5 } from 'uuid'
import { uuidNamespace } from '~/models/constants'


const smallScreenThreshold = 360

export const getIsSmallScreen = ( width: number ) => {
  return ( width / PixelRatio.getFontScale() ) < smallScreenThreshold
}

// NOTE: Timezone affects date presentation, so in US it will be 1 day behind,
//       that is why `new Date()` is not needed.
//       Birthday date in FHIR => "birthDate": "1960-01-20"
export const formatDateOfBirth = (birthDate: string): string => {
  const [year, month, day] = birthDate.split('-')

  const dateOfBirth = `${month}/${day}/${year}`

  return dateOfBirth
}
/* eslint   @typescript-eslint/restrict-plus-operands: "off" */
export const toCamel = ( s: string ) => {
  return s.trim().replace(/\s+./g, (x)=> x[1].toUpperCase() ).replace(/^(.)(.*)$/, (x, y, z )=>  { return ( y.toLowerCase() + z ) } ) 
}

/* eslint   @typescript-eslint/restrict-plus-operands: "off" */
export const toUpper = ( s: string ) => {
  if ( ( s || null ) == null ) {
    return s
  } else if ( s.length <= 1 ) { 
    return s
  }
  return `${s[0].toUpperCase()}${s.substring(1)}`
}


export const isEmpty = ( val: string | null )  => {
  return ( ( typeof val === 'undefined') || val === null || val.length === 0 )
}

// NOTE: Timezone affects date presentation, so in US it will be 1 day behind,
//       that is why `new Date()` is not needed.
//       Vaccination date in FHIR => "occurrenceDateTime": "2020-12-29"
export const formatFHIRRecordDate = (dateRaw: string): string => {
  let tmpDate = dateRaw

  if ( dateRaw.indexOf('T') > 0 ) {
    const options =  {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
      hour12: false }
    const tmp = new Date( dateRaw )
    tmpDate = [ tmp.getFullYear(), ( tmp.getMonth() + 1 ), tmp.getDate() ].join('-')
  }
  const monthShortNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const [year, month, day] = tmpDate.split('-')
  const monthIndex = parseInt(month, 10) - 1 // 08 -> 7
  const monthShortName = monthShortNames[monthIndex]

  const vaccinationDate = `${day} ${monthShortName} ${year}`

  return vaccinationDate
}

export function inflatePayload (verificationResult: {
  header: { zip: string }
  payload: any
}): Buffer {
  // keep typescript happy by extending object with a 'zip' property
  const header = verificationResult.header as { zip: string }
  let payload = verificationResult.payload

  if (header.zip && header.zip === 'DEF') {
    try {
      payload = Buffer.from(pako.inflateRaw(payload))
    } catch (error) {
      throw new Error('Inflate Failed : ' + (error as Error).message)
    }
  }

  return payload
}

export function isOpensslAvailable (): boolean {
  return false
}

// Extracted from https://forums.expo.io/t/constants-installationid-how-to-implement-it-on-your-own/50003/15
export async function getInstallationIdManually () {
  const identifierForVendor = await getUniqueId()
  const bundleIdentifier = await getBundleId()
  const installationId = uuidv5(`${bundleIdentifier}-${identifierForVendor}`, uuidNamespace)
  return installationId
}

export async function fetchWithTimeout (url: string, options: any={}, timeout: number, timeoutError: string): Promise<any> {
  
  const controller = new AbortController()
  const   timer        = null
  const timerPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      controller.abort()
      reject( timeoutError )
    }, timeout)
  })
  return await Promise.race( [fetch( url, {
    ...options,
    signal: controller.signal  
  }), timerPromise ] )
}
