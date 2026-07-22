const path=require('path');
const express = require('express');
const router = express.Router();
const SignpController=require('../controllers/signup')
router.post('/',SignpController.postSignup )
router.get('/',SignpController.getSignup )

module.exports = router;