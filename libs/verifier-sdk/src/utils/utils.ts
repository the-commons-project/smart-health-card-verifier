export function parseJson<T> (json: string): T | undefined {
    try {
      return JSON.parse(json) as T
    } catch (error) {
      return undefined
    }
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

  
// NOTE: Timezone affects date presentation, so in US it will be 1 day behind,
//       that is why `new Date()` is not needed.
//       Vaccination date in FHIR => "occurrenceDateTime": "2020-12-29"
export const formatFHIRRecordDate = (dateRaw: string): string => {
  let tmpDate = dateRaw

  if ( dateRaw.indexOf('T') > 0 ) {
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
