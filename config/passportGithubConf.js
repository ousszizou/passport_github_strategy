const passport = require('passport')
const GithubStrategy = require('passport-github').Strategy
const User = require('../models/user-model')
const { github } = require('./config')

passport.use(new GithubStrategy({
    clientID: github.clientID,
    clientSecret: github.clientSecret,
    callbackURL: "/auth/github/cb"
},(accessToken, refreshToken, profile, done) =>{
  // check first if user already exists in our DB.
  User.findOne({githubId: profile.id}).then((currentUser) =>{
    if (currentUser) {
      done(null, currentUser)
    } else {
      const user = new User({
        username: profile.username,
        githubId: profile.id,
        email: profile._json.email
      })
      user.save().then(() => console.log("user saved to DB."))
      done(null, user)
    }
  })
}))

passport.serializeUser((user, done) =>{
  done(null, user.id)
})

passport.deserializeUser((id, done) =>{
  User.findById(id).then((user) =>{
    done(null, user)
  })
})
