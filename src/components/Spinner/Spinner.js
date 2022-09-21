import React from "react";
import SpinnerImage from "../../img/SpinnerImg.gif"
const Spinner = ()=>{
    const spinnerStyles ={
            backgroundColor:'#222222',
            position:'absolute',
            top:0,
            right:0,
            left:0,
            bottom:0,
            height:'100vh',
            width:'100vw',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            overflow:'hidden'
    }
    return(
        <div style={spinnerStyles}>
            <img src={SpinnerImage} alt="spinner-img" style={{height:'100vh', width:'90vw', objectFit:'cover',textAlign:'center' }}/>
        </div>
    );
}
export default Spinner;