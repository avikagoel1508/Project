const path=require('path');
const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload=require('../middleware/upload')

const parseController=require('../controllers/resume')

// this line is uploading the pdf  router.post('/upload',upload.single('resume')
router.post('/upload',upload.single('resume'),parseController.uploadResume );

module.exports = router;