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

const apiLanguage=
lang==="hi"
? "en"
: lang;


if(search.trim()){

url=

`https://gnews.io/api/v4/search?q=${encodeURIComponent(search)}&lang=${apiLanguage}&max=10&apikey=${API_KEY}`;

}

else if(city!=="India"){

url=

`https://gnews.io/api/v4/search?q=${encodeURIComponent(city+" "+category)}&lang=${apiLanguage}&max=10&apikey=${API_KEY}`;

}

else{

url=

`https://gnews.io/api/v4/top-headlines?category=${category}&country=${country}&lang=${apiLanguage}&max=10&apikey=${API_KEY}`;

}

const response=
await fetch(url);

const data=
await response.json();


if(!response.ok){

if(
data.errors?.[0]
?.includes(
"request limit"
)
){

return res.status(200).json({

articles:[

{

title:
"Daily request limit reached",

description:
"GNews free API limit reached. Please try again after reset.",

url:"#",

image:null

}

]

});

}

return res.status(500).json({

error:
"Failed fetching news"

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