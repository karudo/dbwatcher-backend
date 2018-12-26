import {Collection} from '../driverTypes';
import MongoContext from './context';
import {MongoPathInfo} from './types';

const collectionCollection: Collection<MongoContext, MongoPathInfo> = {
  name: 'Collection',
  async getElementSchema (ctx) {
    return {
      strong: false,
      fields: [{
        name: '_id',
        notEmpty: true,
        type: 'objectId',
        readonly: true,
      }],
      pk: '_id',
    }
  },
  parseCollPath (collPath) {
    return Object.assign({}, ...collPath.map(cp => ({[cp.collection]: cp.pk})))
  },
  async query (ctx, pi, params) {
    const coll = ctx.getColl(pi.databases, pi.collections);
    const res = await coll.find().toArray();
    return res
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
  collections: {}
};

export default collectionCollection;
