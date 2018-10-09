import express from 'express';
import bodyParser from 'body-parser'
import {createRPC} from './lib/rpc'

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
  }
}));

app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
