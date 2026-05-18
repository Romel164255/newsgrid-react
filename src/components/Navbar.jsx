function Navbar({

categories,
category,
setCategory

}){

return(

<nav className="navbar">

<div className="logo">

News<span>Sphere</span>

</div>

<ul className="nav-links">

{categories.map((item)=>(

<li
key={item}
className={
category===item
? "active"
: ""
}

onClick={()=>
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