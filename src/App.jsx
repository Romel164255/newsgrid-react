import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

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

      setArticles(data.articles);
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
        <h1 className="logo">NewsGrid</h1>

        <ul className="nav-links">
          <li onClick={() => setCategory("general")}>Home</li>

          <li onClick={() => setCategory("technology")}>
            Technology
          </li>

          <li onClick={() => setCategory("business")}>
            Business
          </li>

          <li onClick={() => setCategory("sports")}>
            Sports
          </li>

          <li onClick={() => setCategory("health")}>
            Health
          </li>
        </ul>
      </nav>

      {/* Breaking News */}
      <div className="breaking-news">
        LIVE NEWS UPDATES FROM AROUND THE WORLD
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

          <div className="hero-content">
            <h1>{articles[0].title}</h1>

            <p>{articles[0].description}</p>

            <a
              href={articles[0].url}
              target="_blank"
              rel="noreferrer"
            >
              Read Full Story
            </a>
          </div>

        </section>
      )}

      {/* Loading */}
      {loading && <h2 className="loading">Loading News...</h2>}

      {/* News Grid */}
      <section className="news-grid">

        {articles.slice(1).map((article, index) => (
          <div className="news-card" key={index}>

            <img
              src={
                article.urlToImage ||
                "https://via.placeholder.com/400x200"
              }
              alt="news"
            />

            <div className="news-content">

              <h2>{article.title}</h2>

              <p>
                {article.description || "No description available"}
              </p>

              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
              >
                Read More
              </a>

            </div>
          </div>
        ))}

      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 NewsGrid. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;