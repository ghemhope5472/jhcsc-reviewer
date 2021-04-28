const router    = require('express').Router();
const passport  = require('passport')
const Score     = require('../models/Score')
const { ensureAuthenticatedAdmin, isAdmin } = require('../config/auth')


//auth login
router.get('/login', (req,res) => {
    res.render('login')
})


//auth with google
router.get('/google', passport.authenticate('google',{
    scope:  ['profile']
}))



//auth logout
router.get('/logout', (req,res) => {
    //handle with passport
    res.send('log out')
})



//cb url
router.get('/google/redirect',passport.authenticate('google'), (req,res) => {
    res.render('user/welcome', {user: req.user})
})



//user dashboard
router.get('/user/dashboard', (req,res) => {
    Score.find({})
    .then( (score) => {
        res.render('user/dashboard', {score, user: req.user})
        console.log(score)
    })
    .catch( err=>console.log(err))
    
})



module.exports = router;