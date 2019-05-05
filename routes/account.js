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
    check('firstName')
    .matches('^[A-Za-z][A-Za-z0-9-]*$')
    .withMessage('First name can only contain letters, numbers or - , and must begin with letters'),

    check('lastName')
    .matches('^[A-Za-z][A-Za-z0-9-]*$')
    .withMessage('Last name can only contain letters, numbers or - , and must begin with letters'),

    check('email')
    .isEmail()
    .withMessage('Email is not valid'),

    check('password')
    .isLength({
        min: 3
    })
    .withMessage('password must be at least 3 characters'),

    check('password2', 'Passwords do not match').custom((value, {
        req
    }) => (value === req.body.password))

], (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {

        let myerrors = errors.array();
        console.log(myerrors);
        res.render('login', {
            myerrors: myerrors
        });

    } else {
        let newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            canvasURL: '',
            assi_num: '3'
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
                        req.flash('success', 'You are now registered in DuckMommy! Please log in');
                        res.redirect('/account/login');
                    }
                })
            })
        })
        /*
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: 'noreplyduckmommy@gmail.com', // generated ethereal user
                        pass: 'noreplyduckmommy1234' // generated ethereal password
                    },
                    tls: {
                        rejectUnauthorized: false
                    },
                });

                rand = Math.floor((Math.random() * 100) + 54);
                host = req.get('host');
                link = "http://" + req.get('host') + "/verify?id=" + rand;

                // setup email data with unicode symbols
                mailOptions = {
                    from: '"Duck Mommy Test" <noreplyduckmommy.com>', // sender address
                    to: req.body.email, // list of receivers
                    subject: 'Duck Mommy Test, Please confirm your Email account', // Subject line
                    text: 'Welcome to DuckMommy. This is a test mail from Duck Mommy. Thank you for using our services. Have a great Day! DuckMommy Team!', // plain text body  
                    html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                    res.render('login', {
                        msg: 'Email has been sent'
                    });
                });*/
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
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You have signed out');
    res.redirect('/account/login');
})


/* Settings Page */
// Get Settings Page
router.get('/settings', ensureLoggedIn, (req, res) => {
    res.render('settings')
});

// Post Settings 
router.post('/settings', (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) {
            console.log(err);
            return;
        } else {
            user.canvasURL = req.body.canvasURL;
            user.assi_num = req.body.assi_num;
            user.save((err) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    req.flash('success', 'Your information has been updated!');
                    res.redirect('/account/settings');
                }
            })
        }
    })
});


module.exports = router;