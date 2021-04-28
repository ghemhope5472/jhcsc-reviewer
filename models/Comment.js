const mongoose      = require('mongoose')

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    msg: String,
    score:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "score"
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Comment  = mongoose.model('comment', commentSchema)
module.exports = Comment