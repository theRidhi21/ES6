// Weather Application using ES6 Features
// Name: Student
// Topic: Arrow Functions, Callbacks, Promises, Async/Await


// my api key from openweathermap.org
const API_KEY = "YOUR_API_KEY_HERE";


// ---------- CALLBACK FUNCTION ----------
// This function is passed to other functions as a callback
const showMessage = (text) => {
  document.getElementById("msg").innerHTML = text;
};


// ---------- ARROW FUNCTION ----------
// This shows the current weather on the page
const showCurrentWeather = (data) => {
  document.getElementById("cityname").innerHTML = data.name;
  document.getElementById("temp").innerHTML = data.main.temp + " C";
  document.getElementById("desc").innerHTML = data.weather[0].description;
  document.getElementById("humidity").innerHTML = data.main.humidity + " %";
  document.getElementById("wind").innerHTML = data.wind.speed + " m/s";
};


// ---------- ARROW FUNCTION TO DRAW GRAPH ----------
let chart1 = null;
let chart2 = null;

const drawGraphs = (list) => {

  // arrays for the graph
  let labels = [];
  let temps = [];
  let humidity = [];

  // loop through the forecast list
  for (let i = 0; i < list.length; i++) {
    labels.push(list[i].dt_txt);
    temps.push(list[i].main.temp);
    humidity.push(list[i].main.humidity);
  }

  // delete old chart if it is already there
  if (chart1 != null) {
    chart1.destroy();
  }
  if (chart2 != null) {
    chart2.destroy();
  }

  // temperature graph
  chart1 = new Chart(document.getElementById("chart1"), {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Temperature",
        data: temps,
        borderColor: "red",
        fill: false
      }]
    },
    options: {
      responsive: false
    }
  });

  // humidity graph
  chart2 = new Chart(document.getElementById("chart2"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Humidity",
        data: humidity,
        backgroundColor: "blue"
      }]
    },
    options: {
      responsive: false
    }
  });
};


// ---------- ASYNC AWAIT FUNCTION ----------
// This is the main function. It uses async and await.
const getWeather = async () => {

  // const and let
  const city = document.getElementById("city").value;

  if (city == "") {
    showMessage("Please enter a city name");
    return;
  }

  showMessage("Loading please wait...");

  // TEMPLATE LITERALS - using backticks to make the url
  const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

  // TRY CATCH with ASYNC AWAIT
  try {

    // await waits for the promise to finish
    const response1 = await fetch(url1);
    const data1 = await response1.json();

    const response2 = await fetch(url2);
    const data2 = await response2.json();

    // if city is wrong the api sends cod 404
    if (data1.cod != 200) {
      showMessage("Error: " + data1.message);
      return;
    }

    showCurrentWeather(data1);
    drawGraphs(data2.list);
    showMessage("Weather data loaded successfully");

  } catch (error) {
    showMessage("Something went wrong: " + error.message);
  }
};


// ---------- PROMISE EXAMPLE ----------
// This function returns a promise. It creates sample data
// so we can see the graph without an API key.
const getSampleData = () => {

  return new Promise((resolve, reject) => {

    // setTimeout takes a CALLBACK function
    setTimeout(() => {

      let list = [];

      for (let i = 0; i < 12; i++) {
        list.push({
          dt_txt: "Day " + (i + 1),
          main: {
            temp: 20 + i % 5,
            humidity: 60 + i % 10
          }
        });
      }

      const sample = {
        name: "Sample City",
        main: { temp: 20, humidity: 60 },
        weather: [{ description: "clear sky" }],
        wind: { speed: 3 },
        list: list
      };

      resolve(sample);

    }, 500);

  });
};


// ---------- USING PROMISE WITH .then() and .catch() ----------
const showSample = () => {

  showMessage("Loading sample data...");

  getSampleData()
    .then((data) => {
      showCurrentWeather(data);
      drawGraphs(data.list);
      showMessage("Sample data is shown");
    })
    .catch((error) => {
      showMessage("Error: " + error);
    });
};


// show the sample data when page opens
showSample();
