const Users=require('../models/user')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const saltRounds=10

module.exports.postsignup=async (req, res, next)=>{
const{email, password}=req.body
try {
    let user=await Users.findOne({email})
    if(!user){
       try {
         bcrypt.hash(password, saltRounds).then(async function(hash) {
       user=await Users.create({email, password:hash})
});
      req.flash({
            msg:'Signup Successful!!'
        })
      return res.redirect('/login') 
       } catch (err) {
        req.flash({
            msg:'Invalid Credentials , try again later!!'
        })
        return res.redirect('/signup')
       } 
    }
    else{
        req.flash({
            msg:'User already exists, use another email instead'
        })
        return res.redirect('/signup')
    }
} catch (err) {
    next(err);
}
}

module.exports.getSignup=(req, res)=>{
    res.render('signup', {
        msg: req.flash('msg')
    })
}

