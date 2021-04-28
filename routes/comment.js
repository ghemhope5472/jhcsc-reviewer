const express  = require('express')
const router   = express.Router()   
const User     = require('../models/User')
const Score    = require('../models/Score')
const Comment    = require('../models/Comment')


router.get('/', (req,res) =>{
    res.send('Commen routtet')
})


router.post('/add/:scoreId', (req,res) =>{
    
        const newComment = new Comment({
                msg: req.body.msg
        })
       
        newComment.save()
})





module.exports = router
