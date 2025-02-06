const apiKey = "adLD6gMYCbql7Yh1ux6kgQ0BT7zK4zMy"; // Tomorrow.io API Key
document.getElementById("getWeatherBtn").addEventListener("click", getWeather);
document.getElementById("locationInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {
    const location = document.getElementById("locationInput").value.trim();
    const weatherInfo = document.getElementById("weatherInfo");

    if (!location) {
        alert("Please enter a location");
        return;
    }

    // Show loading message
    weatherInfo.innerHTML = `<p>⏳ Fetching weather data...</p>`;

    try {
        // Fetch weather data from Tomorrow.io
        const response = await fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${apiKey}`);
        const data = await response.json();

        if (!data || !data.data) {
            weatherInfo.innerHTML = `<p>❌ Location not found.</p>`;
            return;
        }

        const weather = data.data.values;

        // Display weather data
        weatherInfo.innerHTML = `
            <p><strong>${location.toUpperCase()}</strong></p>
            <p>🌡 Temperature: ${weather.temperature}°C</p>
            <p>💧 Humidity: ${weather.humidity}%</p>
            <p>💨 Wind Speed: ${weather.windSpeed} km/h</p>
            <p>🌧 Precipitation: ${weather.precipitationIntensity} mm</p>
            <p>☁️ Cloud Cover: ${weather.cloudCover}%</p>
            <p>🌤 Conditions: ${weather.weatherCode}</p>
        `;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherInfo.innerHTML = `<p>❌ Error: Unable to fetch weather data</p>`;
    }
}
