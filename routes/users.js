const express           = require('express')
const router            = express.Router()
const User              = require('../models/User')
const bcrypt            = require('bcryptjs')
const passport          = require('passport')
const Quiztitle         = require('../models/QuizTitle')
const Score             = require('../models/Score')
const { ensureAuthenticatedAdmin, isAdmin,isVerified} = require('../config/auth')
const QuizTitle = require('../models/QuizTitle')

//Login Page
router.get('/login', (req, res) => {
    res.render('login')
})


//Register Page
router.get('/register', (req, res) => {
    res.render('register')
})



//Register Handles
router.post('/register', (req,res)  => {
   const { name, email, password, password2} = req.body;
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
            password2
        })
    }else{
        
            //validation passed!
            User.findOne({ email: email})
            .then(user => {
                if(user) {
                        //User exists
                        errors.push({ msg: "Email already exists"})
                        res.render('register', { 
                            errors, 
                            name,
                            email,
                            password,
                            password2
                        });
                }else{
                    const newUser = new User({
                        name,email,password
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
                                req.flash('success_msg', 'You are now registered! Login now')
                                res.redirect('/users/login');
                            })
                            .catch( err => console.log(err))

                    }))

                }
            });
    }
    
});


//Login Handles
router.post('/login', (req, res, next ) => {
    passport.authenticate('local', {
        successRedirect: '/auth/user/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res,next);
})

//Logout handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are loggedout!');
    res.redirect('/users/login')
})


// view general education category
router.get('/category/general_education', isVerified, (req,res) => {
    Quiztitle.find({ category: "General Education"})
    .then( (title) => {
        res.render('user/gen_ed', { title, user:req.user})
        console.log(title)
    })
    .catch( err => {console.log(err)})
    
})


// view prof education category
router.get('/category/professional_education',isVerified, (req,res) => {
    Quiztitle.find({ category: "Professional Education"})
    .then( (title) => {
        res.render('user/prof_ed', { title, user:req.user})
        console.log(title)
    })
    .catch( err => {console.log(err)})
    
})


// view major  category
router.get('/category/major', isVerified, (req,res) => {
    Quiztitle.find({ category: "Major"})
    .then( (title) => {
        res.render('user/major', { title, user:req.user})
        console.log(title)
    })
    .catch( err => {console.log(err)})
})



//save user score route
router.post('/:userId/title/:titleId', (req, res) => {
    console.log(req.body.stbs)
    const newScore = new Score({
        userId: req.user._id,
        userName: req.user.name,
        userThumbnail: req.user.thumbnail,
        quizLength : req.body.no_of_items,
        titleId: req.params.titleId,
        score: req.body.stbs,
        cat: req.body.cat,
        title: req.body.title,
        examType: "Review",
        Scoredate: Date.now()
    })
    newScore.save( (err,data) =>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/quiz/quizTitle/'+req.params.titleId)
        }
    })
})


//dispplkay score in user dashboard
router.get('/score', (req, res) =>{
    Score.find({userId: req.user.id})
    .then( (score ) => {
        res.render('user/score', { score, user: req.user})
    })
    .catch( err=> console.log(err))
})



//like route
router.put('/like/:id', (req,res) =>{
    Score.findByIdAndUpdate(req.params.id,{
        $push: { likes: req.user._id }
    }, {
        new: true
    }).exec( (err,result) => {
        if(err){
            return res.status(422).json({error: err})
        }else{
            res.redirect('/auth/user/dashboard')
        }
    })
})


//unlike route
router.put('/unlike/:id', (req,res) =>{
    Score.findByIdAndUpdate(req.params.id,{
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).exec( (err,result) => {
        if(err){
            return res.status(422).json({error: err})
        }else{
            res.redirect('/auth/user/dashboard')
        }
    })
})



//add Comment route
router.post('/add/:scoreId', (req ,res ) => {
    let datetoday = new Date;
        Score.findByIdAndUpdate(req.params.scoreId , {
            $push: {
                "comment": {
                    msg: req.body.msg,
                    userName: req.user.name,
                    userThumbnail: req.user.thumbnail,
                    timeStamp: Date.now()
                }
            }
        }).exec( (err,result) => {
            if(err){
                return res.status(422).json({error: err})
            }else{
                res.redirect('/auth/user/dashboard')
            }
        })
      

})


// redirect user when not verified
router.get('/not_verified', (req,res) =>{
    res.render('error/not_verified', {user: req.user})
})




//mock exam
router.get('/mockExam', (req,res) => {
    res.render('user/select_reviewer', {user: req.user})
})


//mock exam for genEd
router.get('/mock_exam/general_education', (req, res) => {
    QuizTitle.find({ category: "General Education"})
    .then( (title) => {
        res.render('user/mock_exam/general_education',{ title, user:req.user })
    })
    .catch( err=>console.log(err))
    
})

//mock exam for profEd
router.get('/mock_exam/professional_education', (req, res) => {
    QuizTitle.find({ category: "Professional Education"})
    .then( (title) => {
        res.render('user/mock_exam/professional_education',{ title, user:req.user })
    })
    .catch( err=>console.log(err))
    
})


//mock exam for major
router.get('/mock_exam/major', (req, res) => {
    QuizTitle.find({ category: "Major"})
    .then( (title) => {
        res.render('user/mock_exam/major',{ title, user:req.user })
    })
    .catch( err=>console.log(err))
    
})


//view mock exam page by category and title
router.get('/mock_exam/title/:id', (req,res) => {
    QuizTitle.findById(req.params.id)
    .then( data => {
          res.render('user/mock_exam/mock', { title: data,  user:req.user  })
    })
})




//save user score in mock exam
router.post('/mock_exam/:userId/title/:titleId', (req, res) => {
        console.log(req.user)
    const newScore = new Score({
        userId: req.user._id,
        userName: req.user.name,
        userThumbnail: req.user.thumbnail,
        quizLength : req.body.no_of_items,
        titleId: req.params.titleId,
        score: req.body.stbs,
        cat: req.body.cat,
        title: req.body.title,
        examType: "Mock Exam",
        Scoredate: Date.now()
    })
    newScore.save( (err,data) =>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/users/mock_exam/title/'+ req.params.titleId)
        }
    })
})

module.exports = router
