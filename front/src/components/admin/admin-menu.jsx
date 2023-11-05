import React from "react";
import { Link } from "react-router-dom"

const AdminMenu=()=>{
    
    return(
        <div>
            <div>
                <Link to="/admin/category">Categories</Link>
            </div>
            <div>
                <Link to="/admin/subcat">Sub Categories</Link>
            </div>
            <div>
                <Link to="/admin/product">Products</Link>
            </div>
        </div>
    )
}

export default AdminMenu;