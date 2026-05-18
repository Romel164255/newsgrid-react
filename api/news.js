export default async function handler(req, res) {

  const API_KEY = process.env.GNEWS_API_KEY;

  const {
    category = "general",
    country = "in",
    city = "India"
  } = req.query;

  try {

    let url = "";

    if (city !== "India") {

      // Location-specific news
      url =
      `https://gnews.io/api/v4/search?q=${city}&category=${category}&lang=en&max=10&apikey=${API_KEY}`;

    } else {

      // Default India headlines
      url =
      `https://gnews.io/api/v4/top-headlines?category=${category}&country=${country}&lang=en&max=10&apikey=${API_KEY}`;

    }

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {

      return res.status(response.status).json({
        error: "Failed fetching news"
      });

    }

    return res.status(200).json({

      articles:
      data.articles || []

    });

  }
  catch (error) {

    console.log(error);

    return res.status(500).json({

      error: "Internal server error"

    });

  }

}