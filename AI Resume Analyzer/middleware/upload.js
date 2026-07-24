const mongoose=require('mongoose')
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')

    // uploads/ => destination where the pdf is saved
    // we are getting pdf in req.file 
    // after doing console.log(req.file) we came to know about original name and then we named the file as file.originalname with uniqye suffix 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,  uniqueSuffix +'-'  + file.originalname)
  }
})
const upload = multer({ storage });


// this is exporting a middleware which is used in upload.js(routes)
module.exports=upload
