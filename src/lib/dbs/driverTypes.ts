import {PkValue, CollectionElementSchema} from './collectionElementTypes';

export type CollectionPathInfo = {
  [collName: string]: PkValue
}

export type DriverSchema = {
  collections: Collection<InstanceContext, CollectionPathInfo>[]
}

export type DriverProp = {
  type: string
  code: string
  name: string
  required?: Boolean
  password?: Boolean
  default?: number | string
}

export type CollPath = {
  collection: string
  pk: string
}[]

export type InstanceContext = {
  close (): Promise<void>
}

export type Collection<TContext extends InstanceContext, TPathInfo extends CollectionPathInfo> = {
  name: string
  collections: Collection<TContext, CollectionPathInfo>[]
  parseCollPath (cp: CollPath): TPathInfo
  getElementSchema (ctx: TContext, pathInfo: TPathInfo): Promise<CollectionElementSchema>
  // beforeExec? (ctx: TContext, pi: TPathInfo): Promise<void>
  query (ctx: TContext, pathInfo: TPathInfo, params: object): Promise<object[]>
  count (ctx: TContext, pathInfo: TPathInfo, params: object): Promise<number>
  getByPk (ctx: TContext, pathInfo: TPathInfo, pk: PkValue): Promise<object>
  add (ctx: TContext, pathInfo: TPathInfo, el: object): Promise<PkValue>
  updateByPk (ctx: TContext, pathInfo: TPathInfo, pk: PkValue, update: object): Promise<number>
  deleteByPk (ctx: TContext, pathInfo: TPathInfo, pk: PkValue): Promise<number>
}

export type DriverInstanceConstructor<TContext extends InstanceContext> = {
  new (params: object): DriverInstance<TContext>
}

export type DriverInstance<TContext extends InstanceContext> = {
  connect (): Promise<TContext>
  getSchema (): Promise<DriverSchema>
  close (): Promise<boolean>
}

export type DriverMain<TContext extends InstanceContext> = {
  code: string
  name: string
  props: DriverProp[]
  getInstance (params: object): Promise<DriverInstance<TContext>>
}
