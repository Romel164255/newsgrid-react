function WeatherCard({

weather

}){

if(!weather)
return null;

return(

<div
className="breaking-news"
>

🌤

{weather.name}

•

{weather.main.temp}°C

•

{weather.weather[0].main}

</div>

)

}

export default WeatherCard;