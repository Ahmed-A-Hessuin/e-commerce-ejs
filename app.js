const express = require('express')
const app = express()
const path = require('path')
const flash = require('connect-flash')
app.use(flash())

//Session and SessionStore
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session)
const STORE = new SessionStore({
    uri: "mongodb://localhost:27017/onlineShop",
    collection: 'sessions'
})
app.use(session({
    secret: 'process.env.EXPRESS_SESSION_SECRET',
    saveUninitialized: false,
    store: STORE
}))


//Serving static files in Express
app.use(express.static(path.join(__dirname, "static")))
app.use(express.static(path.join(__dirname, "images")))

// use template engine
app.set('view engine', 'ejs')
app.set('views', 'views')


app.get('/error', (req, res, next) => {
    res.status(500)
    res.redirect('/error', {
        isUser: req.session.userId
    })
})




//all Routes
const homeRouter = require('./routes/home')
const productRouter = require('./routes/product')
const authRouter = require('./routes/auth')
const cartRouter = require('./routes/cart')
const adminRouter = require('./routes/admin')

app.use('/', homeRouter)
app.use('/product', productRouter)
app.use('/', authRouter)
app.use('/cart', cartRouter)
app.use('/admin', adminRouter)


app.listen(3000, () => {
    console.log('server listen on port 3000');
})

