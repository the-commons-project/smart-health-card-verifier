import * as utils from '../utils'
import { ErrorCode } from '../error'
import { validateSchema, objPathToSchema } from './schema'
import Log from '../logger'

const log = new Log()
const patientDM = require('../../schemas/patient-dm.json')
const fhirSchema = require('../../schemas/fhir-schema.json')
const immunizationDM = require('../../schemas/immunization-dm.json')

export enum ValidationProfiles {
  'any',
  'usa-covid19-immunization',
}

export class FhirOptions {
  static LogOutputPath = ''
  static ValidationProfile: ValidationProfiles = ValidationProfiles.any
}

export function validate(fhirBundleText: string): any {
  const profile: ValidationProfiles = FhirOptions.ValidationProfile

  if (fhirBundleText.trim() !== fhirBundleText) {
    log.warn(`FHIR bundle has leading or trailing spaces`, ErrorCode.TRAILING_CHARACTERS)
    fhirBundleText = fhirBundleText.trim()
  }

  const fhirBundle = utils.parseJson<FhirBundle>(fhirBundleText)!
  const isFhirBundleValid = validateFhirBundle(fhirBundle)
  if (!isFhirBundleValid) return

  // Validate each resource of .entry[]
  for (const [index, entry] of fhirBundle.entry.entries()) {
    validateFhirBundleEntry(entry, index)

    // walks the property tree of this resource object
    // the callback receives the child property and it's path objPathToSchema() maps a schema property to a property path
    // currently, oneOf types will break this system
    utils.walkProperties(
      entry.resource as unknown as Record<string, unknown>,
      [entry.resource.resourceType],
      (o: Record<string, unknown>, path: string[]) => {
        const propType = objPathToSchema(path.join('.'))
        validatePropType(propType, index, path, o)
      },
    )

    // with Bundle.entry.fullUrl populated with short resource-scheme URIs (e.g., {'fullUrl': 'resource:0})
    if (typeof entry.fullUrl !== 'string' || !/resource:\d+/.test(entry.fullUrl)) {
      log.warn(
        'fhirBundle.entry.fullUrl should be short resource-scheme URIs (e.g., {"fullUrl": "resource:0"}',
        ErrorCode.FHIR_SCHEMA_ERROR,
      )
    }
  }
  return ValidationProfilesFunctions['usa-covid19-immunization'](fhirBundle.entry)
}

function validateFhirBundle(fhirBundle: FhirBundle) {
  if (fhirBundle === undefined) {
    log.warn('Failed to parse FhirBundle data as JSON.', ErrorCode.JSON_PARSE_ERROR)
    return false
  }

  // failures will be recorded in the log
  if (!validateSchema(fhirSchema, fhirBundle)) {
    return false
  }

  // to continue validation, we must have a list of resources in .entry[]
  if (!fhirBundle.entry || !(fhirBundle.entry instanceof Array) || fhirBundle.entry.length === 0) {
    // The schema check above will list the expected properties/type
    log.warn('FhirBundle.entry[] required to continue.', ErrorCode.CRITICAL_DATA_MISSING)
    return false
  }

  return true
}

function validateFhirBundleEntry(entry: any, i: number) {
  const resource = entry.resource
  if (resource == null) {
    log.info(`Schema: entry[${i.toString()}].resource missing`)
  }

  if (!resource.resourceType) {
    log.info(`Schema: entry[${i.toString()}].resource.resourceType missing`)
  }

  if (!(fhirSchema.definitions as Record<string, unknown>)[resource.resourceType]) {
    log.info(
      `Schema: entry[${i.toString()}].resource.resourceType '${resource.resourceType}' unknown`,
    )
  }

  // validateSchema({ $ref: 'https://smarthealth.cards/schema/fhir-schema.json#/definitions/' + resource.resourceType }, resource, ['', 'entry', i.toString(), resource.resourceType].join('/'))
  if (resource.id) {
    log.warn(
      'Bundle.entry[' +
        i.toString() +
        '].resource[' +
        resource.resourceType +
        '] should not include .id elements',
      ErrorCode.FHIR_SCHEMA_ERROR,
    )
  }

  if (resource.meta) {
    // resource.meta.security allowed as special case, however, no other properties may be included on .meta
    if (!resource.meta.security || Object.keys(resource.meta).length > 1) {
      log.warn(
        'Bundle.entry[' +
          i.toString() +
          '].resource[' +
          resource.resourceType +
          '].meta should only include .security property with an array of identity assurance codes',
        ErrorCode.FHIR_SCHEMA_ERROR,
      )
    }
  }

  if (resource.text) {
    log.warn(
      'Bundle.entry[' +
        i.toString() +
        '].resource[' +
        resource.resourceType +
        '] should not include .text elements',
      ErrorCode.FHIR_SCHEMA_ERROR,
    )
  }
}

function validatePropType(propType: string, i: number, path: string[], o: Record<string, unknown>) {
  if (propType === 'CodeableConcept' && o['text']) {
    log.warn(
      'fhirBundle.entry[' +
        i.toString() +
        ']' +
        '.resource.' +
        path.join('.') +
        ' (CodeableConcept) should not include .text elements',
      ErrorCode.FHIR_SCHEMA_ERROR,
    )
  }

  if (propType === 'Coding' && o['display']) {
    log.warn(
      'fhirBundle.entry[' +
        i.toString() +
        ']' +
        '.resource.' +
        path.join('.') +
        ' (Coding) should not include .display elements',
      ErrorCode.FHIR_SCHEMA_ERROR,
    )
  }

  if (propType === 'Reference' && o['reference'] && !/[^:]+:\d+/.test(o['reference'] as string)) {
    log.warn(
      'fhirBundle.entry[' +
        i.toString() +
        ']' +
        '.resource.' +
        path.join('.') +
        ' (Reference) should be short resource-scheme URIs (e.g., {“patient”: {“reference”: “resource:0”}})',
      ErrorCode.SCHEMA_ERROR,
    )
  }

  if (
    // warn on empty string, empty object, empty array
    (o instanceof Array && o.length === 0) ||
    (typeof o === 'string' && o === '') ||
    (o instanceof Object && Object.keys(o).length === 0)
  ) {
    log.warn(
      'fhirBundle.entry[' +
        i.toString() +
        ']' +
        '.resource.' +
        path.join('.') +
        ' is empty. Empty elements are invalid.',
      ErrorCode.FHIR_SCHEMA_ERROR,
    )
  }
}

const ValidationProfilesFunctions = {
  any: function (entries: BundleEntry[]): boolean {
    return true || entries
  },

  'usa-covid19-immunization': function (entries: BundleEntry[]): boolean {
    const profileName = 'usa-covid19-immunization'
    const patients = entries.filter((entry) => entry.resource.resourceType === 'Patient')

    if (patients.length !== 1) {
      log.warn(
        `Profile : ${profileName} : requires exactly 1 ${'Patient'} resource. Actual : ${patients.length.toString()}`,
        ErrorCode.PROFILE_ERROR,
      )
    }

    const immunizations = entries.filter((entry) => entry.resource.resourceType === 'Immunization')

    if (immunizations.length === 0) {
      log.warn(
        `Profile : ${profileName} : requires 1 or more Immunization resources. Actual : ${immunizations.length.toString()}`,
        ErrorCode.PROFILE_ERROR,
      )
    }

    const expectedResources = ['Patient', 'Immunization']

    entries.forEach((entry, index) => {
      if (!expectedResources.includes(entry.resource.resourceType)) {
        log.warn(
          `Profile : ${profileName} : resourceType: ${entry.resource.resourceType} is not allowed.`,
          ErrorCode.PROFILE_ERROR,
        )
        expectedResources.push(entry.resource.resourceType) // prevent duplicate errors
        return
      }

      if (entry.resource.resourceType === 'Immunization') {
        // verify that valid codes are used see : https://www.cdc.gov/vaccines/programs/iis/COVID-19-related-codes.html
        const code = (entry.resource?.vaccineCode as { coding: { code: string }[] })?.coding[0]
          ?.code
        const cvxCodes = ['207', '208', '210', '211', '212']

        if (code && !cvxCodes.includes(code)) {
          log.warn(
            `Profile : ${profileName} : Immunization.vaccineCode.code requires valid COVID-19 code (${cvxCodes.join(
              ',',
            )}).`,
            ErrorCode.PROFILE_ERROR,
          )
        }

        // check for properties that are forbidden by the dm-profiles
        ;(immunizationDM as { path: string }[]).forEach((constraint) => {
          utils.propPath(entry.resource, constraint.path) &&
            log.warn(
              `Profile : ${profileName} : entry[${index.toString()}].resource.${
                constraint.path
              } should not be present.`,
              ErrorCode.PROFILE_ERROR,
            )
        })
      }

      if (entry.resource.resourceType === 'Patient') {
        // check for properties that are forbidden by the dm-profiles
        ;(patientDM as { path: string }[]).forEach((constraint) => {
          utils.propPath(entry.resource, constraint.path) &&
            log.warn(
              `Profile : ${profileName} : entry[${index.toString()}].resource.${
                constraint.path
              } should not be present.`,
              ErrorCode.PROFILE_ERROR,
            )
        })
      }
    })

    return true
  },
}
