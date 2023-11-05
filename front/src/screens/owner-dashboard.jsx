import React from "react";
import OwnerInquiries from "../components/owner/owner-inquiries";
import OwnerOffers from "../components/owner/owner-offers";
import OwnerMenu from "../components/owner/owner-menu";
import { useLocation } from "react-router-dom";

const CustomerDashboard=()=>{

    const location=useLocation();

    return(
        <div style={{display:'flex' }}>
            <div style={{background:'#aa9988',marginRight:'10px', marginTop:'10px',paddingLeft:'5px',paddingRight:'5px'}}>
                <OwnerMenu />
            </div>
            <div>
                {location.pathname==="/owner/inquiries" && <OwnerInquiries />}
                {location.pathname==="/owner/offers" && <OwnerOffers />}
            </div>
        </div>
    )
}

export default CustomerDashboard;