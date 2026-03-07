import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CarDetails from "./CarDetails";

function App(){

return(
<BrowserRouter>
<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/car/:id" element={<CarDetails/>}/>

</Routes>
</BrowserRouter>
);
}

export default App;
