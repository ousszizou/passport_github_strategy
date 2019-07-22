const router = require('express').Router()
const passport = require('passport')

// auth login
router.get('/signin', (req,res)=>{
    res.render('login', {title: "login page", user: req.user})
})

// auth logout
router.get('/logout', (req,res) =>{
  req.logout()
  res.redirect('/')
})

// auth with github
router.get('/github', passport.authenticate('github', {
  scope: ['user']
}))

router.get('/github/cb', passport.authenticate('github'), (req,res) =>{
  res.redirect('/dashboard')
})

module.exports = router
