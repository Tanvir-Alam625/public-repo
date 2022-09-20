import React from 'react'
const Footer=()=>{
    const year = new Date().getFullYear()
    return(
        <footer
        style={{display:'flex', justifyContent:'center', borderTop:'1px solid #000',marginTop:'10px'}}
        >
            <p>Copyright ©{year} All rights reserved</p>
        </footer>
    );
}
export default Footer;