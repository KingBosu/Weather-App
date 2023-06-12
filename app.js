
const weatherForm = document.querySelector('#weatherForm');
const weatherResult = document.querySelector('#weatherResult');

weatherForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const city = document.querySelector('#cityInput').value;
  const apiKey = 'af555ad7b47f68538f1b3097697556e6';

  const { lat, lon } = await convertCityToLongAndLat(city, apiKey);
  const weatherData = await getWeatherData(lat, lon, apiKey);
  displayWeatherData(weatherData);
});

async function convertCityToLongAndLat(city, apiKey) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)},${state},${zipcode}&limit=1&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const latitude = data[0].lat;
  const longitude = data[0].lon;
  return { lat: latitude, lon: longitude };
}

async function getWeatherData(lat, lon, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function displayWeatherData(weatherData) {
  weatherResult.innerHTML = `
    <h2>Weather for ${weatherData.timezone}</h2>
    <p>Temperature: ${weatherData.current.temp_c}°C</p>
    <p>Condition: ${weatherData.current.weather[0].description}</p>
    <p>Humidity: ${weatherData.current.humidity}%</p>
  `;
}
