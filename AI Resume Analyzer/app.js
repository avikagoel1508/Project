require('dotenv').config()
const flash = require('connect-flash');
const express = require('express');
const app = express();
const mongoose=require('mongoose')
const PORT = 4444;
const session=require('express-session')
const MongoStore = require('connect-mongo').default;
const passport=require('./auth/passport')

app.use(flash());
app.set('view engine', 'hbs');
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.DB_PATH
  })
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res)=>{
  res.redirect('/login')
})


app.use('/login', require('./routes/login'))
app.use('/signup', require('./routes/signup'))
app.use('/profile', require('./routes/profile'))


app.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});


mongoose.connect(process.env.DB_PATH).then(()=>{
app.listen(PORT, () => {
    console.log(`http://localhost:`+PORT);
});
})
