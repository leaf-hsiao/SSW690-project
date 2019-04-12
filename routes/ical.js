var express = require('express');
var router = express.Router();
var ical = require('node-ical');

/* GET ical info. */
router.get('/', function (req, res) {
  ical.fromURL('https://sit.instructure.com/feeds/calendars/user_TvB3EwF9kzFKDoNOVqAr9z8kJU8F1tIRvPFK9iqW.ics', {}, function(err, data) {
    if (err) console.log(err);
    res.json(data);
  });
});


module.exports = router;