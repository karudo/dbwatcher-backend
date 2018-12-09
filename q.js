const {MongoClient, ObjectId} = require('mongodb');
const _ = require('lodash');
const BSON = require('bson')

const url = 'mongodb://localhost:27017';

const dbName = 'traktors';

function execQuery(collection, query = {}) {
  return collection.find(query).toArray()
}

async function queryMongo () {
  const client = await MongoClient.connect(url, {useNewUrlParser: true});
  const db = client.db(dbName);
  const collection = db.collection('complexworks');
  const res = await collection.find({}).toArray();
  await client.close();
  return res
}

const b = new BSON

queryMongo().then(x => {
  const d = x[0]._id instanceof ObjectId;
  console.log(d, Object.keys(x[0]).map(k => [k, typeof x[0][k]]))
  const obj = {a: new BSON.ObjectId()} //_.pick(x[0], ['_id'])
  const bobj = BSON.serialize(obj)
  console.log(obj, BSON.deserialize(bobj))
}).catch(e => console.log(e))

