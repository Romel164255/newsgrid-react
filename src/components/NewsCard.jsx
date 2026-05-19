function NewsCard({

article,
category,
language

}){

return(

<div className="news-card">

<img
src={
article.image ||
"https://via.placeholder.com/400x250"
}
/>

<div className="news-content">

<div className="news-category">

{category}

</div>

<h2>

{

language==="hi"

?

"🇮🇳 " + article.title

:

article.title

}

</h2>

<p>

{

language==="hi"

?

"हिंदी: " +
(
article.description ||
"No description"
)

:

(
article.description ||
"No description"
)

}

</p>

<a
href={article.url}
target="_blank"
rel="noreferrer"
>

Read More →

</a>

</div>

</div>

)

}

export default NewsCard;