import React from "react";
import CustomerInquiries from "../components/customer/customer-inquiries";
import CustomerProfile from "../components/customer/customer-profile";
import CustomerMenu from "../components/customer/customer-menu";
import { useLocation } from "react-router-dom";

const CustomerDashboard=()=>{

    const location=useLocation();

    return(
        <div style={{display:'flex' }}>
            <div style={{background:'#aa9988',marginRight:'10px', marginTop:'10px',paddingLeft:'5px',paddingRight:'5px'}}>
                <CustomerMenu />
            </div>
            <div>
                {location.pathname==="/customer/inquiries" && <CustomerInquiries />}
                {location.pathname==="/customer/profile" && <CustomerProfile />}
            </div>
        </div>
    )
}

export default CustomerDashboard;