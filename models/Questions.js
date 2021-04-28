const mongoose          = require('mongoose')

const questionSchema       = new mongoose.Schema(
    [
        {
            category: String,
            title: String,
            titleId: String,
            question: String,
            question_image: String,
            answer_image:String,
            explanation: String,
            answers: [
                {
                    text: String,
                    correct: Boolean
                
                }
               
            ]
        }
    ]
      
    
);

const Question = mongoose.model('questions', questionSchema);;
module.exports = Question;
