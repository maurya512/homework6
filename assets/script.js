// getting the doc ready for jQuery
$(document).ready(function () {
    // retrive an api key by signing up for it
    var apiKey = "e2f589323ac21fe7c4597c290fc12523";
    var city = "";
    var weatherUrl = "";
    var currentDate = moment().format("L");
    console.log(currentDate);
    var searchHistory = JSON.parse(localStorage.getItem("cities")) === null ? []: JSON.parse(localStorage.getItem("cities"));
    console.log(searchHistory);

    displaySearchHistory();

    // create a function to display current weather at a city of user's choice

    function cityCurrentWeather() {
        // validate city input from the user
        if($(this).attr("id")==="search-city") {
            city = $("#city").val();
        }
        else {
            city = $(this).text();
        }

        // populate weatherUrl with the link and city query along with api keys
        weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;
        
        if(searchHistory.indexOf(city) === -1) {
            searchHistory.push(city);
        }

        localStorage.setItem("cities", JSON.stringify(searchHistory));

        $.getJSON(weatherUrl, function (json) {
            let temp = (json.main.temp - 273.15) * (9 / 5) + 32;
            let windspeed = json.wind.speed * 2.237;

            $("#current-city").text(json.name + " " + currentDate);
            $("#weather-img").attr("src", "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
            $("#temperature").text(temp.toFixed(2) + "°F");
            $("#humidity").text(json.main.humidity + "%");
            $("#windspeed").text(windspeed.toFixed(2) + " " + "mph");
        });
    }   
    // a function to display search history
    function displaySearchHistory() {
        $("#search-history").empty();
        searchHistory.forEach(function (city) {
            var historyItem = $("<li>");
            historyItem.addClass("list-group-item btn btn-light");
            historyItem.text(city);
            $("#search-history").prepend(historyItem);
        });
        $(".btn").click(cityCurrentWeather);
    }

    // a function to clear history
    function clearSearchHistory() {
        $("#search-history").empty();
        searchHistory = [];
        localStorage.setItem("cities", JSON.stringify(searchHistory));
    }
    // add event listeners on all button classes
    $("#clear-history").click(clearSearchHistory);
    $("#search-city").click(displaySearchHistory);

}); 