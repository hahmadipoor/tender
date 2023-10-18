import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item"><Link to="/admin/category" className="nav-link">Category</Link></li>
      <li className="nav-item"><Link to="/admin/sub" className="nav-link">Sub Category</Link></li>
      <li className="nav-item"><Link to="/admin/products" className="nav-link">Products</Link></li>
    </ul>
  </nav>
);

export default AdminNav;
