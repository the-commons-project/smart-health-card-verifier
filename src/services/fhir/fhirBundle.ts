import * as utils from '../../utils/utils'
import { ErrorCode } from '../error'
import { validateSchema, objPathToSchema } from '../jws/schema'
import fhirSchema from '../../schemas/fhir-schema.json'
import { getPatientDataFromFhir } from './getPatiendDataFromFhir'
import getRecordData from '../fhir/recordParser'
import { getIssuerFromFhir } from '../helpers/getIssuerFromFhir'
import { getIssuerData } from '../helpers/getIssuerData'
/* this entry needs to match with ValidationProfilesFunctions keys */
import { RecordType, getRecordTypeFromPayload, ResourceType } from './fhirTypes'
import validateBundleForRecordType from './recordValidator'

export async function getRecord (payload: JWSPayload): Promise<any>{
  console.log("fhirBundlegetRecord##############################")
  console.log(payload);
  const issuer = getIssuerFromFhir(payload)
  const notFoundIssuer = {
    message: 'Issuer not found'
  }

  const issuerData = await getIssuerData(issuer) || notFoundIssuer
  const { message } = issuerData
  const isIssuerNotFound = message && message === 'Issuer not found'
  if (isIssuerNotFound) {
    issuerData.url = issuer
    issuerData.name = undefined
  }

  const patientData = getPatientDataFromFhir(payload)
  const recordType  = getRecordTypeFromPayload(payload)
  console.log('getRecordTypeFromPayload: ' + recordType )
  const recordEntries = await getRecordData(recordType, payload)

  const document = {
    issuerData,
    patientData,
    recordType,
    recordEntries,
  }
  console.log("fhirBundlegetRecord returning##############################")
  console.log(JSON.stringify( document ))
  return document
}

export function isResourceType( entry: BundleEntry, resourceType: ResourceType ): boolean {
  return ( entry?.resource?.resourceType.toLowerCase() === resourceType.toLowerCase() )
}

export function validate ( recordType: RecordType, fhirBundleJSON: object | undefined): boolean {
  let isFhirBundleValid = false

  if ( typeof fhirBundleJSON !== 'undefined') {
    const fhirBundle = fhirBundleJSON as FhirBundle
    console.info("fireBundleValidate1 ====\r\n" + JSON.stringify( fhirBundle ) );

    if ( fhirBundle ) {
      isFhirBundleValid = validateFhirBundle(fhirBundle)
    }
    if (!isFhirBundleValid) {
      return false
    }

    // Validate each resource of .entry[]
    for (const [index, entry] of fhirBundle.entry.entries()) {
      validateFhirBundleEntry(entry, index)
      console.info("fireBundleValidate2 ====");


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
       console.info("fireBundleValidate3======");

      // with Bundle.entry.fullUrl populated with short resource-scheme URIs (e.g., {'fullUrl': 'resource:0})
      if (typeof entry.fullUrl !== 'string' || !/resource:\d+/.test(entry.fullUrl)) {
        console.log(
          'fhirBundle.entry.fullUrl should be short resource-scheme URIs (e.g., {"fullUrl": "resource:0"}',
          ErrorCode.FHIR_SCHEMA_ERROR,
        )
      }
    }
    console.info("fireBundleValidate =====(RecordType: "+recordType +") " + JSON.stringify( fhirBundle ));
    return validateBundleForRecordType( recordType, fhirBundle )
      
  }
  return false
}

function validateFhirBundle (fhirBundle: FhirBundle) {
  console.info("validateFhirBundle======\r\n" + JSON.stringify( fhirBundle ))
  if (fhirBundle === undefined) {
    console.log('validate: 1.1-----------fhirBundle === undefined')
    console.log('Failed to parse FhirBundle data as JSON.', ErrorCode.JSON_PARSE_ERROR)
    return false
  }

  // failures will be recorded in the console.log
  if (!validateSchema(fhirSchema, fhirBundle)) {
    console.log('validate: 1.2-----------fhirBundle === undefined')
    return false
  }

  // to continue validation, we must have a list of resources in .entry[]
  if (!fhirBundle.entry || !(fhirBundle.entry instanceof Array) || fhirBundle.entry.length === 0) {
    // The schema check above will list the expected properties/type
    console.log( typeof fhirBundle)
    console.log('FhirBundle.entry[] required to continue.', ErrorCode.CRITICAL_DATA_MISSING)
    return false
  }

  return true
}

function validateFhirBundleEntry (entry: any, i: number) {
  const resource = entry.resource
  if (resource == null) {
    console.log(`Schema: entry[${i.toString()}].resource missing`)
  }

  if (!resource.resourceType) {
    console.log(`Schema: entry[${i.toString()}].resource.resourceType missing`)
  }

  if (!(fhirSchema.definitions as Record<string, unknown>)[resource.resourceType]) {
    console.log(
      `Schema: entry[${i.toString()}].resource.resourceType '${String( resource.resourceType )}' unknown`,
    )
  }

  // validateSchema({ $ref: 'https://smarthealth.cards/schema/fhir-schema.json#/definitions/' + resource.resourceType }, resource, ['', 'entry', i.toString(), resource.resourceType].join('/'))
  if (resource.id) {
    console.log(
      `Bundle.entry[${i.toString()}].resource[${String(resource.resourceType)}]\
       should not include .id elements`,
      ErrorCode.FHIR_SCHEMA_ERROR,
    )
  }

  if (resource.meta) {
    // resource.meta.security allowed as special case, however, no other properties may be included on .meta
    if (!resource.meta.security || Object.keys(resource.meta).length > 1) {
      console.log(
        `Bundle.entry[${i.toString()}].resource[${String(resource.resourceType)}].meta \
       should only include .security property with an array of identity assurance codes`,
        ErrorCode.FHIR_SCHEMA_ERROR,
      )
    }
  }

  if (resource.text) {
    console.log(
      `Bundle.entry[${i.toString()}].resource[${String(resource.resourceType)}] \
         should not include .text elements`,
      ErrorCode.FHIR_SCHEMA_ERROR,
    )
  }
}

function validatePropType (propType: string, i: number, path: string[], o: Record<string, unknown>) {
  if (propType === 'CodeableConcept' && o.text) {
    console.log(
      'fhirBundle.entry[' +
        i.toString() +
        ']' +
        '.resource.' +
        path.join('.') +
        ' (CodeableConcept) should not include .text elements',
      ErrorCode.FHIR_SCHEMA_ERROR,
    )
  }

  if (propType === 'Coding' && o.display) {
    console.log(
      'fhirBundle.entry[' +
        i.toString() +
        ']' +
        '.resource.' +
        path.join('.') +
        ' (Coding) should not include .display elements',
      ErrorCode.FHIR_SCHEMA_ERROR,
    )
  }

  if (propType === 'Reference' && o.reference && !/[^:]+:\d+/.test(o.reference as string)) {
    console.log(
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
    // on empty string, empty object, empty array
    (o instanceof Array && o.length === 0) ||
    (typeof o === 'string' && o === '') ||
    (o instanceof Object && Object.keys(o).length === 0)
  ) {
    console.log(
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
