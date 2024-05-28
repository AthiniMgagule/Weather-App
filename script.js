document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.getElementById('weather-form');
    const weatherInfo = document.getElementById('weather-info');

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const location = document.getElementById('location').value;
        getWeather(location);
    });

    async function getWeather(location) {
        const apiKey = 'e75fe16b8d82465d895195552242805';
        const baseUrl = 'http://api.weatherapi.com/v1';
        const endpoint = '/current.json';
        const url = `${baseUrl}${endpoint}?key=${apiKey}&q=${location}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const weatherData = await response.json();
            displayWeather(weatherData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = `<p>Error fetching weather data. Please try again.</p>`;
        }
    }

    function displayWeather(data) {
        weatherInfo.innerHTML = `
            <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
            <p>Temperature: ${data.current.temp_c} °C</p>
            <p>Condition: ${data.current.condition.text}</p>
            <img src="http:${data.current.condition.icon}" alt="Weather icon">
        `;
    }
});

