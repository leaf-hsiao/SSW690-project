const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

//Bring in Models
let User = require('../models/user');

/* Regiser Page */

// Get Register Form
router.get('/register', (req, res) => {
    res.render('register');
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
router.get('/settings', (req, res) => {
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
                    res.send("Success Update URL!")
                }
            })
        }
    })
});


// Update Canvas URL - update (TODO!!!)

module.exports = router;