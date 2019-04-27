const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
//const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const nodemailer = require('nodemailer');

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

app.get('/views', (req, res) => {
    res.render('login');
});

var rand,mailOptions,host,link;

//Returned in the terminal.
app.post('/send', (req, res) => {

  console.log(req.body);
    
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'noreplyduckmommy@gmail.com', // generated ethereal user
        pass: 'noreplyduckmommy1234'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    },
  });

  rand=Math.floor((Math.random() * 100) + 54);
  host=req.get('host');
  link="http://"+req.get('host')+"/verify?id="+rand;
    
  // setup email data with unicode symbols
    mailOptions = {
      from: '"Duck Mommy Test" <noreplyduckmommy.com>', // sender address
      to: req.body.email, // list of receivers
      subject: 'Duck Mommy Test, Please confirm your Email account', // Subject line
      text: 'Welcome to DuckMommy. This is a test mail from Duck Mommy. Thank you for using our services. Have a great Day! DuckMommy Team!', // plain text body  
      html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('login', {msg:'Email has been sent'});
});
});

/*Email Verification*/
app.get('/verify',function(req,res){
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email.");
        if(req.query.id==rand)
        {
            console.log("Email is verified.");
            res.end("<h1>The e-mail registered has been successfully verified.");
        }
        else
        {
            console.log("Email is not verified.");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else
    {
        res.end("<h1>Request is from an unknown source.");
    }
    });
    

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

/*
mongoose.connect('mongodb://localhost/DuckMommyDB', {
    useNewUrlParser: true
});
*/

/*Database Connection*/

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
})

// Express Messages Middleware
app.use(require('connect-flash')());
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

// Routes
let indexRouter = require('./routes/index');
let accountRouter = require('./routes/account');
let homeworkRouter = require('./routes/homework');
let ical = require('./routes/ical');

app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/homework', homeworkRouter);
app.use('/ical', ical);




// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Duck server started on port ${PORT}!`));