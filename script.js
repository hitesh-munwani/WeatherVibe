async function fetchWeather() {
	const apiKey = 'ff57587cfe9757891e922f67c2cfb285'; // Replace 'YOUR_API_KEY' with your actual API key
	const city = 'Karachi';
	const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error('Weather data not available');
		}
		const weatherData = await response.json();
		return weatherData;
	} catch (error) {
		console.error('Error fetching weather data:', error);
		throw error;
	}
}

async function updateWeather() {
	try {
		const weather = await fetchWeather();
		const weatherInfo = document.getElementById('weather-info');
		const temperature = Math.round(weather.main.temp - 273.15); // Convert from Kelvin to Celsius
		const description = weather.weather[0].description;
		const wind=weather.wind.speed;
		console.log(weather);
		weatherInfo.textContent = `Temperature: ${temperature}°C, ${description}, wind speed :${wind}`;
	} catch (error) {
		console.error('Error updating weather:', error);
	}
}

// Call the updateWeather function when the page loads
window.onload = updateWeather;