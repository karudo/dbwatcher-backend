import {MongoClient, Db as MongoDb, Collection as MongoCollection} from 'mongodb'
import {DriverMain, DriverProp, DriverInstance, createDriverInstance, Collection} from '../driver';

const props: DriverProp[] = [
  {
    type: 'string',
    code: 'host',
    name: 'Host',
    required: true,
  },
  {
    type: 'number',
    code: 'port',
    name: 'Port',
    required: true,
    default: 27017,
  },
  {
    type: 'string',
    code: 'db',
    name: 'DB',
  },
];

class MongoContext {
  public client: MongoClient;
  public dbCache: {[key: string]: MongoDb} = {};
  public collCache: {[key: string]: MongoCollection} = {};
  constructor (client: MongoClient) {
    this.client = client
  }
  getDb (name: string) {
    let db = this.dbCache[name];
    if (!db) {
      db = this.client.db(name);
      this.dbCache[name] = db;
    }
    return db;
  }
  getColl (dbName: string, collName: string) {
    const name = `${dbName}_${collName}`;
    let coll = this.collCache[name];
    if (!coll) {
      coll = this.getDb(dbName).collection(collName);
      this.collCache[name] = coll;
    }
    return coll;
  }
}

const databaseCollection: Collection<MongoContext> = {
  name: 'Database',
  async getElementSchema (ctx) {
    return {
      strong: false,
      fields: [{
        name: '_id',
        notEmpty: true,
        type: 'objectId'
      }],
      pk: '_id',
    }
  },
  async query (ctx, params) {
    return []
  },
  async count (ctx, params) {
    return 0
  },
  async getByPk (ctx, pk) {
    return {}
  },
  async add (ctx, el) {
    return 0
  },
  async updateByPk (ctx, pk, update) {
    return 0
  },
  async deleteByPk (ctx, pk) {
    return 0
  },
  collections: []
};

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
      collections: []
    }
  }

  async close () {
    return false
  }
}

const main: DriverMain<MongoContext> = {
  code: 'mongo',
  name: 'Mongo',
  props: props,
  async getInstance (params: object) {
    return createDriverInstance(MongoDriverInstance, params)
  }
};
