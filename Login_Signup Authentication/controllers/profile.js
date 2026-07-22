module.exports.getProfile=(req, res)=>{
    if(req.session.username){
         res.render('profile', {
            username : req.session.username
         })
    }
else{
    res.redirect('/login')
}
}