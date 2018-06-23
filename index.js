const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('port', process.env.PORT || 4242);
app.use(bodyParser.json());

app.use((req, res) => {
  res.send(`it is working!`);
});

app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
