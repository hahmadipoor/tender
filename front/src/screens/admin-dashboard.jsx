import React from "react";
import AdminMenu from "../components/admin/admin-menu";
import { useLocation } from "react-router-dom";
import AdminCat from "../components/admin/admin-category";
import AdminSubcat from "../components/admin/admin-subcat";
import AdminProduct from "../components/admin/admin-product";

const AdminDashboard=()=>{

    const location = useLocation();
    return(
        <div style={{display:'flex' }}>
            <div style={{background:'#aa9988',marginRight:'10px', marginTop:'10px',paddingLeft:'5px',paddingRight:'5px'}}>
                <AdminMenu />
            </div>
            <div>
                {location.pathname==="/admin/category" && <AdminCat />}
                {location.pathname==="/admin/subcat" && <AdminSubcat />}
                {location.pathname==="/admin/product" && <AdminProduct/> }
            </div>
        </div>
    )
}

export default AdminDashboard;