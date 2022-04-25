
var ApiKey = "2d66e4fc0cff705b2b670c234b7c409c"
var cityInput = document.getElementById("city-input")
var searchBtn = document.getElementById("search-btn")
var citySearchForm = document.getElementById("city-search-form")
var citySearched = document.getElementById("city-searched")
var temperature = document.getElementById("temp")
var wind = document.getElementById("wind")
var humidity = document.getElementById("humidity")
var uvIndex = document.getElementById("UV-index")
var iconImg = document.createElement("IMG");
var weatherIcon = document.getElementById("weather-icon")
var temperatureF = document.getElementById("tempF")
var windF = document.getElementById("windF")
var humidityF = document.getElementById("humidityF")
var uvIndexF = document.getElementById("UV-indexF")
var iconImgF = document.createElement("IMG");
var weatherIconF = document.getElementById("weather-iconF")
var forecastWeather = document.getElementById("forecast-weather")
var cityButton = document.getElementById("city-btn")
var currentDate = moment().format("DD[/]MM[/]YYYY")
var icon = ""
var city = ""
var cityLatitud = ""
var cityLongitud = ""
var searchedCity = []

if (JSON.parse(localStorage.getItem("searchedCity")) !== null) {
    var searchedCity = JSON.parse(localStorage.getItem("searchedCity"))
    var historySearchLength = searchedCity.length
    var lastSearchedCity = searchedCity[historySearchLength - 1]
    getCityCoordinates(lastSearchedCity)
}


function formSubmitHandler(event) {
    event.preventDefault();
    var city = cityInput.value.trim();
    if (city) {
        //calling the function that saves the city input ot local storage
        saveCity(city)
        //calling the function to determine the coordinates of the city
        getCityCoordinates(city)
        citySearched.textContent = '';
        temperature.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
        uvIndex.textContent = '';
        cityInput.value = '';
        forecastWeather.textContent = ''
    } else {
        alert('Please enter a City name');
    }
};

function buttonClickHandler(event) {
    var city = event.target.textContent;

    if (city) {
        //calling the function that saves the city input ot local storage
        saveCity(city)
        //calling the function to determine the coordinates of the city
        getCityCoordinates(city)
        citySearched.textContent = '';
        temperature.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
        uvIndex.textContent = '';
        cityInput.value = '';
        forecastWeather.textContent = ''

    } else {
        alert('Please enter a City name');
    }
};

//function that returns the coordinages of the city
function getCityCoordinates(city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + ApiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    cityLatitud = data.coord.lat
                    cityLongitud = data.coord.lon
                    getCityWeather(cityLatitud, cityLongitud, city)
                });
            } else {
                alert('Error: ' + response.statusText);
            }

        })
        .catch(function (error) {
            alert('Unable to connect to GitHub');
        });
};
//funtion that calls the funcitons that render the weather data for the city
function getCityWeather(cityLatitud, cityLongitud, city) {
    var oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLatitud + "&lon=" + cityLongitud + '&exclude=minutely,hourly,alerts&units=metric&appid=' + ApiKey;
    fetch(oneCallUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    //calling the function to render the current weathr for the city
                    renderCurrentWeatherCity(data, city)
                    //calling the funciton to render the 5 days forecast fos the city
                    renderForecastWeatherCity(data)
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to GitHub');
        });
};
//function the render the current weather for the city
function renderCurrentWeatherCity(data, city) {
    if (data.length === 0) {
        citySearched.textContent = 'No weather data found.';
        return;
    }
    uvIndexCondition(data)
    var icon = data.current.weather[0].icon
    iconImg.setAttribute("src", "http://openweathermap.org/img/wn/" + icon + ".png");
    weatherIcon.appendChild(iconImg);
    var location = city.toUpperCase()
    citySearched.textContent = " " + location + "  " + currentDate
    temperature.textContent = data.current.temp + " ℃";
    wind.textContent = data.current.wind_speed + " m/s";
    humidity.textContent = data.current.humidity + " %";
    uvIndex.textContent = data.current.uvi;
}
//function that renders weather forecast for next 5 days
function renderForecastWeatherCity(data) {
    for (var i = 0; i < 5; i++) {
        var futureDay = moment().add(i + 1, 'days').format("DD[/]MM[/]YYYY")
        var iconF = data.daily[i].weather[0].icon
        var textParameters = ["Temp: ", "Wind: ", "Humidity: "]
        var forecastParameters = [
            data.daily[i].temp.day + " ℃",
            data.daily[i].wind_speed + " m/s",
            data.daily[i].humidity + " %",
        ]
        //creating elements dinamically where the forcast parameter are going to be display    
        var divCol = document.createElement("div")
        var divCard = document.createElement("div")
        var h4 = document.createElement("h4")
        var p = document.createElement("p")
        var imgWeather = document.createElement("img")
        var listWeatherParameter = document.createElement("lu")

        forecastWeather.appendChild(divCol)
        divCol.appendChild(divCard)
        divCard.appendChild(p)
        p.appendChild(h4)
        p.appendChild(imgWeather)
        p.appendChild(listWeatherParameter)

        divCol.setAttribute("class", "col my-4")
        divCard.setAttribute("class", "card")
        divCard.setAttribute("style", "background-color:#32CAD5")
        p.setAttribute("class", "m-3")
        imgWeather.setAttribute("src", "http://openweathermap.org/img/wn/" + iconF + ".png");
        listWeatherParameter.setAttribute("class", "list-group")
        h4.setAttribute("class", "card-title text-white")
        h4.textContent = futureDay
        for (var j = 0; j < 3; j++) {
            var weatherParemeter = document.createElement("li")
            listWeatherParameter.appendChild(weatherParemeter)
            weatherParemeter.setAttribute("class", "card-text list-unstyled text-white")
            weatherParemeter.textContent = textParameters[j] + forecastParameters[j]
        }
    }
}
//function to determine the condition of the uv Index.
function uvIndexCondition(data) {
    uvIndex.setAttribute("class", "rounded p-2")
    if (data.current.uvi < 3) {
        uvIndex.setAttribute("style", "background-color:green")
    } else if ((data.current.uvi > 3) && (data.current.uvi < 6)) {
        uvIndex.setAttribute("style", "background-color:yellow")
    } else if ((data.current.uvi > 6) && (data.current.uvi < 8)) {
        uvIndex.setAttribute("style", "background-color:orange")
    } else if ((data.current.uvi > 8) && (data.current.uvi < 11)) {
        uvIndex.setAttribute("style", "background-color:red")
    } else {
        uvIndex.setAttribute("style", "background-color:purple")
    }
}

function saveCity(city) {
    var currentCity = city
    searchedCity.push(currentCity)
    localStorage.setItem("searchedCity", JSON.stringify(searchedCity))
}
//added eventlisteners to the search form and the city buttons
citySearchForm.addEventListener('submit', formSubmitHandler);
cityButton.addEventListener('click', buttonClickHandler);
