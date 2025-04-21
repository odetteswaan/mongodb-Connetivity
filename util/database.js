const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient
let _db;
const mongoConnect=callback=>{
MongoClient.connect('mongodb+srv://akash:17082001@cluster0.fo2hosk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(client=>{
  console.log('Connected')
  _db=client.db('Shop')
  callback()
})
.catch(err=>console.log(err))
}
const getDb=()=>{
  if(_db){
    return _db
  }
  throw "unable to Connect database"
}
exports.mongoConnect=mongoConnect
exports.getDb=getDb
