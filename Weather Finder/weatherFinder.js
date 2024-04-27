
// global variables for both XMLHttp requests
let userName = "pbrummel";
let postalLink = "http://api.geonames.org/postalCodeSearchJSON?";
let weatherLink = "http://api.geonames.org/findNearByWeatherJSON?";

// Initiation function that gets the program going (see onload at bottom)
const init = () => {
    let weatherButton = document.querySelector("#getWeather");
    weatherButton.addEventListener("click", getLocation);
}

// Function to grab stored weather data on the Geocities site
const getWeather = (lat, lng) => {

    // Initiate Ajax request
    let xhr = new XMLHttpRequest();

    // Params
    params = `lat=${lat}&lng=${lng}&username=${userName}`;

    // Open the request to Geocities
    xhr.open("get", weatherLink + params);

    // Event handler for the on-ready-state change
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
          let weatherData = JSON.parse(this.response);
          let fahrenheit = (weatherData.weatherObservation['temperature'] * 9 / 5 + 32).toFixed(1);
          let windVelocity = weatherData.weatherObservation['windSpeed'];
          let windCompass = weatherData.weatherObservation['windDirection'];
          console.log(fahrenheit);
          console.log(windVelocity);
          console.log(windCompass);

          // Create image sources for output on HTML page
          let coldWeather = document.createElement("img");
          let hotWeather = document.createElement("img");
          let windyWeather = document.createElement("img");
          coldWeather.setAttribute("src", "images/cold.jpeg");
          hotWeather.setAttribute("src", "images/hot.jpeg");
          windyWeather.setAttribute("src", "images/windy.jpeg");

          // Append temperature information to the webpage
          let temperatureOutput = document.querySelector("#output");
          let weatherHeader = document.createElement("h2");
          weatherHeader.textContent = fahrenheit + "\xB0" + " Fahrenheit";
          temperatureOutput.appendChild(weatherHeader);

          // Append correct image depending on temperature
          let weatherImage = document.querySelector("#output");

          if (fahrenheit <= 34) {
              temperatureOutput.appendChild(coldWeather);
          } else if (fahrenheit >= 83) {
              temperatureOutput.appendChild(hotWeather);
          }

          // Declare wind direction variable
          let windDirection = "";

          // Determine wind direction
          if (windCompass == 0) {
              windDirection = " (no significant wind right now)";
          } else if (windCompass >= 316 || windCompass <= 45) {
              windDirection = "N Wind";
          } else if (windCompass >= 46 && windCompass <= 135) {
              windDirection = "E Wind";
          } else if (windCompass >= 136 && windCompass <= 215) {
              windDirection = "S Wind";
          } else if (windCompass >= 216 && windCompass <= 315) {
              windDirection = "W Wind";
          }

          // Output wind information to the webpage
          let windOutput = document.querySelector("#output");
          let windHeader = document.createElement("h2");
          windHeader.textContent = windVelocity + " mph " + windDirection;
          windOutput.appendChild(windHeader);

          // Append wind image if weather is windy
          let windImage = document.querySelector("#output");
          if (windVelocity >= 15) {
              windOutput.appendChild(windyWeather);
          }
        }
    }

    // Send request to Geocities
    xhr.send();
}

// Function to grab data from the postal codes array on the Geocities site
const getLocation = () => {
    // Initiate Ajax request
    let xhr = new XMLHttpRequest();

    // Params
    let zip = document.querySelector("#zip").value;
    console.log(zip);
    let params = `postalcode=${zip}&username=${userName}`;

    // Open the request to the Geocities page
    xhr.open("get", postalLink + params);

    // Callback
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
          let zipData = JSON.parse(this.responseText);
          zipData = (zipData.postalCodes);
          console.log(zipData);
          let lat = zipData[0]['lat'];
          let lng = zipData[0]['lng'];
          let city = zipData[0]['placeName'];
          let state = zipData[0]['adminName1'];
          console.log(lat);
          console.log(lng);
          console.log(city);
          console.log(state);

          // Create div container for output on HTML page
          let locationOutput = document.querySelector("#output");
          let hr = document.createElement("hr");
          let h1 = document.createElement("h1");
          let location = city + ", " + state;
          h1.textContent = location;
          locationOutput.appendChild(hr);
          locationOutput.appendChild(h1);

          // Call weather function (send lat and lng parameters)
          getWeather(lat, lng);
        }
    }

    // send request
    xhr.send();
}

window.onload = init;
