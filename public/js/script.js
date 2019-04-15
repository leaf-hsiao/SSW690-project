// Ical
$(document).ready(function () {

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

    $.get("/ical", function (data, status) {
        var icaldetails = "";
        $.each(data, function (i) {
            icaldetails = "<tr><td>" + data[i].description + "</td><td>" + data[i].summary + "</td><td>" + data[i].end + "</td></tr>";
            $(".ical").append(icaldetails)
        })
        // for (var i = 0; i < data.length; i++) {
        //     html = html + '<tr>';
        //     html = html + '<td>' + data[i].description + '</td>';
        //     html = html + '</tr>';
        // }
    });
});