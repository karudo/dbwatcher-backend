import {Collection as MongoCollection, Db as MongoDb, MongoClient} from 'mongodb';
import {InstanceContext} from '../driverTypes';
import collDatabase from './collDatabase';

export default class MongoContext implements InstanceContext {
  public client: MongoClient;
  public dbMap: Map<string, MongoDb> = new Map<string, MongoDb>();
  public collMap: Map<string, MongoCollection> = new Map<string, MongoCollection>();

  constructor (client: MongoClient) {
    this.client = client
  }

  getDb (name: string): MongoDb {
    if (!this.dbMap.has(name)) {
      const db = this.client.db(name);
      this.dbMap.set(name, db);
    }
    return this.dbMap.get(name) as MongoDb;
  }

  getColl (dbName: string, collName: string): MongoCollection {
    const name = `${dbName}_${collName}`;
    if (!this.collMap.has(name)) {
      const coll = this.getDb(dbName).collection(collName);
      this.collMap.set(name, coll);
    }
    return this.collMap.get(name) as MongoCollection;
   }

  async getSchema () {
    return {
      collections: {
        databases: collDatabase,
      },
    }
  }

   async close () {
    this.dbMap.clear();
    this.collMap.clear();
  }
}
