function NewsCard({

article,
category,
language

}){

const fallbackDescription=

language==="hi"
?
"विवरण उपलब्ध नहीं"
:
"No description";

const readMoreLabel=

language==="hi"
?
"और पढ़ें →"
:
"Read More →";

return(

<div className="news-card">

<img
src={
article.image ||
"https://via.placeholder.com/400x250"
}
alt={
article.title ||
"News image"
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

{article.description || fallbackDescription}

</p>

<a
href={article.url}
target="_blank"
rel="noreferrer"
>

{readMoreLabel}

</a>

</div>

</div>

)

}

export default NewsCard;
