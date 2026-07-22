const path=require('path');
const express = require('express');
const router = express.Router();
const signupcontroller=require('../controllers/signup');

router.get('/', signupcontroller.getSignup);
router.post('/', signupcontroller.postsignup);

module.exports = router;