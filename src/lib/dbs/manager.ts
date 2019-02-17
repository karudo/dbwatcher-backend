import {DriverMain, InstanceContext, DriverInstance, DriverSchema, CollPath, CollectionMethods, Collection, CollectionPathInfo} from './driverTypes'
export type Pasture = {
  type: string,
  params: object,
}
export type Pastures = {
  [key: string]: Pasture
}

export type Drivers = {[key: string]: DriverMain<InstanceContext>};

/*
type ConnectedInstance = {
  // instance: DriverInstance<InstanceContext>,
  schema: DriverSchema<InstanceContext>,
  context: InstanceContext,
};
*/
// type Instances = Map<string, Promise<ConnectedInstance>>;
type ConnectedContexts = Map<string, Promise<InstanceContext>>;


export class DriverInstancesManager {
  private readonly pastures: Pastures;
  private drivers: Drivers;
  private instances: ConnectedContexts = new Map();
  constructor (pastures: Pastures, drivers: Drivers) {
    this.pastures = pastures;
    this.drivers = drivers;
  }

  async connect (pasture: Pasture) {
    const instance = await this.drivers[pasture.type].getInstance(pasture.params);
    const context = await instance.connect();
    //const schema = await context.getSchema();
    return context;
  }

  getContext (pastureCode: string): Promise<InstanceContext> {
    const pasture = this.pastures[pastureCode];
    if (!this.instances.has(pasture.type)) {
      this.instances.set(pasture.type, this.connect(pasture))
    }
    return this.instances.get(pasture.type) as Promise<InstanceContext>;
  }

  async runCollectionMethod (pastureCode: string, path: CollPath, method: string, args: object) {
    const ctx = await this.getContext(pastureCode);
    const schema = await ctx.getSchema();
    const collection: Collection<InstanceContext, CollectionPathInfo> = path.reduce(
      (sc, step) => sc.children[step.collection],
      schema as Collection<InstanceContext, CollectionPathInfo>
    );
    const pathInfo = collection.parseCollPath(path);
    return await collection.methods[method as keyof CollectionMethods<InstanceContext, CollectionPathInfo>](ctx, pathInfo, args as any);
  }
}
