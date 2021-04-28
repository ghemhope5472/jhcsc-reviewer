const express           = require('express')
const router            = express.Router()
const User              = require('../models/User')
const Score              = require('../models/Score')
const bcrypt            = require('bcryptjs')
const passport          = require('passport')
const { ensureAuthenticatedAdmin, isAdmin } = require('../config/auth')

//Login Page
router.get('/login', (req, res) => {
    res.render('admin/login')
})


//Register Page
router.get('/register', (req, res) => {
    res.render('admin/register')
})


//Register Handles
router.post('/register', (req,res)  => {
   const { name, email, password, password2, role } = req.body;
   let verified = true;
   let errors = [];

   //Check required fields
   if( !name || !email || !password || !password2){
       errors.push({msg: "Please fill in all fields!"})
   }

   //Check if the two passwords match
   if( password !== password2){
       errors.push({msg: "Passwords do not match!"})
   }

   //Check pass length
   if( password.length < 6 ){
       errors.push({ msg: "Password should be at least six characters"})
   }

    if( errors.length > 0){
        res.render('register', { 
            errors, 
            name,
            email,
            password,
            password2,
            role
        })
    }else{
        
            //validation passed!
            User.findOne({ email: email})
            .then(user => {
                if(user) {
                        //User exists
                        errors.push({ msg: "Email already exists"})
                        res.render('admin/register', { 
                            errors, 
                            name,
                            email,
                            password,
                            password2,
                            role
                        });
                }else{
                    const newUser = new User({
                        name,email,password,role, verified
                    });
                    

                    //Hash password
                    bcrypt.genSalt(10, (err, salt) =>
                     bcrypt.hash(newUser.password,salt, (err,hash) => {
                        if(err) throw err;
                            // set password to hash
                            newUser.password = hash;
                            //save user
                            newUser.save()
                            .then( user => {
                                req.flash('success_msg', 'Admin Account created! Login now')
                                res.redirect('/admin/login');
                            })
                            .catch( err => console.log(err))

                    }))

                }
            });
    }
    
});


//dashboard Admin
router.get('/dashboard', ensureAuthenticatedAdmin, isAdmin,  (req, res) => {
    res.render('admin/dashboard', { user: req.user}) 
 
})


//return users with verified status of FALSE
router.get('/pending_users', ensureAuthenticatedAdmin, isAdmin, (req,res) => {
  User.find({verified: false, role: "BASIC"}).exec()
  .then( (user) => { 
      res.render('admin/pending_users', { unverified_user:user, user:req.user})
    //   console.log( `user starts here --> ${user}`)
    })
    .catch( err => console.log(err))
})


//return all verified users
router.get('/users_list', ensureAuthenticatedAdmin, isAdmin, (req, res) => {
    User.find({verified: true, role: "BASIC"}).exec()
    .then( (user) => {
        res.render('admin/users_list', {verified_user: user, user: req.user})
    })
    .catch( err => console.log(err))
})


// this router updates the verified status of users to TRUE
router.get('/user/:id', (req,res) => {
    User.findByIdAndUpdate({_id:req.params.id}, {verified: true}, { date: Date.now })
    .then( () => { 
        res.redirect('/admin/pending_users')
        req.flash('success_msg', 'User Approved!');
    })
    .catch( err => console.log(err))
})

// this router deletes a user from a verified list
router.get('/user/:id/delete',  (req,res) => {
    User.findByIdAndUpdate({_id:req.params.id}, {verified: false})
    .then( () => { 
        res.redirect('/admin/users_list')
    })
    .catch( err => console.log(err))
})

//Login Handles
router.post('/login', (req, res, next ) => {
    passport.authenticate('local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true
    })(req,res,next);
})



//manage questions page
router.get('/manage_questions', ensureAuthenticatedAdmin, isAdmin,(req, res) => {
    res.render('admin/manage_questions', {user:req.user})
})




//view users feeds
// /admin/view_user_feeds
router.get('/view_user_feeds', (req,res) => {
    Score.find({})
    .then( (score) => {
        res.render('admin/user_feeds', {score, user: req.user})
        console.log(score)
    })
    .catch( err=>console.log(err))
    
})



//Logout handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are loggedout!');
    res.redirect('/')
})

module.exports = router
