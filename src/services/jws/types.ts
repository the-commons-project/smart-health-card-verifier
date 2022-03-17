type JWS = string
type SHC = string

type ParserFunction = (jwsPayload: JWSPayload) => VaccineRecord[] | any | null

type ValidateFunction = (entry: BundleEntry[]) => boolean

interface VaccineRecord {
  dose?: unknown
  lotNumber?: unknown
  vaccinator?: unknown
  vaccineName?: unknown
  vaccinationDate?: unknown
}

interface HealthCard {
  verifiableCredential: JWS[]
}

interface JWSPayload {
  iss: string
  nbf: number
  vc: {
    type: string[]
    credentialSubject: {
      fhirBundle: FhirBundle
    }
  }
}
interface FhirBundle {
  text?: string
  Coding?: { display: unknown }
  CodeableConcept?: { text: unknown }
  meta?: unknown
  id?: unknown
  resourceType: string
  type: string
  entry: BundleEntry[]
}

type Resource = { resourceType: string, meta?: { security?: unknown[] } } & Record<string, unknown>

interface BundleEntry {
  id?: string
  extension?: unknown[]
  modifierExtension?: unknown[]
  link?: string[]
  fullUrl?: string
  resource: Resource
  search?: unknown
  request?: unknown
  response?: unknown
  lotNumber?: unknown
  performer?: unknown

}

interface Schema {
  $schema?: string
  $id?: string
  description?: string
  discriminator?: {
    propertyName: string
    mapping: Record<string, string>
  }
  oneOf?: Array<{ $ref: string }>
  definitions: Record<string, SchemaProperty>
}

interface SchemaProperty {
  properties?: Record<string, SchemaProperty>
  items?: { $ref: string } | { enum: string[] } // SchemaProperty (more general)
  oneOf?: Array<{ $ref: string }> // SchemaProperty[] (more general)
  pattern?: string
  type?: string
  description?: string
  $ref?: string
  additionalProperties?: boolean
  enum?: string[]
  const?: string
}
