var express = require('express');
var router = express.Router();
var ical = require('node-ical');
const passport = require('passport');

//Bring in Models
let User = require('../models/user');

//Render the index page
router.get('/', (req, res) => {
  User.findById(req.user._id, (err, user) => {
    if (err) {
      console.log(err);
      return;
    } else {
      var url = user.canvasURL;
      console.log(url);
      ical.fromURL(url, {}, function (err, data) {
        if (err) console.log(err);
        //console.log(1);
        res.json(data);
      });
    }
  })
})
/* GET ical info. 
router.get('/', function (req, res) {
  ical.fromURL('https://sit.instructure.com/feeds/calendars/user_TvB3EwF9kzFKDoNOVqAr9z8kJU8F1tIRvPFK9iqW.ics', {}, function (err, data) {
    if (err) console.log(err);
    res.json(data);
  });
});*/


module.exports = router;