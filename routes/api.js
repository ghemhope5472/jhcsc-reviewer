const express   = require('express')
const router    = express.Router();
const Question  = require('../models/Questions')
const User      = require('../models/User')
const Quiztitle = require('../models/QuizTitle')
const Score     = require('../models/Score')



//returns all questions
router.get('/questions/v1', (req, res)=> {
    Question.find({})
    .then( (questions) => { 
        res.status(200).send( { questions: questions})
    })
})



//returns all reviewers
router.get('/reviewers/v1', (req, res)=> {
    Quiztitle.find({})
    .then( (quiz) => { 
        res.status(200).send( { quiz: quiz})
    })
})




//returns all scores
router.get('/scores/v1', (req, res)=> {
    Score.find({})
    .then( (scores) => { 
        res.status(200).send( { scores: scores})
    })
})



//returns all questions with specific ID
router.get('/questions/v1/:id', (req, res)=> {
    const apiValue = req.params.id;
    console.log(apiValue)
   Question.find( {titleId: apiValue})
   .then( (questions) =>{
            res.status(200).send( { questions: questions})
   })
   .catch( err=>console.log(err))
    
})



//returns all users false
router.get('/users/v1', (req, res)=> {
    User.find({verified: false, role: "BASIC"}).exec()
    .then((users) => {
            res.status(200).send({users: users})
           
    })
})


//returns all users false
router.get('/users/verified/v1', (req, res)=> {
    User.find({verified: true, role: "BASIC"}).exec()
    .then((users) => {
            res.status(200).send({users: users})
           
    })
})





module.exports = router;