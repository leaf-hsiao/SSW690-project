$( document ).ready(function() {
    $.get("/ical",function(data,status){
        var icaldetails = "";
        $.each(data, function(i){
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
