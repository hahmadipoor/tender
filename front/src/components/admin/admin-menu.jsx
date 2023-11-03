import React from "react";
import { Link } from "react-router-dom"

const AdminMenu=()=>{
    
    return(
        <div>
            <br />
            &nbsp;
            <Link to="/admin/category">Categories</Link>
            &nbsp;&nbsp;
            <Link to="/admin/subcat">Sub Categories</Link>
            &nbsp;
            <Link to="/admin/product">Products</Link>
        </div>
    )
}

export default AdminMenu;