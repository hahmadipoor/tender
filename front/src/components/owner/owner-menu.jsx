import React from "react";
import { Link } from "react-router-dom"

const OwnerMenu=()=>{
    
    return(
        <div>
            <div>
                <Link to="/owner/inquiries">Inquiries</Link>
            </div>
            <div>
                <Link to="/owner/offers">Offers</Link>
            </div>
        </div>
    )
}

export default OwnerMenu;