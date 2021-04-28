const mongoose      = require('mongoose')

const scoreSchema   = new mongoose.Schema({
    userId: String,
    userName: String,
    userThumbnail: String,
    titleId: String,
    quizLength : Number,
    score: Number,
    title: String,
    cat: String,
    examType: String,
    comment: [
        
        {
            msg:String,
            userName : String,
            userThumbnail: String,
            timeStamp: Date
        }
        
    ],
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "users"
        }
    ],
    Scoredate: Date, 
})


const Score     = mongoose.model('score', scoreSchema)

module.exports = Score;