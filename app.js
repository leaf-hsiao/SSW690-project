const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const config = require('./config/database');
mongoose.connect(config.database, {
    useNewUrlParser: true
});

let db = mongoose.connection;

// Check DB connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', (err) => {
    console.log(err)
});

// Init App
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())


//Express Cookie & Session Middleware
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));

// Express Messages Middleware
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});


// Validator
app.use(expressValidator());

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

/*Email Verification*/
app.get('/verify', function (req, res) {
    console.log(req.protocol + ":/" + req.get('host'));
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email.");
        if (req.query.id == rand) {
            console.log("Email is verified.");
            res.end("<h1>The e-mail registered has been successfully verified.");
        } else {
            console.log("Email is not verified.");
            res.end("<h1>Bad Request</h1>");
        }
    } else {
        res.end("<h1>Request is from an unknown source.");
    }
});

// Routes
let indexRouter = require('./routes/index');
let accountRouter = require('./routes/account');
let homeworkRouter = require('./routes/homework');
let ical = require('./routes/ical');
let user = require('./routes/user');

app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/homework', homeworkRouter);
app.use('/ical', ical);
app.use('/user', user);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Duck server started on port ${PORT}!`));