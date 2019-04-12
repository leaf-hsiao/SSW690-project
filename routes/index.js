const express = require('express');
var router = express.Router();
var today_date = require('../public/js/today_date');


/* Weather module */
//var today_weather = require('../public/js/today_weather');
var weather = require('openweather-apis');

const lang = 'en';
const cityid = '5099133';
const unit = 'imperial'; //'metric' 'imperial'
let unitSymbol = '';
const appid = '6e31118eb9619a56935127ca1bfe0195';

weather.setLang(lang);
weather.setCityId(cityid);
weather.setUnits(unit);
weather.setAPPID(appid);
switch (unit) {
    case 'metric':
        unitSymbol = '°C';
        break;
    case 'imperial':
        unitSymbol = '°F';
        break;
}
var today_weather = '';

weather.getAllWeather((err, JSONObj) => {
    const json = JSONObj;
    const temp = json.main.temp.toFixed(0);
    const des = json.weather[0].description;
    const cityName = json.name;
    today_weather = `${cityName} ${temp}${unitSymbol} ${des}`;
});

router.get('/', (req, res) => res.render('index', {
    today_date: today_date,
    today_weather: today_weather
}));

module.exports = router;