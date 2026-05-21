const translations = {
  en: {
    placeholder: "🔍 Search news...",
    categories: {
      general: "General",
      technology: "Technology",
      business: "Business",
      sports: "Sports",
      health: "Health"
    }
  },

  hi: {
    placeholder: "🔍 समाचार खोजें...",
    categories: {
      general: "सामान्य",
      technology: "तकनीक",
      business: "व्यापार",
      sports: "खेल",
      health: "स्वास्थ्य"
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

  const t = translations[language] || translations.en;

  function toggleLanguage() {
    setLanguage(
      language === "en"
        ? "hi"
        : "en"
    );
  }

  return (

    <nav className="navbar">

      <div className="top-nav">

        {/* Logo */}
        <div className="logo">
          The Daily<span> Sphere</span>
        </div>

        {/* Search */}

        <input
          type="text"
          className="search-box"
          placeholder={t.placeholder}
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* Language Toggle */}

        <button
          className="language-btn"
          onClick={toggleLanguage}
        >
          {language === "en"
            ? "हिंदी"
            : "English"}
        </button>

      </div>

      {/* Categories */}

      <ul className="nav-links">

        {categories.map((item) => (

          <li
            key={item}
            className={
              category === item
                ? "active"
                : ""
            }
            onClick={() =>
              setCategory(item)
            }
          >

            {
              t.categories[item] || item
            }

          </li>

        ))}

      </ul>

    </nav>

  );

}

export default Navbar;