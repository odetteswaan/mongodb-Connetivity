const path = require('path');
 
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect=require('./util/database').mongoConnect

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
 User.fetchById('6807aa86b34c023b392c2c59').then(user=>{
  const newuser=new User(user.name,user.email,user.cart,user._id)
  req.user=newuser;
  next()
 })
});

 app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
mongoConnect(()=>{
 // console.log(client)
  app.listen(3000,()=>console.log('Your Port is Running at 3000'))
})

