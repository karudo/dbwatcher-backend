import {DriverMain, InstanceContext, DriverInstance, DriverSchema, CollPath, CollectionMethods, Collection, CollectionPathInfo} from './driverTypes'
export type Pastures = {
  [key: string]: {
    type: string,
    params: object,
  }
}

export type Drivers = {[key: string]: DriverMain<InstanceContext>};

type ConnectedInstance = {
  instance: DriverInstance<InstanceContext>,
  schema: DriverSchema<InstanceContext>,
  context: InstanceContext,
};
type Instances = Map<string, ConnectedInstance>;

export class DriverInstancesManager {
  private pastures: Pastures;
  private drivers: Drivers;
  private instances: Instances = new Map();
  constructor (pastures: Pastures, drivers: Drivers) {
    this.pastures = pastures;
    this.drivers = drivers;
  }

  async getInstance (pastureCode: string): Promise<ConnectedInstance> {
    const pasture = this.pastures[pastureCode];
    if (!this.instances.has(pasture.type)) {
      const instance = await this.drivers[pasture.type].getInstance(pasture.params);
      const context = await instance.connect();
      const schema = await context.getSchema();
      this.instances.set(pasture.type, {
        instance,
        schema,
        context,
      })
    }
    return this.instances.get(pasture.type) as ConnectedInstance;
  }

  async runMethod (pastureCode: string, path: CollPath, method: keyof CollectionMethods<InstanceContext, CollectionPathInfo>, ...args: any[]) {
    const i = await this.getInstance(pastureCode);
    const collection: Collection<InstanceContext, CollectionPathInfo> = path.reduce((sc, step) => {
      return sc.collections[step.collection]
    }, i.schema as Collection<InstanceContext, CollectionPathInfo>);
    const pathInfo = collection.parseCollPath(path);
    console.log(pathInfo)
    // @ts-ignore
    return await collection[method](i.context, pathInfo, ...args);
  }
}
