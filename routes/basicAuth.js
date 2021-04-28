function userAuth(req, res, next) {
    if( req.user == null ) {
        res.status(403)
        return res.send('You need to sign in as Admin')
    }
    next()
}


module.exports = {
    userAuth
}