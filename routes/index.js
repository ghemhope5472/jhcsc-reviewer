const express       = require('express')
const router        = express.Router()
const path          = require('path')
const { ensureAuthenticated } = require('../config/auth')



//Welcome page
router.get('/', (req, res) => {
    res.render('login-select', {user: req.user})
})


//landing
router.get('/login-select', (req, res) => {
    res.render('login-select')
})




//dashboard User
router.get('/dashboard', ensureAuthenticated,  (req, res) => {
    res.render('dashboard', { name: req.user.name})
    console.log(req.user)
})



module.exports = router