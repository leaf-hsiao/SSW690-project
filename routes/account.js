const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
var ensureLoggedIn = require('../config/ensureLoggedIn');

// Init App
const app = express();

//Bring in Models
let User = require('../models/user');

/* Regiser Page */

// Get Register Form
router.get('/register', (req, res) => {
    res.render('login');
});

// Post Register Information
const {
    check,
    validationResult
} = require('express-validator/check');

router.post('/register', [
    check('firstName').isLength({
        min: 1
    }),
    check('email').isEmail(),
    //check('password').notEmpty(),
], (req, res) => {

    /*
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('firstName', 'first name is required').notEmpty();
    req.checkBody('lastName', 'last name is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('email', 'email is not valid').isEmail();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('password2', 'password does not match').equals(password);
    */

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
        res.render('register', {
            errors: errors
        });
    } else {
        let newUser = new User({
            /*
            fistName: firstName,
            lastName: lastName,
            email: email,
            password: password
            */
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            canvasURL: ''
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    console.log(err)
                }
                newUser.password = hash;
                newUser.save((err) => {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        req.flash('You are now registered in DuckMommy and can log in');
                        res.redirect('/account/login');
                    }
                })
            })
        })
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
        }
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
 

/* Login Page */
// Get Login Form
router.get('/login', (req, res) => {
    res.render('login');
})

// Post Login Information
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/account/login',
        failureflasj: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('You are logged out');
    res.redirect('/account/login');
})


/* Settings Page */
// Get Settings Page
router.get('/settings', ensureLoggedIn, (req, res) => {
    res.render('settings', {
        welcome: "Paste your Canvas URL here:"
    })
});

// Post Settings 
router.post('/settings', (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) {
            console.log(err);
            return;
        } else {
            user.canvasURL = req.body.canvasURL;
            user.save((err) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    req.flash('You are now registered in DuckMommy and can log in');
                    res.redirect('/');
                }
            })
        }
    })
});


module.exports = router;