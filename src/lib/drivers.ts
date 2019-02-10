import {Drivers} from './dbs/manager';
import MongoDriver from './dbs/mongo';

export const drivers: Drivers = {
  mongo: MongoDriver
};
