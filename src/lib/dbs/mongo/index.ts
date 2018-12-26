import {MongoClient} from 'mongodb'
import {DriverMain, DriverInstance} from '../driverTypes';
import {createDriverInstance} from '../driverUtils'
import MongoContext from './context';
import driverProps from './driverProps';
import collDatabase from './collDatabase';

type Params = {
  host: string,
  port: number,
  db: string,
}

class MongoDriverInstance implements DriverInstance<MongoContext> {
  private params: Params;
  constructor (params: object) {
    this.params = params as Params;
  }

  async connect () {
    const url = `'mongodb://${this.params.host}:${this.params.port}'`;
    const client = await MongoClient.connect(url, {useNewUrlParser: true});
    return new MongoContext(client)
  }

  async getSchema () {
    return {
      collections: {
        databases: collDatabase,
      },
    }
  }
}

const main: DriverMain<MongoContext> = {
  code: 'mongo',
  name: 'Mongo',
  props: driverProps,
  async getInstance (params: object) {
    return createDriverInstance(MongoDriverInstance, params)
  }
};

export default main;
