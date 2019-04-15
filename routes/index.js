const express = require('express');
var router = express.Router();

//get ip demo, but what it got is the backend location!
/*
const geolocation = require('google-geolocation')({
    key: 'AIzaSyDGidP1hMaNNrRc8FYemvvJTUsotM_3b9k'
});

const params = {
    wifiAccessPoints: [{
        macAddress: '01:23:45:67:89:AB',
        signalStrength: -65,
        signalToNoiseRatio: 40
    }]
};

geolocation(params, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
});
*/

/* Weather module */
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
    today_weather = `${cityName} ${temp}${unitSymbol} | ${des}`;
});

// (disgarded) backend Time function
/*
var today = new Date();
//day
var dd = String(today.getDate());
//month
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
var mm = monthNames[today.getMonth()];
//year
var yyyy = today.getFullYear();
//weekday
const weekdayNamed = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
var wd = weekdayNamed[today.getDay()];

//all together format
const today_date = wd + ', ' + mm + ' ' + dd;
*/
router.get('/', (req, res) => res.render('index', {
    //today_date: today_date,
    today_weather: today_weather
}));

module.exports = router;