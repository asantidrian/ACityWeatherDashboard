# AWeatherCityDashboard
## Description
This is a weather dashboard with a form input, where the user can type the name of aa city and the current weather conditions as the next 5 days forecast are shown in the screen.
Some popular cities have been added in 8 buttons under the form input. 

## Usage
When a city is typed in the form the current weather conditions are display on the right side of the screen. These weather conditions include,an icon, Temperature, wind speed, Humidity and Uv Index.
The units used are the metric international units.
The UV is diplayed with a background colour of Green, yellow,orange, red or purple depending of the UV index figure to show the level of danger in the skin. This categorization has been taken from the  Bureau of Meteorology official website of Australia.

#008000 0-2 Low-Green  
#FFFF00 3-5 Moderate-Yellow  
#FFA500 6-7 Orange-High  
#FF0000 8-10 Red-Very High  
#800080 11+ Purple-Extreme  

on the bottom right side fo the screen a 5 days forecast for the searched city is shown.Only the Temperature, Wind speed and Humidity and an icon are shown.


All the weather data is collected using the OpenWeather API.
2 different API calls are made. One to the current Data API to determine the Latitud and longitud coordinates and the second call is made to the ONe call API usil those coordinates for that typed city. Same functionality occurs for the buttons below the form input. 

the 5 days forecast have been dinamically usuing the js file.
All the styling except the used colours are done using Bootstrap.

Moment.js is used to retreive the dates.

Local storage is used to saved the searched city.
When the page is refreshed the last city searched date is shown in the page.



## Tools
HTML  
CSS  
Bootstrap  
Server-Side API - OpenWeather API  

## Demo

![CityWeatherDashboard](./Assets/img/CityWeatherDashboard.gif)

## Contact
Email: asantidrian83@gmail.com  
Project link: https://github.com/asantidrian/ACityWeatherDashboard  
Website link: https://asantidrian.github.io/ACityWeatherDashboard/
