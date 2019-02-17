import express from 'express';
import bodyParser from 'body-parser'
import {GearJson} from 'gear-json'
import {CollPath} from './lib/dbs/driverTypes'
import {ObjectID} from 'mongodb'
import {DriverInstancesManager} from './lib/dbs/manager';
import {drivers} from './lib/drivers'

const app = express();

app.set('port', process.env.PORT || 4242);
app.use(bodyParser.json());

app.get('/schema', (req, res) => {
  res.json({schema: 'example'});
});

const pastures = require('../config/pastures.json');
const s = new GearJson([{
  type: 'objectid',
  checker: (v: ObjectID) => v.constructor.name.toLowerCase() === 'objectid',
  serialize: (oid: ObjectID) => `${oid}`,
  deserialize: (a: string) => new ObjectID(a)
}]);
const m =  new DriverInstancesManager(pastures, drivers);
app.post('/run-collection-method', async function (req, res) {
  const {pastureCode, path, method, args} = s.unpackObject(req.body) as {pastureCode: string, path: CollPath, method: string, args: object};
  console.log(pastureCode, path, method, args)
  const resp = await m.runCollectionMethod(pastureCode, path, method, args) as object[];
  console.log(resp)
  const bobj = s.packDifferentSchemaCollection(resp);
  res.json(bobj)
});

app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
