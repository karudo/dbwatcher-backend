import {MongoClient} from 'mongodb'
import {DriverMain, DriverInstance} from '../driverTypes';
import {createDriverInstance} from '../driverUtils'
import MongoContext from './context';
import driverProps from './driverProps';
import collDatabase from './collDatabase';

class MongoDriverInstance implements DriverInstance<MongoContext> {
  private params: object;
  constructor (params: object) {
    this.params = params;
  }

  async connect () {
    const client = await MongoClient.connect('url', {useNewUrlParser: true});
    return new MongoContext(client)
  }

  async getSchema () {
    return {
      collections: {
        databases: collDatabase,
      },
    }
  }

  async close () {
    return false
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
