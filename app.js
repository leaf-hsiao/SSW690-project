const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
//const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');

// Init Nexmo
const nexmo = new Nexmo({
    apiKey: 'c68d9965',
    apiSecret: 'YbfotPqHLx388d8X'
  }, { debug: true });
// Init App
const app = express();

/*Nexmo SMS API and integration*/

// Catch form submit
app.post('/', (req, res) => {
    // res.send(req.body);
    // console.log(req.body);
    const { number, text } = req.body;
  
    nexmo.message.sendSms(
      '16163711547', number, text, { type: 'unicode' },
      (err, responseData) => {
        if(err) {
          console.log(err);
        } else {
          const { messages } = responseData;
          const { ['message-id']: id, ['to']: number, ['error-text']: error  } = messages[0];
          console.dir(responseData);
          // Get data from response
          const data = {
            id,
            number,
            error
          };

            // Emit to the client
            io.emit('smsStatus', data);
        }
    });
});
/*
mongoose.connect('mongodb://localhost/DuckMommyDB', {
    useNewUrlParser: true
});
*/

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.engine('html', ejs.renderFile);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());

app.get('/views', (req, res) => {
    res.render('register');
});

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
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Duck Mommy Test" <noreplyduckmommy.com>', // sender address
      to: req.body.email, // list of receivers
      subject: 'Duck Mommy Test', // Subject line
      text: 'This is a test mail from Duck Mommy.', // plain text body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('register', {msg:'Email has been sent'});
  });
});

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

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
const server = app.listen(PORT, () => console.log(`Duck server started on port ${PORT}!`));