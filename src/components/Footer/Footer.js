import React from 'react'
const Footer=()=>{
    const year = new Date().getFullYear()
    return(
        <footer
        style={{display:'flex', justifyContent:'center', borderTop:'1px solid gray',marginTop:'10px', padding:'30px 0px'}}
        >
            <p >Copyright ©{year} All rights reserved</p>
        </footer>
    );
}
export default Footer;