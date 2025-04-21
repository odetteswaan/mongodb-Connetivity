const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database")

class Product{
  constructor(title,imageUrl,price,description){
    this.title=title;
    this.description=description;
    this.imageUrl=imageUrl;
    this.price=price;
  }
  save(){
const db=getDb();
return db.collection('products').insertOne(this)
.then(results=>{
  console.log(results)
})
.catch(err=>console.log(err))
  }

static fetchAll(){
  const db=getDb()
  return db.collection('products').find().toArray()
  .then(results=>{
    return results
  })
  .catch(err=>console.log(err))
}
static findById(id){

const db=getDb()
return db.collection('products').find({_id:new ObjectId(id)}).toArray().then(product=>{
  console.log(product)
  return product
})
.catch(err=>console.log(err))

}
}

module.exports=Product