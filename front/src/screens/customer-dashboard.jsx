import React from "react";
import CustomerInquiries from "../components/customer/customer-inquiries";
import CustomerProfile from "../components/customer/customer-profile";
import CustomerMenu from "../components/customer/customer-menu";
import { useLocation } from "react-router-dom";

const CustomerDashboard=()=>{

    const location=useLocation();

    return(
        <div>
            <h1>Customer Dashboard </h1>
            <CustomerMenu />
            {location.pathname==="/customer/inquiries" && <CustomerInquiries />}
            {location.pathname==="/customer/profile" && <CustomerProfile />}
        </div>
    )
}

export default CustomerDashboard;