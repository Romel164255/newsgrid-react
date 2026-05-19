export default async function handler(req,res){

const API_KEY=
process.env.GNEWS_API_KEY;

if(!API_KEY){

return res.status(500).json({

error:"API key missing"

});

}

const {

category="general",
country="in",
city="India",
search="",
lang="en"

}=req.query;


try{

let url="";


/* Search takes priority */

if(search){

url=

`https://gnews.io/api/v4/search?q=${search}&lang=${lang}&max=10&apikey=${API_KEY}`;

}


/* Location news */

else if(city!=="India"){

url=

`https://gnews.io/api/v4/search?q=${city}&lang=${lang}&max=10&apikey=${API_KEY}`;

}


/* Default country headlines */

else{

url=

`https://gnews.io/api/v4/top-headlines?category=${category}&country=${country}&lang=${lang}&max=10&apikey=${API_KEY}`;

}


const response=
await fetch(url);

const data=
await response.json();

if(!response.ok){

return res.status(
response.status
).json({

error:
data.errors?.[0]
||
"News fetch failed"

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