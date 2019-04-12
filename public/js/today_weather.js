var weather = require('openweather-apis');

// Settings
const lang = 'en';
const city = 'Hoboken';
const unit = 'metric';
const appid = '6e31118eb9619a56935127ca1bfe0195';

weather.setLang(lang);
weather.setCity(city);
weather.setUnits(unit);
weather.setAPPID(appid);


weather.getAllWeather((err, JSONObj) => {
    const json = JSONObj;
    const temp = json.main.temp;
    const des = json.weather[0].description;
    var today_weather = `${des} ${temp}`;
    module.exports = today_weather;
});