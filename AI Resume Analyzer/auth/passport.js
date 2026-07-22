const mypassport=require('passport')
const LocalStrategy=require('passport-local')

const User=require('../models/user')
const GoogleStrategy=require('passport-google-oauth20').Strategy
const GitHubStrategy=require('passport-github2')
//local strategy

mypassport.use(new LocalStrategy(
    {usernameField: 'email',
    passwordField: 'password'},
  async function(email, password, done) {
    let user=await User.findOne({ email: email })
    try {
        if(!user){
            { return done(null, false); }
        }
        return done(null, user)
    } catch (err) {
        return done(err, null)
    }
  }
));

//Google startegy

mypassport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4444/login/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
       let user=await User.findOne({ googleId: profile.id })
       console.log("hEYYY")
    //     console.log("AccessToken:", accessToken)
    // console.log("refreshToken:", refreshToken)
    // console.log("profile:", profile)
       try {
        if(user){
            { return cb(null, user); }
        }
            user=await User.create({
                googleAccessToken: accessToken,
                googleId: profile.id,
               email: profile.emails[0].value
            })
             cb(null, user)
        
    } catch (err) {
        return cb(err, null)
    }
  }
));

//github startegy

mypassport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:4444/login/auth/github/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
     let user=await User.findOne({ githubId: profile.id })
      console.log("githubAccessToken:", accessToken)
    console.log("refreshToken:", refreshToken)
    console.log("profile:", profile)

       try {
        if(user){
            { return done(null, user); }
        }
            user=await User.create({
                githubAccessToken: accessToken,
                githubId: profile.id,
               email: profile.emails[0].value
            })
             done(null, user)
        
    } catch (err) {
        return done(err, null)
    }
  }
//     User.findOrCreate({ githubId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
   
));

mypassport.serializeUser(function(user, done) {
  done(null, user._id);
});

mypassport.deserializeUser(async function(id, done) {
   try {
        let user= await User.findById(id)
         done(null, user);
    } catch (err) {
         done(err, false);
    }
});

module.exports=mypassport