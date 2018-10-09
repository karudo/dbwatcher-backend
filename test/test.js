const axios = require('axios');

async function main() {
  try {
    const r = await axios.post('http://localhost:4242/rpc', {
      method: 'test',
      args: {qwe: 9}
    });
    console.log(r)
  } catch (e) {
    console.log(e)
  }
}
main();
