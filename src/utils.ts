import pako from 'pako'
import jose from 'react-native-jose'

export function parseJson<T>(json: string): T | undefined  {
  try {
    return JSON.parse(json) as T
  } catch (error) {
    return undefined
  }
}

export const formatDateToUSLocaleWithPaddingZero = (birthDate: string): string => {
  const date = new Date(birthDate)

  const day = ('0' + date.getDate()).slice(-2)
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const year = date.getFullYear()

  const dateOfBirth = `${month}/${day}/${year}`

  return dateOfBirth
}

export const formatVaccinationDate = (dateRaw: string): string => {
  const date = new Date(dateRaw)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // TODO: find better way
  const day = ('0' + date.getDate()).slice(-2)
  // const month = date.toLocaleString('en-us', { month: 'short' })
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()

  const vaccinationDate = `${day} ${month} ${year}`

  return vaccinationDate
}

export function inflatePayload(verificationResult): Buffer {
  // keep typescript happy by extending object with a 'zip' property
  const header = verificationResult.header as {zip: string }
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

export function isOpensslAvailable(): boolean {
  return false
}

export function propPath(object: Record<string, unknown>, path: string): string | undefined {
  const props = path.split('.')
  let val = object

  for (let i = 1; i < props.length; i++) {
    val = val[props[i]] as Record<string, Record<string, unknown>>

    if(val instanceof Array) val = val.length === 0 ? val : val[0] as Record<string, Record<string, unknown>>
    if (val === undefined) return val
  }

  return val as unknown as string
}

export function walkProperties(obj: Record<string, unknown>, path: string[], callback: (o: Record<string, unknown>, p: string[]) => void): void {
  if (obj instanceof Array) {
    for (let i = 0; i < obj.length; i++) {
      const element = obj[i] as Record<string, unknown>

      if (element instanceof Object) {
        walkProperties(element, path.slice(0), callback)
      }
    }

    if(obj.length === 0) callback(obj, path)

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

  return
}
