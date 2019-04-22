const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database')
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
    // Local Strategy
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (username, password, done) => {
        // Match Email
        User.findOne({
            email: username
        }, (err, user) => {
            if (err) {
                throw err; //return done(err);
            };
            if (!user) {
                return done(null, false, {
                    message: 'Invalid email/password'
                });
            };

            // Match Password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    throw err; //return done(err);
                }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Invalid email/password'
                    });
                }
            });
        })
    }))

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

}