import React from "react";
import { Link } from "react-router-dom"

const CustomerMenu=()=>{
    
    return(
        <div>
            <br />
            &nbsp;
            <Link to="/customer/inquiries">Inquiries</Link>
            &nbsp;&nbsp;
            <Link to="/customer/profile">Profile</Link>
        </div>
    )
}

export default CustomerMenu;