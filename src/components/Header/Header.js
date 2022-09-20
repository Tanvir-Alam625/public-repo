import React from "react";
const headerStyle={
    display:"flex",
    justifyContent: "center",
    padding: "10px 5px",

    backgroundColor: "#000"
}
const Header = ()=>{
    return(
        <header id="header" style={headerStyle}>
            <h2 style={{color:"#fff", fontSize:"25px", margin:"0px", padding:"0px", letterSpacing:"1px"}}>GitHub publice Repos.</h2>
        </header>
    );
}
export default Header;