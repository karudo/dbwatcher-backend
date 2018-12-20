import {DriverMain, InstanceContext, CollPath} from './driverTypes'
type Pastures = {
  [key: string]: {
    type: string,
    params: object,
  }
}
type Drives = {
  [key: string]: DriverMain<InstanceContext>
}
const pastures: Pastures = {
  mongo1: {
    type: 'mongo',
    params: {
      host: 'localhost',
      port: 27017,
      db: 'qwe',
    },
  }
};
class DriverInstancesManager {
  private pastures: Pastures;
  private drivers: Drives;
  constructor (pastures: Pastures, drivers: Drives) {
    this.pastures = pastures;
    this.drivers = drivers;
  }

  async runMethod (pasture: string, path: CollPath, args: object) {
    const i = await this.drivers[pasture].getInstance({})
    const s = await i.getSchema()
  }
}
