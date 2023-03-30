const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Product = require("./product database/product");
const User = require('./product database/user');
const Cart = require('./product database/cart');
const Useraccount =  require('./product database/userAccount')
const path = require('path');
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
const Razorpay = require('razorpay');
const {v4:uuid} = require('uuid');
uuid();
const PaymentDetail = require('./product database/payment-detail')
const Oder = require('./product database/order');


var razorPayInstance = new Razorpay({  
    key_id: 'rzp_test_bR5Sj1nDTB4Ppj',  
    key_secret: 'T8O9TnbZmSajstHOx2SCS8sQ'
});


app.use(methodOverride('_method'));
app.use(session({secret: "Shh, its a secret!"}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false })); 

app.set('views',path.join(__dirname,'/views'));
app.set('view engine', 'ejs');

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://0.0.0.0:27017/productList');
    console.log("Connected to Database :: MongoDB")
  }

app.get('/', async (req,res)=>{
    const product = await Product.find({});
    res.render('home.ejs',{product})
})

app.post('/search',async (req,res)=>{  
    const {search} = req.body
    const aa = `${search}`
    const $regex = new RegExp(aa,'i')
    const product = await Product.find({name : {$regex}});
    res.render('search.ejs',{product,search})
    })

app.get('/babyCare',async (req,res)=>{
    const category = await Product.find({category: [ 'babyCare' ]});
    res.render('category.ejs',{category})
})
app.get('/electronics',async (req,res)=>{
    const category = await Product.find({category: [ 'electornics' ]});
    res.render('category.ejs',{category})
})
app.get('/furniture',async (req,res)=>{
    const category = await Product.find({category: [ 'furniture' ]});
    res.render('category.ejs',{category})
})
app.get('/homeEssentials',async (req,res)=>{
    const category = await Product.find({category: [ 'homeEssentials' ]});
    res.render('category.ejs',{category})
})

app.get('/productPage/:n',async(req,res)=>{
    const {n} = req.params;
    const product = await Product.find({name : n});
    res.render('productPage.ejs',{product})
})

app.post('/sort',async(req,res)=>{
    const{sort,search} = req.body;
    const aa = `${search}`

                if(sort === 'Low-High'){
                const $regex = new RegExp(aa,'i')
                const product = await Product.find({name : {$regex}}).sort({price:1});
                res.render('search.ejs',{product,search})
                }

                else if(sort === 'High-Low'){
                    const $regex = new RegExp(aa,'i')
                const product = await Product.find({name : {$regex}}).sort({price:-1});
                res.render('search.ejs',{product,search})
                }
    
                else if(sort === 'Rating'){
                    const $regex = new RegExp(aa,'i')
                const product = await Product.find({name : {$regex}}).sort({rating:1});
                res.render('search.ejs',{product,search})
                }
                
                else if(sort === 'A-Z'){
                const $regex = new RegExp(aa,'i')
                const product = await Product.find({name : {$regex}});
                res.render('search.ejs',{product,search})
                 }
            })      

app.get('/signup',(req,res)=>{
    res.render('signup.ejs')
})

app.post('/signup',async(req,res,next)=>{
    const {username,password} = req.body;
    const hash = await bcrypt.hash(password,10);
    const user = new User({
        username,
        password: hash
    })
    const accountUserName = new Useraccount({username});
    await accountUserName.save();
    await user.save();
    res.redirect('/login')
})

app.get('/login',(req,res)=>{
    res.render('login.ejs')
})

app.post('/login',async (req,res)=>{
    const {username,password} = req.body;
    const user = await User.findOne({username});
    const validPassword = await bcrypt.compare(password,user.password)
    if(validPassword){
        req.session.userid = user.id;
        res.redirect('/user')
    }
})

app.get('/user',async(req,res)=>{
    if(req.session.userid){
        const userAccount = await Useraccount.findOne({})
        res.render('user.ejs',{userAccount})
    }else{
        res.send('please login')
    }
})

app.put('/user/:id',async(req,res)=>{
    const {id} = req.params
    const user = await Useraccount.findByIdAndUpdate(id, req.body);
    res.redirect('/user')
})

app.get('/cart',async(req,res)=>{
    const product = await Cart.find({})
    res.render('cart.ejs',{product})
})

app.post('/cart',async(req,res)=>{
    if(req.session.userid){
        const {quantity,items,price} = req.body
        const item = new Cart({
            quantity,
            items,
            price
        })
        await item.save();
        const product = await Cart.find({})
        res.render('cart.ejs',{product})
    }else{
        res.redirect('/login')
    }
})

app.delete('/delete/:id',async(req,res)=>{
    const {id} = req.params;
  const product = await Cart.findByIdAndRemove(id);
  res.redirect('/cart')
})


app.post('/payment',(req,res)=>{
    const details = req.body;
    res.render('payment.ejs',{details})
})

app.post('/chechout', function(req, res, next) {
	params = {
		amount: req.body.amount * 100,
		currency: "INR",
		receipt: uuid(),
		payment_capture: "1"
	}
	razorPayInstance.orders.create(params)
	.then(async (response) => {
		const razorpayKeyId = 'rzp_test_bR5Sj1nDTB4Ppj'
		// Save orderId and other payment details
        var oderId = response.id;
		const paymentDetail = new PaymentDetail({
			orderId: response.id,
			receiptId: response.receipt,
			amount: response.amount,
			currency: response.currency,
			createdAt: response.created_at,
			status: response.status
		})
		try {
			// Render Order Confirmation page if saved succesfully
			await paymentDetail.save()
            const orderDetails = new Oder({
                item : {name : req.body.name,price : req.body.price },
                amount: response.amount,
                oderId: oderId,
                x: req.body.x
            })
            console.log(req.body)
            await orderDetails.save();
			res.render('checkout.ejs', {
				title: "Confirm Order",
				razorpayKeyId: 'rzp_test_bR5Sj1nDTB4Ppj',
				paymentDetail
			})
		} catch (err) {
			// Throw err if failed to save
			if (err) throw err;
		}
	}).catch((err) => {
		// Throw err if failed to create order
		if (err) throw err;
	})
});

app.post('/verify', async function(req, res, next) {
	body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
	let crypto = require("crypto");
	let expectedSignature = crypto.createHmac('sha256', 'T8O9TnbZmSajstHOx2SCS8sQ')
	.update(body.toString())
	.digest('hex');
    if(expectedSignature === req.body.razorpay_signature) {

        console.log(req.body.razorpay_payment_id,req.body.razorpay_signature,)
        console.log('payment success')
        await Cart.deleteMany({})
        res.redirect('/myorder')
	} else {
        console.log('payment fail')
	}
});

app.get('/myorder',async(req,res)=>{
    if(req.session.userid){
    const order = await Oder.find({})
    res.render('myOrder.ejs',{order})
    }else{
        res.send('please login')
    }
})

app.post('/sessionDistroy',(req,res)=>{
    req.session.userid = null
    res.redirect('/')
})

port = 3000;
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server is Running on port",port);
    }
})