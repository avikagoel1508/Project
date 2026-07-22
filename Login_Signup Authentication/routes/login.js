const path=require('path');
const express = require('express');
const router = express.Router();
const loginController=require('../controllers/login')
router.post('/', loginController.postLogin)

router.get('/', loginController.getLogin)

module.exports = router;