import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const categories = [
    "general",
    "technology",
    "business",
    "sports",
    "health",
  ];

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  const fetchNews = async (selectedCategory) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&pageSize=10&apiKey=${API_KEY}`
      );

      const data = await response.json();

      setArticles(data.articles || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      {/* Navbar */}

      <nav className="navbar">

        <div className="logo">
          News<span>Sphere</span>
        </div>

        <ul className="nav-links">

          {categories.map((item) => (
            <li
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </li>
          ))}

        </ul>

      </nav>

      {/* Breaking Bar */}

      <div className="breaking-news">
        🚀 LIVE GLOBAL HEADLINES • REAL TIME NEWS UPDATES
      </div>

      {/* Hero Section */}

      {!loading && articles.length > 0 && (

        <section className="hero-section">

          <img
            src={
              articles[0].urlToImage ||
              "https://via.placeholder.com/1200x500"
            }
            alt="hero"
          />

          <div className="overlay"></div>

          <div className="hero-content">

            <span className="hero-tag">
              Trending Now
            </span>

            <h1>{articles[0].title}</h1>

            <p>
              {articles[0].description ||
                "Stay updated with the latest global news and trends."}
            </p>

            <a
              href={articles[0].url}
              target="_blank"
              rel="noreferrer"
            >
              Read Full Story →
            </a>

          </div>

        </section>
      )}

      {/* Loading */}

      {loading && (
        <div className="loading">
          Loading latest news...
        </div>
      )}

      {/* News Grid */}

      <section className="news-grid">

        {!loading &&
          articles.slice(1).map((article, index) => (

            <div className="news-card" key={index}>

              <img
                src={
                  article.urlToImage ||
                  "https://via.placeholder.com/400x250"
                }
                alt="news"
              />

              <div className="news-content">

                <div className="news-category">
                  {category}
                </div>

                <h2>{article.title}</h2>

                <p>
                  {article.description ||
                    "No description available for this article."}
                </p>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read More →
                </a>

              </div>

            </div>
          ))}

      </section>

      {/* Footer */}

      <footer className="footer">

        <h3>NewsSphere</h3>

        <p>
          Modern news platform delivering real-time
          updates from around the world.
        </p>

        <span>
          © 2026 NewsSphere. All rights reserved.
        </span>

      </footer>

    </div>
  );
}

export default App;