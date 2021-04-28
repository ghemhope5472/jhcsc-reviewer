const express           = require('express')
const expressLayouts    = require('express-ejs-layouts')
const path              = require('path')
const app                = express()
const mongoose          = require('mongoose')
const flash             = require('connect-flash')
const session           = require('express-session')
const passport          = require('passport')
const methodOverride    = require('method-override')




//Passport config
require('./config/passport')(passport);

//DB config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose.connect( db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
.then( () => console.log('Database Connected!'))
.catch( err => console.log(err))

//public folder
app.use(express.static(path.join(__dirname, 'public')))

//method ovveride middelware
app.use(methodOverride('_method'))

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs')

//Body Parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Express Session Middleware
app.use(session({
    secret: 'ghemhope',
    resave: true,
    saveUninitialized: true
  }));

//paspport middleware
app.use(passport.initialize());
app.use(passport.session());

//COnnect Flash
app.use(flash());

//Global Vars
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user_deleted = req.flash('user_deleted');
    res.locals.user_approved = req.flash('user_approve');
    next();
})

//ROUTES
app.use('/', require('./routes/index'))
app.use('/users', (require('./routes/users')))
app.use('/admin', (require('./routes/admin')))
app.use('/auth', (require('./routes/googleAuth')))
app.use('/quiz', (require('./routes/quiz')))
app.use('/api', (require('./routes/api')))
app.use('/comment', (require('./routes/comment')))




const PORT          = process.env.PORT || 5000
app.listen( PORT , () => {
    console.log(`Server started at port ${PORT}`)
})