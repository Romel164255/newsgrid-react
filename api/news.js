const HINDI_CATEGORY_TERMS = {
  general: "समाचार",
  technology: "तकनीक",
  business: "व्यापार",
  sports: "खेल",
  health: "स्वास्थ्य"
};

const MAX_ARTICLES = 10;

function buildUrl(endpoint, params, apiKey) {
  const url = new URL(`https://gnews.io/api/v4/${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  url.searchParams.set("max", String(MAX_ARTICLES));
  url.searchParams.set("apikey", apiKey);

  return url.toString();
}

async function fetchJson(url) {
  const response = await fetch(url);
  const data = await response.json();

  return { response, data };
}

export default async function handler(req, res) {
  const API_KEY = process.env.GNEWS_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({
      error: "GNEWS_API_KEY missing"
    });
  }

  const {
    category = "general",
    country = "in",
    city = "India",
    search = "",
    lang = "en"
  } = req.query;

  const safeCategory = String(category).toLowerCase();
  const safeLanguage = String(lang).toLowerCase() === "hi" ? "hi" : "en";
  const safeCountry = String(country).toLowerCase();
  const safeCity = String(city).trim();
  const safeSearch = String(search).trim();

  // Hindi news is much more consistent from Indian sources.
  const effectiveCountry =
    safeLanguage === "hi"
      ? "in"
      : safeCountry;

  try {
    let url = "";

    if (safeSearch) {
      const hindiBoost = HINDI_CATEGORY_TERMS[safeCategory] || "समाचार";
      const query =
        safeLanguage === "hi"
          ? `${safeSearch} ${hindiBoost}`
          : safeSearch;

      url = buildUrl(
        "search",
        {
          q: query,
          lang: safeLanguage,
          country: effectiveCountry,
          in: "title,description"
        },
        API_KEY
      );
    }
    else if (safeCity && safeCity.toLowerCase() !== "india") {
      const hindiBoost = HINDI_CATEGORY_TERMS[safeCategory] || "समाचार";
      const cityQuery =
        safeLanguage === "hi"
          ? `${safeCity} ${hindiBoost}`
          : `${safeCity} ${safeCategory}`;

      url = buildUrl(
        "search",
        {
          q: cityQuery,
          lang: safeLanguage,
          country: effectiveCountry,
          in: "title,description"
        },
        API_KEY
      );
    }
    else {
      url = buildUrl(
        "top-headlines",
        {
          category: safeCategory,
          country: effectiveCountry,
          lang: safeLanguage
        },
        API_KEY
      );
    }

    console.log("Fetching:", url);

    let { response, data } = await fetchJson(url);

    if (!response.ok) {
      console.log(data);
      return res.status(response.status).json(data);
    }

    let articles = Array.isArray(data.articles)
      ? data.articles
      : [];

    // If Hindi request returns empty in search/city mode, try a Hindi headlines fallback.
    if (safeLanguage === "hi" && articles.length === 0) {
      const fallbackUrl = buildUrl(
        "top-headlines",
        {
          category: safeCategory,
          country: "in",
          lang: "hi"
        },
        API_KEY
      );

      console.log("Hindi fallback:", fallbackUrl);

      const fallback = await fetchJson(fallbackUrl);

      if (fallback.response.ok) {
        articles = Array.isArray(fallback.data.articles)
          ? fallback.data.articles
          : [];
      }
    }

    return res.status(200).json({ articles });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
}
