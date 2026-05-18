import "./App.css";

import {
  useEffect,
  useState
} from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import NewsCard from "./components/NewsCard";
import Footer from "./components/Footer";

import useLocation from "./hooks/useLocation";

import {
  getNews
} from "./services/newsApi";

function App() {

  const {
    country,
    city
  } = useLocation();

  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(true);

  const [category, setCategory] =
    useState("general");

  const categories = [
    "general",
    "technology",
    "business",
    "sports",
    "health"
  ];

  useEffect(() => {

    fetchNews();

  }, [category, country, city]);



  async function fetchNews() {

    try {

      setLoading(true);

      const data =
        await getNews(
          category,
          country,
          city
        );

      setArticles(data);

    }
    catch (error) {

      console.log(error);

      setArticles([]);

    }
    finally {

      setLoading(false);

    }

  }



  return (

    <div className="app">

      <Navbar
        categories={categories}
        category={category}
        setCategory={setCategory}
      />

      <div className="breaking-news">

        🚀 LIVE NEWS • {city}

      </div>


      {loading && (

        <div className="loading">

          Loading...

        </div>

      )}



      {!loading &&
        articles.length > 0 && (

          <Hero
            article={
              articles[0]
            }
          />

        )}



      <section className="news-grid">

        {!loading &&

          articles
            .slice(1)
            .map((article, index) => (

              <NewsCard

                key={index}

                article={article}

                category={category}

              />

            ))}

      </section>

      <Footer />

    </div>

  );

}

export default App;