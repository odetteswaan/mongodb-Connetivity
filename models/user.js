const { ObjectId } = require('mongodb');
const { getDb } = require('../util/database')

class User {
  constructor(username, email, cart, userID) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this.userID = userID;
  }

  static fetchById(id) {
    const db = getDb()
    return db.collection('User').findOne({ _id: new ObjectId(id) })
  }
  addToCart(product) {
    if (this.cart === undefined) {
      const updatedCart = { items: [{ productId: new ObjectId(product[0]._id), quantity: 1 }] }
      const db = getDb();
      db.collection('User').updateOne({ _id: new ObjectId(this.userID) }, { $set: { cart: updatedCart } })
    }
    else {

      const productIndex = this.cart.items.findIndex(p => {
        return product[0]._id.equals(p.productId)
      })
      console.log(productIndex)
      let newQuantity = 1;
      if (productIndex >= 0) {
        // newQuantity = this.cart.items[productIndex].quantity + 1
        // const updatedCart = { items: [{ productId: new ObjectId(product[0]._id), quantity: newQuantity }] };
        this.cart.items[productIndex].quantity+=1;
        const db = getDb();
        db.collection('User').updateOne({ _id: new ObjectId(this.userID) }, { $set: { cart: this.cart } })
      }
      else {
        const updatedCart = { items: [...this.cart.items, { productId: new ObjectId(product[0]._id), quantity: newQuantity }] }
        const db = getDb();
        db.collection('User').updateOne({ _id: new ObjectId(this.userID) }, { $set: { cart: updatedCart } })

      }
    }
  }

}

module.exports = User;
