import {MongoClient, Db, Collection} from 'mongodb'
const url = 'mongodb://localhost:27017';

const dbName = 'traktors';

function createClient (): Promise<MongoClient> {
  return new Promise(((resolve, reject) => {
    const client = new MongoClient(url);
    client.connect(function (err) {
      if (err) return reject(err);
      resolve(client)
    })
  }))
}

function execQuery(collection: Collection, query: object = {}) {
  return new Promise(((resolve, reject) => {
    collection.find(query).toArray(function (err, items) {
      if (err) return reject(err);
      resolve(items)
    })
  }))
}

export async function queryMongo () {
  const client = await createClient();
  const db = client.db(dbName);
  const collection = db.collection('complexworks');
  const res = await execQuery(collection);
  return res
}
