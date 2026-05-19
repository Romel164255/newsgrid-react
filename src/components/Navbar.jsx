function Navbar({

  categories,
  category,
  setCategory,

  search,
  setSearch,

  language,
  setLanguage

}) {

  return (

    <nav className="navbar">

      <div className="logo">

        News<span>Sphere</span>

      </div>


      <div className="nav-controls">

        <input

          type="text"

          placeholder="Search news..."

          value={search}

          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }

          className="search-box"

        />


        <select

          value={language}

          onChange={(e)=>
            setLanguage(
              e.target.value
            )
          }

          className="language-select"

        >

          <option value="en">

            English

          </option>

          <option value="hi">

            Hindi

          </option>

        </select>

      </div>



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

            {item}

          </li>

        ))}

      </ul>

    </nav>

  );

}

export default Navbar;