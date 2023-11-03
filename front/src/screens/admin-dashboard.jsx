import React from "react";
import AdminMenu from "../components/admin/admin-menu";
import { useLocation } from "react-router-dom";
import AdminCat from "../components/admin/admin-category";
import AdminSubcat from "../components/admin/admin-subcat";
import AdminProduct from "../components/admin/admin-product";

const AdminDashboard=()=>{

    const location = useLocation();
    return(
        <div>
            <h1>admin dashboard</h1>
            <AdminMenu />
            {location.pathname==="/admin/category" && <AdminCat />}
            {location.pathname==="/admin/subcat" && <AdminSubcat />}
            {location.pathname==="/admin/product" && <AdminProduct/> }
        </div>
    )
}

export default AdminDashboard;