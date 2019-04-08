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
today = wd + ', ' + mm + ' ' + dd;

document.getElementById("time").innerHTML = `<h2> ${today} </h2>`;