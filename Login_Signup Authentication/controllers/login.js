const Users=require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds=10;
module.exports.postLogin=async (req,res, next)=>{
     const{username, password}=req.body
    if(username===req.session.username && password===req.session.password){
       return res.redirect('/profile')
    }
    
   
    try {
         let user=await Users.findOne({username})
         if(!user){
            req.flash('msg', "Incorrect Username")
            return res.redirect('/login')
         }
         bcrypt.compare(password, user.password).then(function(result) {
    // result == true
          if(!result){
            req.flash('msg', "Password Incorrect")
           return res.redirect('/login')
           }
        else{ req.session.username=user.username,
           req.session.password=user.password
           return res.redirect('/profile')}
});
           
          
    } catch (error) {
        next(error)
    }
    
}

module.exports.getLogin=(req, res)=>{
     res.render('login', {
        msg: req.flash('msg')
    })
}