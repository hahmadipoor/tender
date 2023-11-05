import React from "react";
import { Link } from "react-router-dom"

const CustomerMenu=()=>{
    
    return(
        <div >
            <div>
                <Link to="/customer/inquiries">Inquiries</Link>
            </div>
            <div>
                <Link to="/customer/profile">Profile</Link>
            </div>
        </div>
    )
}

export default CustomerMenu;
