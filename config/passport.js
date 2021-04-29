const LocalStrategy         = require('passport-local').Strategy;
const passport              = require('passport')
const mongoose              = require('mongoose');
const bcrypt                = require('bcryptjs');
const GoogleStrategy        = require('passport-google-oauth20')
const keys                  = require('./keys')

//Load User Model
const User  = require('../models/User');
const Admin = require('../models/Admin')

module.exports = function( passport ){

    //USER
    passport.use( 'local',
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            //Match User
            User.findOne({email:email})
            .then( user => {
                if(!user){
                    return done(null,false, {message: 'That email is not registered!'});
                }

                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch){
                        return done(null,user);
                    } else{
                        return done(null,false, { message : "Password incorrect!"})
                    }
                });
            })
            .catch( err => console.log(err));
        })
    );

    //serialize and deserialize User session
    passport.serializeUser((user, done)  => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });   




      passport.use(
        new GoogleStrategy({
            
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: 'https://jhcscbleptreview.herokuapp.com/auth/google/redirect' 
        },
        (accessToken, refreshToken, profile, done) => {
    
            User.findOne({googleId: profile.id})
            .then((currentUser) => {
                if(currentUser){
                    console.log('User is ', currentUser)
                    done(null, currentUser)
    
                } else{
                    console.log(profile)
                    new User({
                        name: profile.displayName,
                        
                        googleId: profile.id,
                        thumbnail: profile._json.picture
                        
                        
    
                    }).save()
                    .then((newUser) => {
                        console.log('New user created', newUser)
                        done(null, newUser)
                    })
                }
            })
                
    
    
        })
    )
}





 
