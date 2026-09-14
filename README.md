# Weather Application using ES6

A simple web page that reads weather information from openweathermap.org
and shows it in the form of graphs.

## Files

- index.html - the web page
- style.css - styling
- app.js - all the javascript code

## How to Run

Just open index.html in the browser.

When the page opens it shows sample data so you can see the graphs.

To get the real weather, make a free account on https://openweathermap.org/api
and copy your API key. Then open app.js and put the key on line 7:

    const API_KEY = "YOUR_API_KEY_HERE";

After that type any city name and click Get Weather.

## ES6 Features Used

1. Arrow Functions - all functions are written as arrow functions
2. Callbacks - showMessage is passed around, and setTimeout takes a callback
3. Promises - getSampleData() returns a promise, used with .then() and .catch()
4. Async / Await - getWeather() is async and uses await with try catch
5. let and const - used everywhere instead of var
6. Template Literals - backticks used to build the API url

## Graphs

Chart.js library is used to draw two graphs:
- Temperature graph (line chart)
- Humidity graph (bar chart)

## API Used

https://api.openweathermap.org/data/2.5/weather
https://api.openweathermap.org/data/2.5/forecast
