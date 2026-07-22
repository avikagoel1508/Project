const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  googleID: String,
  googleAccessToken: String,
  githubId: String,
    githubAccessToken: String
});

const usermodel = mongoose.model('User', userSchema);

module.exports=usermodel;
