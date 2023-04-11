var cities = [];


var searchButton = document.querySelector("#search-button");
var searchBox = document.querySelector("#search-box");
var resultContainer = document.querySelector("#results");
var dateTime = document.querySelector("#date-time");
var resultBlock = document.querySelector("#table");

function time() {
    dateTime.textContent = dayjs().format(": MMM DD, YYYY h:mma (ss)");


}
// Set date
(setInterval(time, 1000));


// TODO Create dropdown list to select city so that we can take the city and pass it to the Geocoding API

// Fetch function to get our data, slice what we need for each item in the results found
function fetchMapData(keyword) {

    fetch(`https://www.mapquestapi.com/search/v3/prediction?key=ceiWumpWrG5aqAOi4bsRb8BIkjPl3vtP&limit=5&collection=address,city&q=${keyword}`).then(promise => promise.json()).then(data => { // JSON.stringify(data);

        console.log(data.results)

        for (var i = 0; i < data.results.length; i++) {
            var listCity = data.results[i].name;
            var city = data.results[i].name;

            var state = data.results[i].place.properties.state;


            var longitude = data.results[i].place.geometry.coordinates[0];


            var latitude = data.results[i].place.geometry.coordinates[1];

            var resultList = document.createElement("option");
            resultList.text = listCity;
            resultList.value = listCity;
            resultBlock.appendChild(resultList);
            resultContainer.setAttribute("style", "display:block;");
            getWeatherAPI(longitude, latitude);

            cities.push([city, state, longitude, latitude]);

            // console.log('Last Log: \n' + cities[i]);
            console.log(`City: ${city}\nState: ${state}\nLongitude: ${longitude}\nLatitude: ${latitude}`)


        }


    });
}

function getWeatherAPI(city) {
    var API_KEY = '501097da5c0ccc04bda86f2d077d16bb';

    var API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`


    fetch(API_URL).then(api => api.json()).then(api_data => {
        console.log(`City Name:${
            api_data[0].name
        }\nLongitude:${
            api_data[0].lon
        }\nLatitude:${
            api_data[0].lat
        }`);
    });


}

resultContainer.addEventListener('click', function (event) {
    var city = event.target.value
    // console.log('CITY CLICKED: ', city);
    fetchMapData(city)


})
// Event listener for the search button. If the user hasn't typed anything it, it will display an alert letting them know they need to enter search parameters first. This way they can't use up API requests unnecessarily. We pass in
searchButton.addEventListener('click', function (event) {
    var info = searchBox.value;

    if (info === undefined) {
        alert("No Input Detected")
        return
    } else {
        event.target

        fetchMapData(info)


    }

    var info = searchBox.value;
    if (info === undefined) {
        return
    } else {
        event.target

        fetchMapData(info)


    }


});

searchBox.addEventListener('keydown', function (event) {
    var info = searchBox.value;
    if (info === undefined) {

        return
    } else {
        event.target

        fetchMapData(info)


    }

});

searchBox.addEventListener('keyup', function (event) {
    var info = searchBox.value;

    fetchMapData(info)
    event.target
});

function createCards() {
    var card = document.createElement("a");
    var cardIcon = document.createElement("span");
    var cardITag = document.createElement("i")


}
