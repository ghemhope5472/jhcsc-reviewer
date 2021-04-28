const mongoose  = require('mongoose')


const QuizTitleSchema = new mongoose.Schema({
    category: String,
    title: String,
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'questions'
        }
    ]
})


const QuizTitle = mongoose.model('quizTitle', QuizTitleSchema)
module.exports = QuizTitle;