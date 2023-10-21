import React from "react";
import { Link } from "react-router-dom";

const CustomerNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item"><Link to="/customer/dashboard" className="nav-link">Inquiry</Link></li>
      <li className="nav-item"><Link to="/customer/edit-profile" className="nav-link">Edit Profile</Link></li>
    </ul>
  </nav>
);

export default CustomerNav;
