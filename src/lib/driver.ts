type PkType = string | string[]
type PkScalar = string | number
type PkValue = PkScalar | {[field: string]: PkScalar};
// type Context = object;

type CollectionElementSchemaField = {
  name: string
  notEmpty: boolean
  type: string
}

type CollectionElementSchema = {
  strong: boolean
  fields: CollectionElementSchemaField[]
  pk: PkType
}

export type DriverSchema = {
  collections: Collection<object>[]
}

export type DriverProp = {
  type: string
  code: string
  name: string
  required?: Boolean
  password?: Boolean
  default?: number | string
}

export type Collection<Context> = {
  name: string
  getElementSchema (ctx: Context): Promise<CollectionElementSchema>
  query (ctx: Context, params: object): Promise<object[]>
  count (ctx: Context, params: object): Promise<number>
  getByPk (ctx: Context, pk: PkValue): Promise<object>
  add (ctx: Context, el: object): Promise<PkValue>
  updateByPk (ctx: Context, pk: PkValue, update: object): Promise<number>
  deleteByPk (ctx: Context, pk: PkValue): Promise<number>
  collections: Collection<object>[]
}

export type DriverInstanceConstructor<Context> = {
  new (params: object): DriverInstance<Context>
}

export type DriverInstance<Context> = {
  connect (): Promise<Context>
  getSchema (): Promise<DriverSchema>
  close(): Promise<boolean>
}

export function createDriverInstance<Context>(ctor: DriverInstanceConstructor<Context>, params: object): DriverInstance<Context> {
  return new ctor(params)
}

export type DriverMain<Context> = {
  code: string
  name: string
  props: DriverProp[]
  getInstance (params: object): Promise<DriverInstance<Context>>
}
