// Hindi translations for UI labels
const translations = {
  en: {
    placeholder: "🔍 Search news...",
    categories: {
      general:    "General",
      technology: "Technology",
      business:   "Business",
      sports:     "Sports",
      health:     "Health"
    }
  },
  hi: {
    placeholder: "🔍 समाचार खोजें...",
    categories: {
      general:    "सामान्य",
      technology: "तकनीक",
      business:   "व्यापार",
      sports:     "खेल",
      health:     "स्वास्थ्य"
    }
  }
};

function Navbar({
  categories,
  category,
  setCategory,
  search,
  setSearch,
  language,
  setLanguage
}) {

  const t = translations[language];

  return (
    <nav className="navbar">

      <div className="top-nav">

        <div className="logo">
          The Daily<span> Sphere</span>
        </div>

        <input
          type="text"
          placeholder={t.placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />

        <button
          className="language-btn"
          onClick={() => setLanguage(language === "en" ? "hi" : "en")}
        >
          {language === "en" ? "हिंदी" : "English"}
        </button>

      </div>

      <ul className="nav-links">
        {categories.map((item) => (
          <li
            key={item}
            className={category === item ? "active" : ""}
            onClick={() => setCategory(item)}
          >
            {t.categories[item] || item}
          </li>
        ))}
      </ul>

    </nav>
  );
}

export default Navbar;
