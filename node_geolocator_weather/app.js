if (navigator.geolocation) {				
    navigator.geolocation.getCurrentPosition(showPosition);
   } else {
    alert('Geolocation is not supported in your browser');
   }
   
   function showPosition(position) {
     var api = "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
   
     $.getJSON(api, function(data){
       // Getting Weather Details
       $("#place").html(data.name + ", " + data.sys.country);
       $("#windSpeed").html(data.wind.speed + "km/h");
       $("#humidity").html(data.main.humidity + "%");
       $("#celsius").html(data.main.temp.toFixed(1) + "°C");
       $("#temp").html(data.main.temp.toFixed(1));
       $("#description").html(data.weather[0].description);
       
       // Get Current Date and Time
       var dt = new Date();
       $("#dateTime").html(dt.getDate() + "/" + (dt.getMonth()+1)  + "/" + dt.getFullYear() + " "+ dt.getHours() + ":" + dt.getMinutes());
       
       // Weather Icon Conditions
       if(data.weather[0].description.indexOf("clouds")!== -1){
         $("#weather-icon").html("<i class='wi wi-day-cloudy' style='font-size: 7em'></i>");   
       }
       else if(data.weather[0].description.indexOf("clear sky")!== -1){
         $("#weather-icon").html("<i class='wi wi-day-sunny' style='font-size: 7em'></i>");
       }
       else if(data.weather[0].description.indexOf("rain")!== -1){
         $("#weather-icon").html("<i class='wi wi-rain-wind' style='font-size: 7em'></i>");
       }
       else if(data.weather[0].description.indexOf("thunderstorm")!== -1){
         $("#weather-icon").html("<i class='wi wi-thunderstorm' style='font-size: 7em'></i>");
       }
       else if(data.weather[0].description.indexOf("snow")!== -1){
         $("#weather-icon").html("<i class='wi wi-snow' style='font-size: 7em'></i>");
       }
       else if(data.weather[0].description.indexOf("mist")!== -1){
         $("#weather-icon").html("<i class='wi wi-fog' style='font-size: 7em'></i>");
       }
       else if(data.weather[0].description.indexOf("mist")!== -1){
         $("#weather-icon").html("<i class='wi wi-fog' style='font-size: 7em'></i>");
       }
     });
   }
   
   // Temperature Conversion
   function getFahrenheit() {
     $("#btnCelsius").css("color", "#2d314a");
     $("#btnFahrenheit").css("color", "#fff");
     $("#btnCelsius").prop("disabled", false);
     $("#btnFahrenheit").prop("disabled", true);
     
     $("#temp").html(((parseInt($("#temp").text()) * 1.8) + 32).toFixed(1));
   }
                                              
   function getCelsius() {
     $("#btnCelsius").css("color", "#fff");
     $("#btnFahrenheit").css("color", "#2d314a");
     $("#btnCelsius").prop("disabled", true);
     $("#btnFahrenheit").prop("disabled", false);
     
     $("#temp").html(Math.round((parseInt($("#temp").text()) - 32)/ 1.8).toFixed(1));
   }