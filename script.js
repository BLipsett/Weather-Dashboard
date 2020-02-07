_dsSecret = "&KEY=8847349d953145628ca0bbd65ed8bb9c";


function loadDashboard() {
    //$(".container").html("");
}


//query for weatherbit api
function buildQuery(city) {



    //https://api.darksky.net/forecast/[key]/[latitude],[longitude]
    let queryURL = "https://api.weatherbit.io/v2.0/forecast/daily?city=" + city + _dsSecret;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {

        let wetArr = [response.data["1"], response.data["2"], response.data["3"], response.data["4"], response.data["5"]];
        console.log(wetArr[0]);

        //$.each(response.data["0"], function (index, val) {
        let weatherData = (response.data["2"]);
        console.log(weatherData.temp);

        console.log(response.data["1"]);
        //let apiKey = _dsSecret;
        //let city = "#search-term";
        //let getWeb = queryURL + apiKey;// + (zipCode());
        console.log(city);



        //Build HTML for generated information

        let tempF = Math.round((response.data["0"].temp) * 9 / 5) + 32;
        let cityName = $("<h3>").text(response.city_name);
        let date = $("<h6>").text(response.data["0"].valid_date);
        cityName.append(date);

        let windMeters = Math.round((response.data["0"].wind_spd) * 2.237);
        //let windS = Math.round(windMeters);
        let wind = $("<p>")
        wind.text(`${windMeters} MPH`);

        let humd = $("<p>").text(response.data["0"].rh).prepend("Humidity: ");
        let uv = $("<p>").text(Math.round(response.data["0"].uv)).prepend("UV Index: ");
        let temp = $("<h4>")
        temp.text(`${tempF}F`);
        let weather = (response.data["0"].weather.icon);
        let condition = $("<div>").text(response.data["0"].weather.description);
        //condition.append(weather);
        let curWeather = $("<div>");
        curWeather.append(cityName, temp, condition, wind, humd, uv);
        console.log(tempF);

        $("#curWeather").append(curWeather);


        var iconurl = "https://www.weatherbit.io/static/img/icons/" + weather + ".png";
        $('#wicon').attr('src', iconurl);



        //Build 5 day weather forecast with date, icon, temp, humidity
        $.each(wetArr, function (index, value) {
            console.log(index, value.temp);

            let cardF = Math.round((value.temp) * 9 / 5) + 32;
            let weatherCard = (value.weather.icon);
            let tempCard = $("<p>").text(cardF);
            let dateCard = $("<p>").text(value.valid_date);
            let cardUrl=("https://www.weatherbit.io/static/img/icons/" + weatherCard + ".png");
            var iconurlCard = $('<img>').attr('src', cardUrl)
            let humidCard = $("<p>").text(value.rh);
            dateCard.append(iconurlCard).append(tempCard).append(humidCard);
            
            
            //$("#forecastWeather").append(iconurlCard);
            
            
            
            
            
            
            //$('#imgCard').attr('src', iconurlCard);


            $("#forecastWeather").append(dateCard, iconurlCard);



        })

    });
}







function saveEvent() {
    let code = text(pastCity);

    localStorage.setItem(code);
    console.log(code);
}

function showCont() {
    $("#curCont").removeClass("hide");
    $("#curcont").addClass("show");
}


$(".run-search").on("click", showCont, function (saveEvent) {
    event.preventDefault();
    let city = $("#search-term").val().trim();
    $("div").removeClass("hide");




    //build list from searched cities
    let pastCity = $("<button>").text(city).addClass("run-search");
    $(".list").append(pastCity);



    buildQuery(city);
});
$("#clear").on("click", loadDashboard(), {

});
$(function () {
    loadDashboard();
    $(".container").on("click", ".clearBtn", saveEvent);
});

// CURRENT TEMPERATURE, CURRENT HUMIDITY, WINDSPEED, UV INDEX, AND 5 DAY FORECAST