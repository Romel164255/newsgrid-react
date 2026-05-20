export default async function handler(req, res) {

  const API_KEY = process.env.GNEWS_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "GNEWS_API_KEY is not set" });
  }

  const {
    category = "general",
    country  = "in",
    city     = "India",
    search   = "",
    // lang is intentionally ignored here — GNews free tier has near-zero
    // Hindi content. We always fetch English articles and translate the UI.
  } = req.query;

  try {

    let url = "";

    /* ── 1. SEARCH BAR takes priority ── */
    if (search.trim()) {
      url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(search)}&lang=en&max=10&apikey=${API_KEY}`;
    }

    /* ── 2. CITY detected via geolocation ── */
    else if (city !== "India") {
      url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(city + " " + category)}&lang=en&max=10&apikey=${API_KEY}`;
    }

    /* ── 3. DEFAULT: country-level top headlines ── */
    else {
      url = `https://gnews.io/api/v4/top-headlines?category=${category}&country=${country}&lang=en&max=10&apikey=${API_KEY}`;
    }

    console.log("[news] fetching:", url);

    const response = await fetch(url);
    const data     = await response.json();

    if (!response.ok) {
      console.error("[news] GNews error:", data);
      return res.status(200).json({ articles: [] });
    }

    return res.status(200).json({ articles: data.articles || [] });

  }
  catch (error) {
    console.error("[news] handler error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

}
