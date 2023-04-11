// holds all search history
var searchHistory = [];

// query selector for all dynamically needed elements
var searchButton = document.querySelector("#search-button");
var searchBox = document.querySelector("#search-box");
var dateTime = document.querySelector("#date-time");
var table = document.querySelector("#table");
var cityName = ''

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

// time function to update set time/date format
function time() {
    dateTime.textContent = dayjs().format(": MMM DD, YYYY h:mma (ss)");
    // takes itself as a parameter so it calls itself every sec


}
// Set date
time();
setInterval(time, 1000);

// gets and returns input text from user
function getCityName(input_element) {
    return input_element.textContent;
}
// add search input to search history and append element
function addToHistory(cityName) {
    getWeatherAPI(cityName)
    searchHistory.push(cityName);
    var city = document.createElement("p")
    city.className = "button is-light is-warning is-fullwidth is-size-5"
    city.innerHTML = cityName
    table.appendChild(city);
    return cityName;

}
// load history from localStorage
function loadHistory(global_history) {
    global_history.push(localStorage.getItem('city-history'))
    if (global_history.length === 0) {
        console.log('NO HISTORY TO LOAD!');

    } else 
        console.log('HISTORY LOADED!');
    


    for (var i = 0; i < global_history.length; i++) {
        addToHistory(global_history[i]);
    }

}
// Save search history to local storage
function saveHistory(global_history) {
    if (localStorage.setItem('city-history', global_history)) {
        console.log('HISTORY SAVED SUCCESSFULLY');

    }
}

function getWeatherAPI(city) {
    var API_KEY = '501097da5c0ccc04bda86f2d077d16bb';

    var API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}limit=5&appid=${API_KEY}`


    fetch(API_URL).then(api => api.json()).then(data => {
        console.log(data);
    });


}


// add event listener to search box
searchBox.addEventListener('keydown', function (event) {
    var inputEl = event.target;
    cityName = inputEl.value;
    console.log(cityName);

})
// add event listener to search box
searchBox.addEventListener('keyup', function (event) {
    var inputEl = event.target;
    cityName = inputEl.value;
    console.log(cityName);

})
// on keyboard enter, search
searchBox.addEventListener('keypress', function (event) {
    event.target
    if (event.key === "Enter") {
        getWeatherAPI(cityName);
        addToHistory(event.target.value);
        saveHistory(searchHistory);
        console.log('::KEYBOARD:: City Saved To History: ', cityName);
        searchBox.value = ''

    }

})

// click event listener for search button
searchButton.addEventListener('click', function (event) {
    event.target;
    addToHistory(cityName);
    saveHistory(searchHistory);
    console.log('City Saved To History: ', cityName);
    searchBox.value = ''


});
