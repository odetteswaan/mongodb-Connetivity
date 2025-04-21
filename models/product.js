const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database")

class Product {
  constructor(title, imageUrl, price, description, _id) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this._id =_id ?new ObjectId(_id):null
  }
  save() {
    const db = getDb();
    let dbOp;
    console.log(this._id)
    if (this._id) {
      dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this })
    }
    else {
      dbOp = db.collection('products').insertOne(this)
    }
    return dbOp
      .then(results => {
        console.log(results)
      })
      .catch(err => console.log(err))
  }

  static fetchAll() {
    const db = getDb()
    return db.collection('products').find().toArray()
      .then(results => {
        return results
      })
      .catch(err => console.log(err))
  }
  static findById(id) {

    const db = getDb()
    return db.collection('products').find({ _id: new ObjectId(id) }).toArray().then(product => {
      console.log(product)
      return product
    })
      .catch(err => console.log(err))

  }
  static DeleteById(ProdId){
    const db=getDb();
   return db.collection('products').deleteOne({_id:new ObjectId(ProdId)})
    .then(results=>{
      console.log('Deleted !!!')
    })
    .catch(err=>console.log(err))
  }
}

module.exports = Product