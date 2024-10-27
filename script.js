
// script.js
const apiKey = "TKKkpkY3nMxBsO4n1qL5Eb5ayUruFI2d";  // Tomorrow.io API key

async function getWeather() {
    const city = document.getElementById("city").value;
    const url = `https://api.tomorrow.io/v4/timelines?location=${city}&fields=temperature,weatherCode&timesteps=1h&units=metric&apikey=${apiKey}`;

    // Mapping weather codes to descriptions
    const weatherCodeMap = {
        1000: "Clear", 1100: "Mostly Clear", 1101: "Partly Cloudy", 1102: "Mostly Cloudy", 
        1001: "Cloudy", 2000: "Foggy", 2100: "Light Fog", 4000: "Drizzle", 4001: "Rain", 
        4200: "Light Rain", 4201: "Heavy Rain", 5000: "Snow", 5001: "Flurries", 5100: "Light Snow", 
        5101: "Heavy Snow", 6000: "Freezing Drizzle", 6001: "Freezing Rain", 
        6200: "Light Freezing Rain", 6201: "Heavy Freezing Rain", 7000: "Ice Pellets", 
        7101: "Heavy Ice Pellets", 7102: "Light Ice Pellets", 8000: "Thunderstorm"
    };

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        const temperature = data.data.timelines[0].intervals[0].values.temperature;
        const weatherCode = data.data.timelines[0].intervals[0].values.weatherCode;

        // Get the weather description from the code map, defaulting to "Unknown" if not found
        const weatherDescription = weatherCodeMap[weatherCode] || "Unknown";

        // Display the temperature and weather description
        document.getElementById("weatherDisplay").innerHTML = `
            <p>Temperature in ${city}: <span class="temperature">${temperature}°C</span></p>
            <p class="condition">Condition: ${weatherDescription}</p>
        `;
    } catch (error) {
        document.getElementById("weatherDisplay").innerHTML = `<p>Error: ${error.message}</p>`;
    }
}