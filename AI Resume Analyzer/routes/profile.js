const path=require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if(!req.user){
        return res.redirect('/login')
    }
    
    res.render('profile',{
        username : req.user.username
    })

});

module.exports = router;