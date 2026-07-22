const express = require('express');
const app = express();
const path=require('path')
const session = require('express-session')
const port = 4444;
const MongoStore = require('connect-mongo').default;
const mongoose=require('mongoose')

const flash = require('connect-flash');
require('dotenv').config()

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(flash());
app.set('view engine', 'hbs');

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
     mongoUrl: process.env.MONGO_PATH
  })
}))
app.use(express.static(path.join(__dirname, "public")));
app.get('/', (req, res)=>{
    res.redirect('/signup')
})

const loginroute=require('./routes/login')
const signuproute=require('./routes/signup')
const profileroute=require('./routes/profile')


app.use('/signup', signuproute )
app.use('/login',loginroute )

app.use('/profile',profileroute )

app.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
})
mongoose.connect(process.env.MONGO_PATH)
.then(() => {
   app.listen(port, () => {
    console.log(`http://localhost:`+port);
});
})
.catch(err => {
    console.log(err);
})
