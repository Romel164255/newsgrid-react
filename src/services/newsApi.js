export async function getNews(category,country){

const response=await fetch(

`/api/news?category=${category}&country=${country}`

);

if(!response.ok){

throw new Error(
"Fetch failed"
);

}

const data=await response.json();

return data.articles;

}