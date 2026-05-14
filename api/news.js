export default async function handler(req, res) {
  const API_KEY = process.env.GNEWS_API_KEY;

  const category = req.query.category || "general";

  try {

    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&max=10&apikey=${API_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.errors || "Failed to fetch news",
      });
    }

    return res.status(200).json(data);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      error: "Server Error",
    });

  }
}