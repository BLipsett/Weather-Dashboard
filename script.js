_dsSecret = "&KEY=8847349d953145628ca0bbd65ed8bb9c";

//query for dark sky api
function buildQuery(city) {



    //https://api.darksky.net/forecast/[key]/[latitude],[longitude]
    let queryURL = "https://api.weatherbit.io/v2.0/forecast/daily?city=" + city + _dsSecret;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        let apiKey = _dsSecret;
        //let city = "#search-term";
        let getWeb = queryURL + apiKey;// + (zipCode());
        console.log(city);



        //Build HTML for generated information
        let tempF = ((response.data["0"].temp) * 9 / 5) + 32;
        let cityName = $("<h1>").text(response.city_name);
        let date = $("<h4>").text(response.data["0"].valid_date);
        cityName.append(date);
        let temp = $("<h4>")
        temp.text(`${tempF} + F)`);
        let weather = (response.data["0"].weather.icon);
        let condition = $("<div>").text(response.data["0"].weather.description);
        //condition.append(weather);
        let curWeather = $("<div>");
        curWeather.append(cityName, temp, condition);
        console.log(tempF);
        var iconurl =  "https://www.weatherbit.io/static/img/icons/"+ weather + ".png";        
        $('#wicon').attr('src', iconurl);

        //data[""0""].weather.icon
        $("#curWeather").append(curWeather);
        //$("#article-section").append(cityName, temp, condition);
//if (response === )
        return getWeb;
    });
}

/*function zipCode() {
    let zip = $("term");

    let geoLat = zip;
    let geoLong = newZip;
    
    
}*/
$("#run-search").on("click", function () {
    event.preventDefault();
    let city = $("#search-term").val().trim();
    buildQuery(city);
});