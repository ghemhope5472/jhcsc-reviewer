const mongoose          = require('mongoose')

const UserSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
       
    },
    password: {
        type: String
        
    }, 
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'BASIC'
    },
    verified: {
        type: Boolean,
        default: false
    },
    thumbnail: {
        type: String,
        default: 'https://images2.imgbox.com/f1/66/RUy6P8wz_o.jpg'
    },
   
    googleId: String
});

const User = mongoose.model('User', UserSchema);;
module.exports = User;