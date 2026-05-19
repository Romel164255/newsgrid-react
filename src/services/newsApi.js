export async function getNews(

category,
country,
city,
search,
language

){

const response=await fetch(

`/api/news?category=${category}&country=${country}&city=${city}&search=${search}&lang=${language}`

);

if(!response.ok){

throw new Error(
"Fetch failed"
);

}

const data=
await response.json();

return data.articles;

}