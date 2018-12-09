export type PkType = string | string[]
export type PkScalar = string | number
export type PkValue = PkScalar | {[field: string]: PkScalar};

export type CollectionElementSchemaField = {
  name: string
  notEmpty: boolean
  type: string
  readonly: boolean
}

export type CollectionElementSchema = {
  strong: boolean
  fields: CollectionElementSchemaField[]
  pk: PkType
}
