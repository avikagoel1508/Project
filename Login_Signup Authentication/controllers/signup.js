const Users=require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds=10;
module.exports.postSignup= async(req,res, next)=>{
    const{username, password}=req.body
    try {
        let user=await Users.findOne({username})
        if(!user){
            try {
                bcrypt.hash(password, saltRounds).then( async function(hash) {
                  user=await Users.create({username, password: hash})
});
                
         req.session.username=username;
         
        req.flash('msg', "Signup Successful!!")
        return res.redirect('/login')
            } catch  {
                req.flash(
                    'msg', "Signup unsuccessful , Please try again!!!"
                )
                return res.redirect('/signup')
            }
            
        }
        else{
            req.flash('msg', "User already exists try with someother email!")
           return res.redirect('/signup')
        }
    } catch (error) {
        next(error)
    }
   
}
module.exports.getSignup=(req, res)=>{
    res.render('signup', {
        msg: req.flash('msg')
    })
}