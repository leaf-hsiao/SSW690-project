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

$(".time").append(today_date);


/* Generate the Homework for Today & Tomorrow */
$.get("/ical", function (data, status) {
    var icaldetails = "";
    var todolist = "";
    var count = 3;
    $.each(data, function (i) {
        var date_src = data[i].end.slice(0, 10).replace(/-/g, "/");
        var date_obj = new Date(date_src);
        var preDate = new Date(today.getTime() - 24 * 60 * 60 * 1000);
        if (date_obj >= preDate) {
            if (count > 0) {
                var description = data[i].description.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>");
                icaldetails = '<ul><li class="hw-date">' + data[i].end.slice(0, 10) + '</li><li class="hw-sum">' + data[i].summary + '</li><li class="hw-des">' + description + "</li></ul>";
                $(".ical").append(icaldetails)
                todolist = "<ul><li>" + data[i].end.slice(0, 10) + "</li><li>" + data[i].summary + "</li></ul>";
                $(".todo_list").append(todolist)
            }
            count--;
        }
    })
});