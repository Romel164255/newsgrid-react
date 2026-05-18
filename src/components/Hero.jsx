function Hero({article}){

return(

<section className="hero-section">

<img
src={
article.image ||
"https://via.placeholder.com/1200x500"
}
/>

<div className="overlay"></div>

<div className="hero-content">

<span className="hero-tag">

Trending

</span>

<h1>

{article.title}

</h1>

<p>

{article.description}

</p>

<a
href={article.url}
target="_blank"
>

Read Full Story →

</a>

</div>

</section>

);

}

export default Hero;