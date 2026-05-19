function Navbar({

  categories,
  category,
  setCategory,

  search,
  setSearch,

  language,
  setLanguage

}){

return(

<nav className="navbar">

<div className="top-nav">

<div className="logo">

News<span>Sphere</span>

</div>


<input

type="text"

placeholder="🔍 Search news..."

value={search}

onChange={(e)=>
setSearch(
e.target.value
)
}

className="search-box"

/>


<button

className="language-btn"

onClick={()=>{

setLanguage(

language==="en"
? "hi"
: "en"

)

}}

>

{language.toUpperCase()}

</button>

</div>



<ul className="nav-links">

{

categories.map(

(item)=>(

<li

key={item}

className={

category===item
?
"active"
:
""

}

onClick={()=>

setCategory(
item
)

}

>

{item}

</li>

))

}

</ul>

</nav>

)

}

export default Navbar;