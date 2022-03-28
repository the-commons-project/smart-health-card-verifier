import pako from 'pako'
import { Platform } from 'react-native'
import { getUniqueId, getBundleId } from 'react-native-device-info'

import { v5 as uuidv5 } from 'uuid'
import { uuidNamespace } from '../services/constants'

export function parseJson<T> (json: string): T | undefined {
  try {
    return JSON.parse(json) as T
  } catch (error) {
    return undefined
  }
}

// NOTE: Timezone affects date presentation, so in US it will be 1 day behind,
//       that is why `new Date()` is not needed.
//       Birthday date in FHIR => "birthDate": "1960-01-20"
export const formatDateOfBirth = (birthDate: string): string => {
  const [year, month, day] = birthDate.split('-')

  const dateOfBirth = `${month}/${day}/${year}`

  return dateOfBirth
}

export const toCamel = ( s:string ) => {
  return s.trim().replace(/\s+./g, (x)=> x[1].toUpperCase() ).replace(/^(.)(.*)$/, (x, y, z )=>  { return ( y.toLowerCase() + z ) } ) 
}

export const sortRecordByDateField = ( dateFieldName: string, records: any[] ) => {
  records.sort((a, b) => Date.parse(a[dateFieldName]) - Date.parse(b[dateFieldName]))
  // set correct dose number if dose objects are swapped
  for (const [index, rec] of records.entries()) {
    rec.index = index + 1
  }
}
// NOTE: Timezone affects date presentation, so in US it will be 1 day behind,
//       that is why `new Date()` is not needed.
//       Vaccination date in FHIR => "occurrenceDateTime": "2020-12-29"
export const formatFHIRRecordDate = (dateRaw: string): string => {
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

  const [year, month, day] = dateRaw.split('-')
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

export function propPath (object: Record<string, unknown>, path: string): string | undefined {
  const props = path.split('.')
  let val = object

  for (let i = 1; i < props.length; i++) {
    val = val[props[i]] as Record<string, Record<string, unknown>>

    if (val instanceof Array)
      val = val.length === 0 ? val : (val[0] as Record<string, Record<string, unknown>>)
    if (val === undefined) return val
  }

  return val as unknown as string
}

export function walkProperties (
  obj: Record<string, unknown>,
  path: string[],
  callback: (o: Record<string, unknown>, p: string[]) => void,
): void {
  if (obj instanceof Array) {
    for (let i = 0; i < obj.length; i++) {
      const element = obj[i] as Record<string, unknown>

      if (element instanceof Object) {
        walkProperties(element, path.slice(0), callback)
      }
    }

    if (obj.length === 0) callback(obj, path)

    return
  }

  callback(obj, path)

  if (!(obj instanceof Object)) return

  for (const propName in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, propName)) {
      const prop = obj[propName]
      path.push(propName)
      walkProperties(prop as Record<string, unknown>, path.slice(0), callback)
      path.pop()
    }
  }
  
}

// Extracted from https://forums.expo.io/t/constants-installationid-how-to-implement-it-on-your-own/50003/15
export async function getInstallationIdManually () {
  let installationId

  const identifierForVendor = await getUniqueId()
  const bundleIdentifier = await getBundleId()
  installationId = uuidv5(`${bundleIdentifier}-${identifierForVendor}`, uuidNamespace)
  return installationId
}

export async function fetchWithTimeout (url: string, options: any={}, timeout: number, timeoutError: string): Promise<any> {
  
  const controller = new AbortController()
  const   timer        = null
  const timerPromise = new Promise((_, reject) => {
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
