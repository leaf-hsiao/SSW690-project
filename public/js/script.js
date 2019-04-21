/* Time Module: Generate the Date of Today */
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

const monthNums = ["01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"
];


var ical_mm = monthNums[today.getMonth()];
var ical_date = yyyy + '-' + ical_mm + '-' + dd;
var ical_date_next = yyyy + '-' + ical_mm + '-' + String(today.getDate() + 1);

$(".time").append(today_date);


/* Generate the Homework for Today & Tomorrow */
$.get("/ical", function (data, status) {
    var icaldetails = "";
    var todolist = "";
    var count = 3;
    $.each(data, function (i) {
        if (data[i].end.slice(0, 10) == ical_date || data[i].end.slice(0, 10) == ical_date_next) {
            icaldetails = '<ul><li class="hw-date">' + data[i].end.slice(0, 10) + '</li><li class="hw-sum">' + data[i].summary + '</li><li class="hw-des">' + data[i].description + "</li></ul>";
            $(".ical").append(icaldetails)
            if (count > 0) {
                todolist = "<ul><li>" + data[i].end.slice(0, 10) + "</li><li>" + data[i].summary + "</li></ul>";
                $(".todo_list").append(todolist)
            }
            count--;
        }
    })
});