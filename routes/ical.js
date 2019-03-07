var express = require('express');
var router = express.Router();
var ical = require('node-ical');


/* GET ical info. */
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
ical.fromURL('https://sit.instructure.com/feeds/calendars/user_TvB3EwF9kzFKDoNOVqAr9z8kJU8F1tIRvPFK9iqW.ics', {}, function(err, data) {
  if (err) console.log(err);
  for (let k in data) {
    if (data.hasOwnProperty(k)) {
      var ev = data[k];
      if (data[k].type == 'VEVENT') {
        console.log(`${ev.summary} is in ${ev.location} on the ${ev.start.getDate()} of ${months[ev.start.getMonth()]} at ${ev.start.toLocaleTimeString('en-GB')}`);
      }
    }
  }
});

module.exports = router;
