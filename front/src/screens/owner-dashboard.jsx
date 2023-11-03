import React from "react";
import OwnerInquiries from "../components/owner/owner-inquiries";
import OwnerOffers from "../components/owner/owner-offers";
import OwnerMenu from "../components/owner/owner-menu";
import { useLocation } from "react-router-dom";

const CustomerDashboard=()=>{

    const location=useLocation();

    return(
        <div>
            <h1>Customer Dashboard </h1>
            <OwnerMenu />
            {location.pathname==="/owner/inquiries" && <OwnerInquiries />}
            {location.pathname==="/owner/offers" && <OwnerOffers />}
        </div>
    )
}

export default CustomerDashboard;