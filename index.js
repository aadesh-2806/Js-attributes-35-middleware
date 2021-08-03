const express = require('express');
const app = express();
//
const morgan = require('morgan');
//
const AppError = require('./AppError')
/*morgan('tiny');//error
app.use(()=>{
    console.log('it works every time');
})
app.use(morgan('tiny'))//give static code with time
app.use((req,res,next) =>{//next is argument by middleware
    console.log('Hijacked By My App');//1
    next();//at last
    console.log('Hijacked By My App after next');//3
})
app.use((req,res,next) =>{
    console.log('Hijacked By My App2');//2
    next();
})*/

app.use((req, res, next) => {
    // req.method = 'GET';
    req.requestTime = Date.now()
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) => {     //all run 3
    console.log('I Love Dogs!!');
    next();
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'xyz') {
        next();
    }
    // res.send('Password Needed');
    res.status(401);
    throw new AppError(401, 'Password Needed')
}

/*app.use((req, res, next) => {
    // if(req.path === '/secret')
    const { password } = req.query;
    if (password === 'xyz') {
        next();
    }
    res.send('Sorry you need Password');
    // console.log(req.query);
})
works for all routes*/

app.get('/', (req, res) => {
    res.send(`request time: ${req.requestTime}`);
    res.send('HOME PAGE');
})

app.get('/dogs', (req, res) => {
    res.send(`request time: ${req.requestTime}`);
    res.send('DOGS PAGE');
})

app.use('/error', (req, res) => {
    chicken.fly();
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('khdgfyigdiyg');
})//only this need password

app.use((req, res) => {
    res.status(404).send('Not Found')
    //status give 404 error than not found
    //run when nothing above prints
})

/*app.use((err,req,res,next)=>{
    console.log("************************************************************");
    console.log("**************************ERROR*****************************");
    console.log("************************************************************");
    // res.status(500).send('ERROR!!!');
    next(err);//goes to other middleware
})
or*/

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something Went Wrong' } = err;
    res.status(status).send(message)
})




/*

app.get("products/:id" , async (req,res) => {
    const { id } = req.params;
    const product = await Product.findById( id );
    if(!product){
        next(new AppError('Product Not Found',404));
    }
    res.render('products/show' , {product})
})
or
app.post('/products' , async (req,res,next) => {
    // console.log(req.body);
    try{
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.redirect("/products/:id")
    }
    catch(e){
        next(e);
    }
})//for any error like mongoose
or
function wrapAsync(fn) {
    return function (req,res,next) {
        fn(req,res,next).catch(e=>next(e));
    }
}

app.get("products/:id" , wrapAsync(async (req,res,next) => {
    const { id } = req.params;
    const product = await Product.findById( id );
    if(!product){
        throw new AppError('Product Not Found',404);
    }
    res.render('products/show' , {product})
}))//to avoid try catch everywhere

if above one does not give error than the below one give else it will change status and message value defined in apperror class

app.use((err,req,res,next)=>{
    const {status = 500 , message = 'Something Went Wrong'} = err;//if err not define
    res.status(status.send(message));
})

*/

app.listen(3000, () => {
    console.log("Serving on Port 3000");
})