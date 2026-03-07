import React from "react";

function Navbar(){

return(
<nav style={styles.nav}>

<div style={styles.logo}>
TOYOTA
</div>

<div>
<button style={styles.button}>Browse Vehicles</button>
<button style={styles.button}>Manage Request</button>

<button style={styles.sign}>Hello, Sign In</button>
</div>

</nav>
);
}

const styles = {
nav:{
display:"flex",
justifyContent:"space-between",
padding:"15px 40px",
background:"black",
color:"white"
},
logo:{
fontSize:"22px",
fontWeight:"bold"
},
button:{
marginRight:"10px",
padding:"8px 15px",
background:"#e4002b",
border:"none",
color:"white",
cursor:"pointer"
},
sign:{
padding:"8px 15px"
}
};

export default Navbar;