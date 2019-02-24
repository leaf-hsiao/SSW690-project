var express = require('express');
var router = express.Router();
var weather = require('openweather-apis');

/* GET weather info. */
weather.setLang('en');
weather.setCity('Hoboken');
weather.setAPPID('6e31118eb9619a56935127ca1bfe0195');
weather.getTemperature(function(err, temp){
  if(err) console.log(err);
  router.get('/', function(req, res, next) {
    res.render('weather', { city: 'Hoboken', temp: temp });
  });
});

module.exports = router;
