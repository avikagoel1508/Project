const path=require('path');
const express = require('express');
const router = express.Router();
const logincontroller=require('../controllers/login')
const myPassport=require('../auth/passport')

router.get('/', logincontroller.getlogin);
router.post('/', myPassport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  })

  router.get('/google',
  myPassport.authenticate('google', { scope: ['profile', 'email'] }));


router.get('/auth/google/callback', 
  myPassport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("Reached callback");
    console.log(req.user);
    res.redirect('/profile');
  });


  router.get('/github',
  myPassport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback', 
  myPassport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });
module.exports = router;