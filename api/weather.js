export default async function handler(req,res){

const API_KEY=
process.env.OPENWEATHER_KEY;

const {
lat,
lon
}=req.query;

try{

const response=
await fetch(

`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`

);

const data=
await response.json();

res.status(200).json(data);

}

catch{

res.status(500).json({

error:
"Weather error"

});

}

}