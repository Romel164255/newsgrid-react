export default async function handler(req,res){

const API_KEY=
process.env.GNEWS_API_KEY;

const {

category="general",
country="in",
city="India",
search="",
lang="en"

}=req.query;

try{

let url="";

/* GNews Hindi fallback */

const apiLanguage=

lang==="hi"
? "en"
: lang;


/* SEARCH */

if(search.trim()){

url=

`https://gnews.io/api/v4/search?q=${encodeURIComponent(search)}&lang=${apiLanguage}&max=10&apikey=${API_KEY}`;

}


/* LOCATION + CATEGORY */

else if(city!=="India"){

url=

`https://gnews.io/api/v4/search?q=${encodeURIComponent(city+" "+category)}&lang=${apiLanguage}&max=10&apikey=${API_KEY}`;

}


/* DEFAULT */

else{

url=

`https://gnews.io/api/v4/top-headlines?category=${category}&country=${country}&lang=${apiLanguage}&max=10&apikey=${API_KEY}`;

}


console.log("FETCH:",url);

const response=
await fetch(url);

const data=
await response.json();

if(!response.ok){

console.log(data);

return res.status(response.status).json({

error:
data.errors?.[0]
||
"Failed"

});

}


return res.status(200).json({

articles:
data.articles || []

});

}

catch(error){

console.log(error);

return res.status(500).json({

error:
"Internal server error"

});

}

}