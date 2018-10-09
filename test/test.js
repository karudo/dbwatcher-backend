const axios = require('axios');

async function main() {
  try {
    const r = await axios.post('http://localhost:4242/rpc', {
      method: 'testMongo',
      args: {qwe: 9}
    });
    console.log(JSON.stringify(r.data, null, 2))
  } catch (e) {
    console.log(e)
  }
}
main();
