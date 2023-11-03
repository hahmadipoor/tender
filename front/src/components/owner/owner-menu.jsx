import React from "react";
import { Link } from "react-router-dom"

const OwnerMenu=()=>{
    
    return(
        <div>
            <br />
            &nbsp;
            <Link to="/owner/inquiries">Inquiries</Link>
            &nbsp;&nbsp;
            <Link to="/owner/offers">Offers</Link>
        </div>
    )
}

export default OwnerMenu;