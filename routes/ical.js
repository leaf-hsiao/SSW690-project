var express = require('express');
var router = express.Router();
var ical = require('node-ical');
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
      var url = user.canvasURL;
      var assi_num = user.assi_num;
      ical.fromURL(url, {}, function (err, data) {
        if (err) console.log(err);
        data.assi_num = assi_num;
        res.json(data);
      });
    }
  })
})


module.exports = router;