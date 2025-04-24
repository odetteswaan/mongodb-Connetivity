const Product = require('../models/product');
const User = require('../models/user');
const {getDb}=require('../util/database')
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
  console.log(prodId)
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product[0],
        pageTitle: "product.title",
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
req.user.getCart().then(arr=>{

  let cartArray=[];
  for(let i=0;i<arr.length;i++){
  const cartItem={quantity:req.user.cart.items[i].quantity,id:req.user.cart.items[i].productId,title:arr[i].title};
  cartArray.push(cartItem)
  }
  console.log(cartArray)

  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    products: cartArray
  });
})
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
 Product.findById(prodId).then(product=>{
  req.user.addToCart(product)
 }).then(result=>{
  res.redirect('/cart')
 })
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteCartItem(prodId).then(()=>{
    console.log('Item is deleted')
  }).catch(err=>console.log(err))
 res.redirect('/cart')
};

exports.postOrder = (req, res, next) => {
req.user.addOrder().then(result=>{
  res.redirect('/orders')
})
};

exports.getOrders = (req, res, next) => {
  // req.user
    // .getOrders({include: ['products']})
    // .then(orders => {
    //   res.render('shop/orders', {
    //     path: '/orders',
    //     pageTitle: 'Your Orders',
    //     orders: orders
    //   });
    // })
    // .catch(err => console.log(err));
    req.user.getOrders().then(result=>{
      console.log('==================================')
      const order=[];
      result.map(item=>{
        const Order_id=item._id.toString();
        const product=[]
        item.items.map(prod=>{
            const quantity=prod.quantity;
            const title=prod.title;
            product.push({quantity:quantity,title:title});
        })
        order.push({id:Order_id,products:product})
      })
       res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: order
      });
    })
     

};
