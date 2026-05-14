export default async function handler(req, res) {
  const API_KEY = process.env.GNEWS_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "API key not configured on server." });
  }

  const allowedCategories = [
    "general", "technology", "business", "sports", "health",
    "entertainment", "science",
  ];

  const category = allowedCategories.includes(req.query.category)
    ? req.query.category
    : "general";

  try {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&max=10&apikey=${API_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.errors?.[0] || "Failed to fetch news from provider.",
      });
    }

    if (!data.articles || data.articles.length === 0) {
      return res.status(200).json({ articles: [] });
    }

    return res.status(200).json({ articles: data.articles });

  } catch (error) {
    console.error("[news handler]", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}