const Users=require('../models/user')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const mypassport=require('../auth/passport')

module.exports.getlogin=(req, res)=>{
    if(req.user){
      return res.redirect('/profile')
   }
     res.render('login', {
        msg: req.flash('msg')
    })
}


  
