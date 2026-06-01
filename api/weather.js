export default async function handler(req, res) {
  const API_KEY = process.env.OPENWEATHER_KEY;

  if (!API_KEY) {
    return res
      .status(500)
      .json({ error: "OPENWEATHER_KEY is not set in .env.local" });
  }

  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "lat and lon are required" });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    console.log("[weather] fetching:", url);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error("[weather] OWM error:", data);
      return res.status(502).json({ error: "Weather API error" });
    }

    // Return only what the frontend needs — keeps it clean
    return res.status(200).json({
      city: data.name,
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      wind: Math.round(data.wind.speed),
    });
  } catch (error) {
    console.error("[weather] handler error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
