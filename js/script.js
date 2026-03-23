//API_KEY = fb7d086bc1dd8d81bcc466f090f3a580
//BASIC_ENDPOINT = https://api.openweathermap.org/data/2.5/weather
//CITY_NAME = ?q=London
//PLUS_API = &appid=fb7d086bc1dd8d81bcc466f090f3a580
//ADD UNITS = &units=metric
//FULL_URL = https://api.openweathermap.org/data/2.5/weather?q=London&appid=fb7d086bc1dd8d81bcc466f090f3a580&units=metric

const API_KEY = "fb7d086bc1dd8d81bcc466f090f3a580";
const city = document.getElementById("city-input");
const submitCity = document.querySelector(".btn");

//Fields to fill with data
// 1. Temperature
const mainTemperature = document.querySelector(".temperature-main h3");
const feelsLike = document.querySelector(".span-feel");
const maxTemp = document.querySelector(".span-max-temp");
const minTemp = document.querySelector(".span-min-temp");

// 2. Weather description
const mainWeatherDesc = document.querySelector(".span-main");
const weatherIcon = document.querySelector(".span-icon");
const weatherDesc = document.querySelector(".span-desc");

// 3. Other details
const pressure = document.querySelector(".span-pressure");
const humidity = document.querySelector(".span-humidity");
const windSpeed = document.querySelector(".span-wind");

const cityName = document.querySelector(".city");
// const icon = document.querySelector(".icon");

//Capitalize the first letter
function capitalizeFirstLetter(string) {
  if (typeof string !== "string" || string.length === 0) {
    return ""; // Handle empty or non-string input safely
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function fetchData() {
  try {
    let cityInputValue = city.value;
    url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    cityName.innerHTML = data.name;
    weatherDesc.innerHTML = capitalizeFirstLetter(data.weather[0].description);
    // get the icon
    const iconTag = data.weather[0].icon;

    // Fill data where necessary
    mainTemperature.innerHTML = data.main.temp + `\u00B0C`;
    feelsLike.innerHTML = data.main.feels_like + `\u00B0C`;
    maxTemp.innerHTML = data.main.temp_max + `\u00B0C`;
    minTemp.innerHTML = data.main.temp_min + `\u00B0C`;

    //Fill descriptions
    mainWeatherDesc.innerHTML = data.weather[0].main;
    weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconTag}.png" alt="" />`;
    weatherDesc.innerHTML = capitalizeFirstLetter(data.weather[0].description);

    // Other weather details
    pressure.innerHTML = `${data.main.pressure} mmHg`;
    humidity.innerHTML = `${data.main.humidity} %`;
    windSpeed.innerHTML = `${data.wind.speed} km/hr`;

    // Clear the input value and return data
    city.value = "";
    return data;
  } catch (err) {
    console.log(err);
  }
}

submitCity.addEventListener("click", (e) => {
  e.preventDefault();
  fetchData();
});
