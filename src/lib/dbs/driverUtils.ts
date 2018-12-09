import {DriverInstance, DriverInstanceConstructor, InstanceContext} from './driverTypes';

export function createDriverInstance<TContext extends InstanceContext>(ctor: DriverInstanceConstructor<TContext>, params: object): DriverInstance<TContext> {
  return new ctor(params)
}
