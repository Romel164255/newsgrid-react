/**
 * WeatherCard
 * -----------
 * Displays current weather using the shaped object returned by /api/weather.
 * The API returns: { city, temp, feelsLike, humidity, description, icon, wind }
 */
function WeatherCard({ weather }) {

  // Nothing to show yet (still loading or fetch failed)
  if (!weather || !weather.city) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}.png`;

  return (
    <div className="weather-card">

      {/* City + icon */}
      <div className="weather-main">
        <img src={iconUrl} alt={weather.description} className="weather-icon" />
        <span className="weather-city">{weather.city}</span>
      </div>

      {/* Temperature */}
      <div className="weather-temp">
        {weather.temp}°C
      </div>

      {/* Details row */}
      <div className="weather-details">
        <span>Feels like {weather.feelsLike}°C</span>
        <span>💧 {weather.humidity}%</span>
        <span>💨 {weather.wind} m/s</span>
      </div>

      {/* Description */}
      <div className="weather-desc">
        {weather.description}
      </div>

    </div>
  );

}

export default WeatherCard;
