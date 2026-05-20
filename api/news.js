export default async function handler(req, res) {

  const API_KEY = process.env.GNEWS_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "GNEWS_API_KEY is not set in .env.local" });
  }

  const {
    category = "general",
    country  = "in",
    city     = "India",
    search   = "",
    lang     = "en"   // "en" or "hi" — passed as-is to GNews
  } = req.query;

  try {

    let url = "";

    /* ── 1. SEARCH BAR takes priority over everything ── */
    if (search.trim()) {

      // Search works in both en and hi
      url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(search)}&lang=${lang}&max=10&apikey=${API_KEY}`;

    }

    /* ── 2. HINDI — GNews top-headlines has near-zero Hindi content
            on the free tier. Use the search endpoint instead with a
            broad query so we actually get results. ── */
    else if (lang === "hi") {

      const q = city !== "India"
        ? `${city} ${category}`   // e.g. "Hyderabad sports"
        : `${category} India`;    // e.g. "technology India"

      url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=hi&max=10&apikey=${API_KEY}`;

    }

    /* ── 3. CITY detected via geolocation (not default India) ── */
    else if (city !== "India") {

      url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(city + " " + category)}&lang=${lang}&max=10&apikey=${API_KEY}`;

    }

    /* ── 4. DEFAULT: country-level top headlines ── */
    else {

      url = `https://gnews.io/api/v4/top-headlines?category=${category}&country=${country}&lang=${lang}&max=10&apikey=${API_KEY}`;

    }

    console.log("[news] fetching:", url);

    const response = await fetch(url);
    const data     = await response.json();

    // GNews rate-limit or error surface
    if (!response.ok) {
      console.error("[news] GNews error:", data);
      return res.status(200).json({ articles: [] });
    }

    return res.status(200).json({
      articles: data.articles || []
    });

  }
  catch (error) {
    console.error("[news] handler error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

}
