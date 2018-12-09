import {Collection} from '../driverTypes';
import MongoContext from './context';
import {MongoPathInfo} from './types';
import collCollection from './collCollection';

const databaseCollection: Collection<MongoContext, MongoPathInfo> = {
  name: 'Database',
  async getElementSchema (ctx) {
    return {
      strong: true,
      fields: [{
        name: 'name',
        notEmpty: true,
        type: 'string',
        readonly: true,
      }],
      pk: 'name',
    }
  },
  parseCollPath (cp) {
    return {
      database: 'q',
      collection: 's',
    }
  },
  async query (ctx, pi, params) {
    const db = ctx.getDb(pi.database).admin();
    const list = await db.listDatabases();
    return list.map((i: any) => ({name: i.name}))
  },
  async count (ctx, pi, params) {
    return 0
  },
  async getByPk (ctx, pi, pk) {
    return {}
  },
  async add (ctx, pi, el) {
    return 0
  },
  async updateByPk (ctx, pi, pk, update) {
    return 0
  },
  async deleteByPk (ctx, pi, pk) {
    return 0
  },
  collections: [collCollection]
};

export default databaseCollection;
