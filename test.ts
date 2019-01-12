import {
  Pastures,
  Drivers,
  DriverInstancesManager
} from './src/lib/dbs/manager'

import MongoDriver from './src/lib/dbs/mongo'

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

const drivers: Drivers = {
  mongo: MongoDriver
};

const m =  new DriverInstancesManager(pastures, drivers);
m.runMethod('mongo1', [{collection: 'databases', pk: 'traktors'}, {collection: 'collections', pk: 'users'}], 'query', {}).then(x => {
  console.log(x)
}).catch(e => console.log(e));
