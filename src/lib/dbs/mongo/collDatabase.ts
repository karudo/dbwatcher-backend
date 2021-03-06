import {Collection} from '../driverTypes';
import MongoContext from './context';
import {MongoPathInfo} from './types';
import collTables from './collTable';

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
  parseCollPath (collPath) {
    return Object.assign({}, ...collPath.map(cp => ({[cp.collection]: cp.pk})))
  },
  children: {
    tables: collTables
  },
  methods: {
    async query (ctx, pi, args) {
      const db = ctx.getDb(pi.databases).admin();
      const list = await db.listDatabases();
      return list.databases.map((i: any) => ({name: i.name}))
    },
    async count (ctx, pi, args) {
      return 0
    },
    async getByPk (ctx, pi, {pk}) {
      return {}
    },
    async add (ctx, pi, {el}) {
      return 0
    },
    async updateByPk (ctx, pi, {pk, update}) {
      return 0
    },
    async deleteByPk (ctx, pi, {pk}) {
      return 0
    },
  },
};

export default databaseCollection;
