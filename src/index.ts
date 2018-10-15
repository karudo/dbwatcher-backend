import express from 'express';
import bodyParser from 'body-parser'
import {createRPC} from './lib/rpc'
// import {queryMongo} from './lib/mongo/mongo'
import gearJson from 'gear-json'
import {BSON, ObjectID} from 'bson'
const b = new BSON()

const app = express();

app.set('port', process.env.PORT || 4242);
app.use(bodyParser.json());

app.get('/schema', (req, res) => {
  res.json({schema: 'example'});
});

app.post('/rpc', createRPC({
  async test (args) {
    return {
      withArgs: args
    }
  },
  async testMongo (args) {
    const res = {} // await queryMongo();

    return gearJson.packObject(res)
  },
}));

app.post('/bson', bodyParser.raw({type: 'application/bson'}), function (req, res) {
  console.log('hello', b.deserialize(req.body));
  const obj = {eee: new ObjectID(), x: 99};
  const bobj = b.serialize(obj)
  res.type('application/bson')
  res.send(bobj)
});

app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
