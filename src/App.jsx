import "./App.css";

import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import NewsCard from "./components/NewsCard";
import Footer from "./components/Footer";
import WeatherCard from "./components/WeatherCard";

import useLocation from "./hooks/useLocation";

import { getNews } from "./services/newsApi";
import { getWeather } from "./services/weatherApi";

function App() {
  const { country, city, lat, lon } = useLocation();

  const [articles, setArticles] = useState([]);
  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("general");

  const [search, setSearch] = useState("");

  const [language, setLanguage] = useState("en");

  const categories = ["general", "technology", "business", "sports", "health"];

  /* NEWS DEBOUNCE */

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNews();
    }, 500);

    return () => clearTimeout(timer);
  }, [category, country, city, search, language]);

  /* WEATHER */

  useEffect(() => {
    fetchWeather();
  }, [lat, lon]);

  async function fetchNews() {
    try {
      setLoading(true);

      const data = await getNews(category, country, city, search, language);

      setArticles(data);
    } catch {
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchWeather() {
    if (!lat || !lon) return;

    try {
      const data = await getWeather(lat, lon);

      setWeather(data);
    } catch {
      setWeather(null);
    }
  }

  return (
    <div className="app">
      <Navbar
        categories={categories}
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
        language={language}
        setLanguage={setLanguage}
      />

      <div className="news-banner">THE DAILY SPHERE • {city.toUpperCase()}</div>

      <div className="top-bar">
        <WeatherCard weather={weather} />
      </div>

      {loading && <div className="loading">Loading News...</div>}

      {!loading && articles.length > 0 && <Hero article={articles[0]} />}

      <section className="news-grid">
        {articles.slice(1).map((article, index) => (
          <NewsCard
            key={index}
            article={article}
            category={category}
            language={language}
          />
        ))}
      </section>

      <Footer />
    </div>
  );
}

export default App;
