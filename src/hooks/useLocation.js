import {useEffect,useState} from "react";

export default function useLocation(){

const [country,setCountry]=useState("in");

useEffect(()=>{

navigator.geolocation.getCurrentPosition(

async(position)=>{

try{

const lat=position.coords.latitude;

const lon=position.coords.longitude;

const response=await fetch(

`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`

);

const data=await response.json();

setCountry(

data.countryCode.toLowerCase()

);

}

catch{

setCountry("in");

}

},

()=>{

setCountry("in");

}

);

},[]);

return country;

}