var express = require('express');
var router = express.Router();
var ensureLoggedIn = require('../config/ensureLoggedIn');

//Bring in Models
let User = require('../models/user');

//Render the index page

router.get('/', ensureLoggedIn, (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.json(user);
        }
    })
})


module.exports = router;