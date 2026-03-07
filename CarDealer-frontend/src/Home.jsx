import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Home(){

const [cars,setCars] = useState([]);
const navigate = useNavigate();

useEffect(()=>{

fetch("http://localhost:8084/api/cars")
.then(res => res.json())
.then(data => setCars(data))
.catch(error => console.error("Error fetching cars:", error));

},[]);

return(

<div>

<Navbar/>

{/* VIDEO */}

<video autoPlay muted loop width="100%">
<source src="/video/car.mp4" type="video/mp4"/>
</video>


{/* FEATURED IMAGE */}

<div style={{ textAlign: "center", margin: "20px" }}>
  <img 
    src="/images/featured.png"
    style={{ width: "100%", height: "500px", objectFit: "cover" }}
    alt="Featured Toyota"
  />
</div>

{/* CAR GRID */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"30px",
padding:"60px"
}}>

{cars.map(car=>(

<div
key={car.id}
style={{
border:"1px solid #ddd",
borderRadius:"10px",
padding:"15px",
cursor:"pointer",
boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
}}
onClick={()=>navigate(`/car/${car.id}`)}
>

<img
src={`http://localhost:8084/images/${car.image}`}
alt={car.name}
style={{width:"100%",height:"200px",objectFit:"cover"}}
/>

<h3>{car.name}</h3>
<p>${car.price}</p>

</div>

))}

</div>

</div>
);
}

export default Home;