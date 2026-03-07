import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function CarDetails(){

const {id} = useParams();
const [car,setCar] = useState(null);

useEffect(()=>{

fetch(`http://localhost:8084/api/cars/${id}`)
.then(res=>res.json())
.then(data=>setCar(data));

},[id]);

if(!car) return <h2>Loading...</h2>;

return(

<div>

<Navbar/>

<div style={{padding:"60px"}}>

<h1>{car.name}</h1>

<img
src={`http://localhost:8084/images/${car.image}`}
width="500px"
/>

<h2>${car.price}</h2>
<p>{car.description}</p>

<button style={{
padding:"10px 20px",
background:"black",
color:"white"
}}>
Request Test Drive
</button>

</div>

</div>
);
}

export default CarDetails;