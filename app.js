
const weatherForm = document.querySelector('#weatherForm');
const weatherResult = document.querySelector('#weatherResult');

weatherForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const city = document.querySelector('#cityInput').value;
  const apiKey = 'af555ad7b47f68538f1b3097697556e6';

  const weatherData = await getWeatherData(city, apiKey);
  displayWeatherData(weatherData,city);
});



async function getWeatherData(city, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

function displayWeatherData(weatherData,city) {

  weatherResult.innerHTML = `
    <h2> Weather for ${city}</h2>
    <p>Weather Condition  ${weatherData.weather[0].description}</h2>
    <p>Temperature: ${weatherData.main.temp}°F</p>
  `;
}
