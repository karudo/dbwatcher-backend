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
  parseCollPath (cp) {
    return {
      database: 'q',
      collection: 's',
    }
  },
  async query (ctx, pi, params) {
    return []
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
  collections: []
};

export default collectionCollection;
