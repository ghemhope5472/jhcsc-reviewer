const express   =  require('express');
const router    =   express.Router();
const Question  = require('../models/Questions')
const QuizTitle = require('../models/QuizTitle')
const { ensureAuthenticatedAdmin, isAdmin } = require('../config/auth')




router.get('/',(req,res) =>{
  res.render('quiz')
})



router.get('/quizTitle/:id', (req, res) => {
    QuizTitle.findById(req.params.id)
    .then( data => {
          res.render('user/quiz', { title: data, user:req.user })
    })
})


//add questions router
router.post("/quiz/addQuestion", (req, res) => {
        let explanation;

        if (req.body.explanation === " ") {
          explanation = "No available explanation";
        } else {
          explanation = req.body.explanation;
        }

        const newQuestion = {
          question: req.body.question,
          question_image: req.body.question_image,
          explanation: explanation,
          answers: [
            { text: `A.  ${req.body.answer[0]} `, correct: req.body.correct[0] , answer_image: req.body.answer_image[0]},
            { text: `B.  ${req.body.answer[0]} `, correct: req.body.correct[1] , answer_image: req.body.answer_image[1]},
            { text: `C.  ${req.body.answer[0]} `, correct: req.body.correct[2], answer_image: req.body.answer_image[2] },
            { text: `D.  ${req.body.answer[0]} `, correct: req.body.correct[3], answer_image: req.body.answer_image[3] },
          ],
        };

        Question.create(newQuestion)
          .then((newQ) => {
            console.log(newQ);
          })
          .catch((err) => console.log(err));
});


//display categories
router.get('/add', (req,res) => {
  res.render('add_new_question')
})



//specific category display
router.get('/general_education', ensureAuthenticatedAdmin, isAdmin, (req, res) => {
  QuizTitle.find({ category: "General Education"}).populate().exec()
  .then( (quizTitle) => {
    res.render('admin/category/general_education', {title: quizTitle, user:req.user})
  })
})

router.get('/prof_education', ensureAuthenticatedAdmin, isAdmin, (req, res) => {
  QuizTitle.find({ category: "Professional Education"}).populate().exec()
  .then( (quizTitle) => {
    res.render('admin/category/prof_education', {title: quizTitle, user:req.user})
  })
})


router.get('/major', ensureAuthenticatedAdmin, isAdmin, (req, res) => {
  QuizTitle.find({ category: "Major"}).populate().exec()
  .then( (quizTitle) => {
    res.render('admin/category/major', {title: quizTitle, user:req.user})
  })
})


//delete title route for gen ed
router.delete('/quiztitle/gen_ed/delete/:id', (req,res) => {
      
  QuizTitle.findByIdAndDelete(req.params.id)
  .then( () =>{
      res.redirect('/quiz/general_education')
  })
  .catch( err=>console.log(err))
})

//delete title route for prof ed
router.delete('/quiztitle/prof_ed/delete/:id', (req,res) => {
      
  QuizTitle.findByIdAndDelete(req.params.id)
  .then( () =>{
      res.redirect('/quiz/prof_education')
  })
  .catch( err=>console.log(err))
})


//delete title route for major 
router.delete('/quiztitle/major/delete/:id', (req,res) => {
      
  QuizTitle.findByIdAndDelete(req.params.id)
  .then( () =>{
      res.redirect('/quiz/major')
  })
  .catch( err=>console.log(err))
})



//add title post route for prof_ed
router.post('/prof_ed/add_title', (req,res) => {
      
      let newTitle = {
        category: req.body.category,
        title: req.body.title
      }

      QuizTitle.create( newTitle )
      .then( (newlyCreatedTitle) => {
        console.log('New title created');
        res.redirect('/quiz/prof_education')
      })
      .catch( err => console.log(err))
})

//add title post route for gen_ed
router.post('/gen_ed/add_title', (req,res) => { 
  let newTitle = {
    category: req.body.category,
    title: req.body.title
  }

  QuizTitle.create( newTitle )
  .then( (newlyCreatedTitle) => {
    console.log('New title created');
    res.redirect('/quiz/general_education')
  })
  .catch( err => console.log(err))
})


//add title post route for major
router.post('/major/add_title', (req,res) => { 
  let newTitle = {
    category: req.body.category,
    title: req.body.title
  }

  QuizTitle.create( newTitle )
  .then( (newlyCreatedTitle) => {
    console.log('New title created');
    res.redirect('/quiz/major')
  })
  .catch( err => console.log(err))
})






//view specific title page
router.get('/category/quiztitle/:id',ensureAuthenticatedAdmin, isAdmin, (req,res) => {
  QuizTitle.findById( req.params.id )
  .then( (foundId) => {
    res.render('admin/questions/quiztitle', {title:foundId, user:req.user})
  })
  .catch(err=>console.log(err))
})


//view add question form to a quiztitle
router.get('/category/quiztitle/:id/addquestion',ensureAuthenticatedAdmin, isAdmin, (req,res)=>{
    QuizTitle.findById( req.params.id)
    .then( (foundTitle) => {
      res.render('admin/questions/add_new_question', { title: foundTitle, success_msg: '', user: req.user})
    })
    .catch(err=> console.log(err))
})


// handle route for adding question to a Quiztitle
router.post('/category/quiztitle/:id/addquestion', ensureAuthenticatedAdmin, isAdmin, (req,res)=>{
  let explanation;

  if(req.body.explanation === " "){
        explanation = "No available explanation"
  }else{
      explanation = req.body.explanation
  }
        const newQuestion =
          {
            category: req.body.category,
            title: req.body.title,
            titleId: req.body.titleId,
            question: req.body.question,
            question_image: req.body.question_image,
            answer_image: req.body.answer_image,
            explanation: explanation,
            answers: [
              { text: `A.  ${req.body.answer[0]} `, correct: req.body.correct[0] },
              { text: `B.  ${req.body.answer[1]} `, correct: req.body.correct[1] },
              { text: `C.  ${req.body.answer[2]} `, correct: req.body.correct[2] },
              { text: `D.  ${req.body.answer[3]} `, correct: req.body.correct[3] }
            ]
          }
        

    QuizTitle.findById(req.params.id)
    .then( (foundTitle) => {
          Question.create(newQuestion)
          .then((question) => {
                foundTitle.questions.push(question)
                foundTitle.save()
                res.render('admin/questions/add_new_question', { title: foundTitle, success_msg: 'Question added successully!', user: req.user})
          })
          .catch( err=>console.log(err))
    })
    .catch( err => console.log(err))
})




// view questions inside quiz title category
router.get('/category/quiztitle/:id/viewquestions', ensureAuthenticatedAdmin,isAdmin, (req,res) =>{
    QuizTitle.findById(req.params.id).populate('questions').exec( function(err, foundTitle){
      if(err){
        console.log(err)
      }else{
        console.log(foundTitle)
        res.render('admin/questions/view_questions_per_category', {questions: foundTitle, user: req.user})
      }
    })
})



//search result
router.get('/search',(req, res)=>{
            console.log(req.query.search)
          if(req.query.search){
            
            const regex = new RegExp(escapeRegex(req.query.search), 'gi');
            console.log(`From regex var ${regex}`)

            Question.find( {question: regex}, (err,foundquestion)=>{
              if(err){
                console.log(err)
              }else{
                console.log(foundquestion)
                res.render('admin/questions/result', { foundquestion, user: req.user, keyword: req.query.search})
              }
            })
          
          }else{
            console.log("Not searching")
          }
})


function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};






//view edit question form
router.get('/category/quiztitle/:titleId/edit_question/:qid',  ensureAuthenticatedAdmin, isAdmin, (req,res) => {
        const quizTitleId = req.params.titleId;

        Question.findById(req.params.qid)
        .then( (question) => {
            res.render('admin/questions/edit_question', {quizTitleId, user:req.user, question})
        })
        .catch( err=>console.log(err))
})


//handle post route on updating question
router.put('/category/quiztitle/:titleId/edit_question/:qid',  ensureAuthenticatedAdmin,isAdmin, (req,res) => {
        let explanation;

        if (req.body.explanation === " ") {
          explanation = "No available explanation";
        } else {
          explanation = req.body.explanation;
        }
        const newQuestion = {
          question: req.body.question,
          question_image: req.body.question_image,
          answer_image: req.body.answer_image,
          explanation: explanation,
          answers: [
            { text: `${req.body.answer[0]} `, correct: req.body.correct[0]  },
            { text: `${req.body.answer[1]} `, correct: req.body.correct[1] },
            { text: `${req.body.answer[2]} `, correct: req.body.correct[2] },
            { text: `${req.body.answer[3]} `, correct: req.body.correct[3] },
          ],
        };
        Question.findByIdAndUpdate(req.params.qid, newQuestion)
          .then( () =>{
                res.redirect('/quiz/category/quiztitle/'+ req.params.titleId +'/viewquestions')
          })
            .catch( err=>console.log(err));  
})



//delete a question
router.delete('/quiztitle/:titleId/question/delete/:id', (req, res) =>{
    
      let titleId = req.params.titleId;
      Question.findByIdAndDelete(req.params.id)
      .then( () => {
            res.redirect('/quiz/category/quiztitle/'+ titleId +'/viewquestions')
      })
      .catch( err=> console.log(err))
})



//delete page
router.get('/category/quiztitle/:id/delete', (req,res) =>{
      QuizTitle.findById(req.params.id)
      .then( title => {
        res.render('admin/category/delete_category', {title, user: req.user})
      })
      .catch(err=>console.log(err))
})



module.exports = router;