function NewsCard({

article,
category

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

{article.title}

</h2>

<p>

{article.description}

</p>

<a
href={article.url}
target="_blank"
>

Read More →

</a>

</div>

</div>

);

}

export default NewsCard;