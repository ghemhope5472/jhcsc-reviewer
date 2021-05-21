module.exports = {
    ensureAuthenticated: function(req,res,next) {
        if(req.isAuthenticated()){
            return next();
        }
        
        res.render('user/error');
    },
    ensureAuthenticatedAdmin: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Please login as Admin');
        res.redirect('/admin/login');
    },
    isAdmin: function(req,res,next){
        if(req.user.role === "ADMIN"){
            return next()
        }
        req.flash('error_msg', "Please login in as Admin")
        res.redirect('/admin/login')
    },
    isVerified: function(req,res,next){
        if(req.user.verified === true){
            return next()
        }
        req.flash('error_msg', "Your account is not yet approved by the Admin!")
        res.redirect('/users/not_verified')
    }

}