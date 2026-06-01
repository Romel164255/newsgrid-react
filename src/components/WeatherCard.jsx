function WeatherCard({ weather }) {
  if (!weather || !weather.city) return null;

  return (
    <div className="weather-mini">
      <span>☀</span>
      <span>{weather.city}</span>•<span>{weather.temp}°C</span>•
      <span>{weather.description}</span>
    </div>
  );
}

export default WeatherCard;
