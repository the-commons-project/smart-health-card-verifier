import { AnySchemaObject } from 'ajv';
import type { KeySet } from './keys';
import type { JWS } from './types';
import type { FhirBundle, JWSPayload, HealthCard, Resource } from '../fhir/types';
export declare function validateSchema(schema: AnySchemaObject, data: FhirBundle | JWS | JWSPayload | HealthCard | KeySet | Resource | undefined, pathPrefix?: string): boolean;
export declare function objPathToSchema(path: string): string;
