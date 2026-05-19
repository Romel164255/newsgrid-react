export async function getWeather(
lat,
lon
){

const response=
await fetch(

`/api/weather?lat=${lat}&lon=${lon}`

);

return await response.json();

}